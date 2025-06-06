// @ts-check
import eslintJs from '@eslint/js'
import eslintReact from '@eslint-react/eslint-plugin'
import tseslint from 'typescript-eslint'

export default tseslint.config({
  files: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}'
  ],

  // Extend recommended rule sets from:
  // 1. ESLint JS's recommended rules
  // 2. TypeScript ESLint recommended rules
  // 3. ESLint React's recommended-typescript rules
  extends: [
    eslintJs.configs.recommended,
    tseslint.configs.recommended,
    eslintReact.configs['recommended-typescript']
  ],

  // Configure language/parsing options
  languageOptions: {
    // Use TypeScript ESLint parser for TypeScript files
    parser: tseslint.parser,
    parserOptions: {
      // Enable project service for better TypeScript integration
      projectService: true,
      tsconfigRootDir: import.meta.dirname
    }
  },

  // Custom rule overrides (modify rule levels or disable rules)
  rules: {
    '@eslint-react/no-missing-key': 'warn',
    'no-irregular-whitespace': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'off',
    '@eslint-react/web-api/no-leaked-resize-observer': 'off',
    '@eslint-react/no-array-index-key': 'off',
    '@eslint-react/dom/no-missing-button-type': 'off'
  }
})
