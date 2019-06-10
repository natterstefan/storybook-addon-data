module.exports = {
  collectCoverageFrom: ['packages/storybook-addon-data/src/**/*.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/(dist|node_modules|cypress)/'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!react-syntax-highlighter)',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
}
