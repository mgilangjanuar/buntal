import * as ts from 'typescript'
import type { BunPlugin } from 'bun'
import { resolve, sep } from 'path'

/**
 * Check whether an identifier appears in a type position by walking up the AST.
 * Returns true if the identifier is part of a type expression, false if it is
 * used as a value.
 */
const isInTypePosition = (node: ts.Node): boolean => {
  let parent: ts.Node | undefined = node.parent

  while (parent) {
    // Direct type positions
    if (ts.isTypeReferenceNode(parent) && parent.typeName === node) return true
    if (ts.isExpressionWithTypeArguments(parent) && parent.expression === node)
      return true
    if (ts.isTypeQueryNode(parent) && parent.exprName === node) return true
    if (ts.isTypeOfExpression(parent) && parent.expression === node) return true
    if (
      (ts.isTypeAssertionExpression(parent) || ts.isAsExpression(parent)) &&
      parent.type === node
    )
      return true
    if (ts.isTypeOperatorNode(parent) && parent.type === node) return true
    if (ts.isImportTypeNode(parent) && parent.argument === node) return true
    if (ts.isSatisfiesExpression(parent) && parent.type === node) return true

    // Type arguments in call / new expressions
    if (
      (ts.isCallExpression(parent) || ts.isNewExpression(parent)) &&
      parent.typeArguments
    ) {
      for (const typeArg of parent.typeArguments) {
        if (typeArg === node) return true
      }
    }

    // Definite value positions
    if (
      ts.isExpressionStatement(parent) ||
      ts.isPropertyAccessExpression(parent) ||
      ts.isElementAccessExpression(parent) ||
      ts.isBinaryExpression(parent) ||
      ts.isPrefixUnaryExpression(parent) ||
      ts.isPostfixUnaryExpression(parent) ||
      ts.isTemplateExpression(parent) ||
      ts.isTaggedTemplateExpression(parent) ||
      ts.isSpreadElement(parent) ||
      ts.isSpreadAssignment(parent) ||
      ts.isShorthandPropertyAssignment(parent) ||
      ts.isArrayLiteralExpression(parent) ||
      ts.isObjectLiteralExpression(parent) ||
      ts.isFunctionDeclaration(parent) ||
      ts.isFunctionExpression(parent) ||
      ts.isArrowFunction(parent) ||
      ts.isMethodDeclaration(parent) ||
      ts.isVariableDeclaration(parent) ||
      ts.isParameter(parent) ||
      ts.isPropertyDeclaration(parent) ||
      ts.isPropertySignature(parent) ||
      ts.isExportAssignment(parent) ||
      ts.isReturnStatement(parent) ||
      ts.isThrowStatement(parent) ||
      ts.isJsxExpression(parent) ||
      ts.isJsxAttribute(parent) ||
      ts.isJsxSpreadAttribute(parent) ||
      ts.isJsxOpeningElement(parent) ||
      ts.isJsxClosingElement(parent) ||
      ts.isJsxSelfClosingElement(parent) ||
      ts.isDecorator(parent)
    ) {
      return false
    }

    // Callee of a call / new expression is a value
    if (ts.isCallExpression(parent) && parent.expression === node) return false
    if (ts.isNewExpression(parent) && parent.expression === node) return false

    parent = parent.parent
  }

  return false
}

const isBindingOnlyUsedAsType = (
  sourceFile: ts.SourceFile,
  name: string
): boolean => {
  let hasValueUsage = false

  const visit = (node: ts.Node) => {
    if (hasValueUsage) return

    if (ts.isIdentifier(node) && node.text === name) {
      if (!isInTypePosition(node)) {
        hasValueUsage = true
        return
      }
    }

    ts.forEachChild(node, visit)
  }

  // Walk every top-level statement except the import declarations themselves
  for (const stmt of sourceFile.statements) {
    if (!ts.isImportDeclaration(stmt)) {
      visit(stmt)
    }
  }

  return !hasValueUsage
}

const parse = (path: string, source: string) =>
  ts.createSourceFile(
    path,
    source,
    ts.ScriptTarget.Latest,
    true,
    path.endsWith('tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.JSX
  )

const hasExport = (node: ts.Node) =>
  ts.canHaveModifiers(node) &&
  !!ts.getModifiers(node)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)

const declaredNames = (stmt: ts.Statement): string[] => {
  if (ts.isVariableStatement(stmt)) {
    return stmt.declarationList.declarations.flatMap((d) =>
      ts.isIdentifier(d.name) ? [d.name.text] : []
    )
  }
  if (
    (ts.isFunctionDeclaration(stmt) || ts.isClassDeclaration(stmt)) &&
    stmt.name
  ) {
    return [stmt.name.text]
  }
  return []
}

const referencedNames = (nodes: readonly ts.Node[]) => {
  const names = new Set<string>()
  const visit = (node: ts.Node) => {
    if (ts.isIdentifier(node)) {
      const parent = node.parent
      const isKey =
        (ts.isPropertyAccessExpression(parent) && parent.name === node) ||
        (ts.isPropertyAssignment(parent) && parent.name === node) ||
        (ts.isJsxAttribute(parent) && parent.name === node)
      if (!isKey) names.add(node.text)
    }
    ts.forEachChild(node, visit)
  }
  nodes.forEach(visit)
  return names
}

/**
 * Removes the server-only `$` loader from a page or layout, together with
 * top-level helpers and import bindings that only it used, so server code
 * (database clients, secrets, Bun builtins) never reaches the browser bundle.
 */
