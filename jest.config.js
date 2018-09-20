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
    '\\$internal': require.resolve('./src/internal/main'),
  },
  setupTestFrameworkScriptFile: '<rootDir>/tests/setup-test-env.js',
};
