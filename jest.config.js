module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  displayName: '@spotlightdata/nanowire-extensions',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // This is just here so our examples look like they would in a real project
    '@spotlightdata/nanowire-extensions': require.resolve('./src'),
  },
  setupTestFrameworkScriptFile: require.resolve('./tests/setup-test-env.js'),
  setupFiles: ['jest-canvas-mock'],
};