export const stripServerExports = (path: string, source: string) => {
  const sourceFile = parse(path, source)
  const isLoader = (stmt: ts.Statement) =>
    hasExport(stmt) && declaredNames(stmt).includes('$')

  const loader = sourceFile.statements.filter(isLoader)
  if (!loader.length) return

  let kept = sourceFile.statements.filter((s) => !isLoader(s))
  const usesLoaderAsValue = kept.some((stmt) => {
    let found = false
    const visit = (node: ts.Node) => {
      if (found) return
      if (ts.isIdentifier(node) && node.text === '$' && !isInTypePosition(node))
        found = true
      ts.forEachChild(node, visit)
    }
    if (!ts.isImportDeclaration(stmt)) visit(stmt)
    return found
  })
  if (usesLoaderAsValue) return

  let removed: ts.Statement[] = [...loader]
  for (;;) {
    const fromRemoved = referencedNames(removed)
    const dead = kept.filter((stmt) => {
      if (ts.isImportDeclaration(stmt) || hasExport(stmt)) return false
      const names = declaredNames(stmt)
      if (!names.length || !names.every((n) => fromRemoved.has(n))) return false
      const usedElsewhere = referencedNames(
        kept.filter((s) => s !== stmt && !ts.isImportDeclaration(s))
      )
      return names.every((n) => !usedElsewhere.has(n))
    })
    if (!dead.length) break
    removed = [...removed, ...dead]
    kept = kept.filter((s) => !dead.includes(s))
  }

  const used = referencedNames(kept.filter((s) => !ts.isImportDeclaration(s)))
  const statements = kept.flatMap((stmt): ts.Statement[] => {
    if (!ts.isImportDeclaration(stmt) || !stmt.importClause) return [stmt]
    const clause = stmt.importClause
    const name =
      clause.name && used.has(clause.name.text) ? clause.name : undefined
    let bindings = clause.namedBindings
    if (bindings && ts.isNamespaceImport(bindings)) {
      if (!used.has(bindings.name.text)) bindings = undefined
    } else if (bindings) {
      const elements = bindings.elements.filter((e) => used.has(e.name.text))
      bindings = elements.length
        ? ts.factory.updateNamedImports(bindings, elements)
        : undefined
    }
    if (!name && !bindings) return []
    return [
      ts.factory.updateImportDeclaration(
        stmt,
        stmt.modifiers,
        ts.factory.updateImportClause(
          clause,
          clause.isTypeOnly,
          name,
          bindings
        ),
        stmt.moduleSpecifier,
        stmt.attributes
      )
    ]
  })

  return ts
    .createPrinter()
    .printFile(ts.factory.updateSourceFile(sourceFile, statements))
}

/**
 * Bun build plugin for client modules. Inside `appDir` it strips the server
 * `$` loader first, then converts value imports used only as types into
 * `import type` so shared server modules are not pulled into the bundle.
 */
export const createTypeOnlyImportsPlugin = ({
  appDir
}: { appDir?: string } = {}): BunPlugin => {
  const root = appDir ? resolve(appDir) + sep : null
  return {
    name: 'buntal-type-only-imports',
    setup(build) {
      build.onLoad({ filter: /\.(tsx|jsx)$/ }, async (args) => {
        if (args.path.includes('node_modules')) {
          return
        }

        const original = await Bun.file(args.path).text()
        const stripped =
          root && args.path.startsWith(root)
            ? stripServerExports(args.path, original)
            : undefined
        const source = stripped ?? original
        const sourceFile = parse(args.path, source)

        const importsToTransform: ts.ImportDeclaration[] = []

        for (const stmt of sourceFile.statements) {
          if (
            !ts.isImportDeclaration(stmt) ||
            !stmt.importClause ||
            stmt.importClause.isTypeOnly
          ) {
            continue
          }

          const namedBindings = stmt.importClause.namedBindings
          if (!namedBindings || !ts.isNamedImports(namedBindings)) {
            continue
          }

          // `import type Default, { ... }` is invalid syntax
          if (stmt.importClause.name) {
            continue
          }

          let allTypeOnly = namedBindings.elements.length > 0
          for (const element of namedBindings.elements) {
            if (element.isTypeOnly) continue
            if (!isBindingOnlyUsedAsType(sourceFile, element.name.text)) {
              allTypeOnly = false
              break
            }
          }

          if (allTypeOnly) {
            importsToTransform.push(stmt)
          }
        }

        if (importsToTransform.length === 0) {
          return stripped
            ? {
                contents: stripped,
                loader: args.path.endsWith('tsx') ? 'tsx' : 'jsx'
              }
            : undefined
        }

        const transformer: ts.TransformerFactory<ts.SourceFile> = (context) => {
          return (rootNode) => {
            const visit: ts.Visitor = (node) => {
              if (
                ts.isImportDeclaration(node) &&
                importsToTransform.includes(node)
              ) {
                const importClause = node.importClause!
                const newImportClause = ts.factory.updateImportClause(
                  importClause,
                  true,
                  importClause.name,
                  importClause.namedBindings
                )
                return ts.factory.updateImportDeclaration(
                  node,
                  node.modifiers,
                  newImportClause,
                  node.moduleSpecifier,
                  node.assertClause
                )
              }
              return ts.visitEachChild(node, visit, context)
            }
            return ts.visitNode(rootNode, visit) as ts.SourceFile
          }
        }

        const result = ts.transform(sourceFile, [transformer])
        const transformedSourceFile = result.transformed[0]
        const printer = ts.createPrinter()
        const newSource = printer.printFile(transformedSourceFile!)
        result.dispose()

        return {
          contents: newSource,
          loader: args.path.endsWith('tsx') ? 'tsx' : 'jsx'
        }
      })
    }
  }
}
