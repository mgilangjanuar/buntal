import * as ts from 'typescript'
import type { BunPlugin } from 'bun'

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

/**
 * Bun build plugin that converts value imports into `import type` for named
 * bindings that are only used as types within the source file.
 *
 * This allows page components to share modules with API routes without
 * causing build errors when the shared module uses Bun-only builtins (e.g.
 * `bun:sqlite`). At build time the type-only import is stripped and the
 * shared module is never pulled into the client bundle.
 */
export const createTypeOnlyImportsPlugin = (): BunPlugin => {
  return {
    name: 'buntal-type-only-imports',
    setup(build) {
      build.onLoad({ filter: /\.(tsx|jsx)$/ }, async (args) => {
        if (args.path.includes('node_modules')) {
          return
        }

        const source = await Bun.file(args.path).text()
        const sourceFile = ts.createSourceFile(
          args.path,
          source,
          ts.ScriptTarget.Latest,
          true,
          args.path.endsWith('tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.JSX
        )

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
          return
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
