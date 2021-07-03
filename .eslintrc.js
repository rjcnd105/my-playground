module.exports = {
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  extends: ['next', 'next/core-web-vitals', 'plugin:prettier/recommended'],

  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'react/prop-types': 'off',

    // react-jsx
    // 'react/jsx-uses-react': 'off',
    // 'react/react-in-jsx-scope': 'off',
  },
}
