module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:mocha/recommended',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
  ],
  parser: '@typescript-eslint/parser',

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],

      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/no-unsafe-argument': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/restrict-plus-operands': 0,
        'import/no-unresolved': 0,
        'prettier/prettier': 'error',
        'require-jsdoc': 0,
        'new-cap': 0,
        '@typescript-eslint/unbound-method': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/require-await': 0,
      },
      plugins: ['@typescript-eslint', 'import'],
    },
  ],
  ignorePatterns: ['/lib/**/*', '/tests/**/*'],
};
