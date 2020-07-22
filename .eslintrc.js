module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  rules: {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*.spec.ts", "**/__mock__/*.ts"]}]
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript-prettier',
  ],
}
