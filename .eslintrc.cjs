/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  plugins: ['import', 'simple-import-sort'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: [
    '/node_modules/',
    '/dist/',
    '/prisma/',
    '/.eslintrc.cjs',
    '/.gitignore',
    '/.pnpm-lock.yaml',
    '/.package.json',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        endOfLine: 'lf',
        printWidth: 80,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
      },
    ],
    'no-return-assign': 'off',
    'no-underscore-dangle': 'off',
    'no-void': ['error', { allowAsStatement: true }],
    'no-console': 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  globals: {
    globalThis: 'readonly',
  },
};
module.exports = config;
