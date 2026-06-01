import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import importHelpers from 'eslint-plugin-import-helpers';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  // Ignora (substitui o antigo .eslintignore)
  {
    ignores: ['*.js', 'eslint.config.js', 'node_modules/**', 'dist/**'],
  },

  // Bases recomendadas
  js.configs.recommended,
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,

  // Regras do projeto (migradas do .eslintrc.json)
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      'import-helpers': importHelpers,
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      camelcase: 'off',
      'class-methods-use-this': 'off',
      'no-shadow': 'off',
      'no-console': 'off',
      'no-useless-constructor': 'off',
      'no-empty-function': 'off',
      'lines-between-class-members': 'off',
      'import/no-unresolved': 'error',
      'import/prefer-default-export': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        { ts: 'never' },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['**/*.spec.ts', '**/*.spec.js'] },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: ['module', '/^@shared/', ['parent', 'sibling', 'index']],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
    },
  },

  // Desativa regras do ESLint que conflitam com o Prettier (deve ficar por último)
  prettier,
);
