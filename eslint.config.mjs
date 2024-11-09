import antfu from '@antfu/eslint-config'
export default antfu({
  type: 'lib',
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  ignores: ['node_modules', '**/node_modules/**', 'node_modules/', '**/node_modules/**/', 'template/**', 'unocss/**', 'index.cjs'],
}, {
  rules: {
    'spaced-comment': ['error', 'always', { exceptions: ['#__PURE__'] }],
    'node/no-callback-literal': 'off',
    'import/namespace': 'off',
    'eqeqeq': 'off',
    'import/default': 'off',
    'node/prefer-global/process': 'off',
    'ts/explicit-function-return-type': 'off',
    'import/no-named-as-default': 'off',
    'ts/no-use-before-define': 'off',
    'import/no-named-as-default-member': 'off',
    'curly': ['error', 'multi-line'],
    'style/max-statements-per-line': ['error', {
      max: 2,
    }],
    'max-statements-per-line': ['error', {
      max: 2,
    }],
  },
}, {
  files: ['scripts/*.ts', 'src/index.ts'],
  rules: {
    'no-alert': 'off',
    'no-console': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-restricted-imports': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    'unused-imports/no-unused-vars': 'off',
  },
})
