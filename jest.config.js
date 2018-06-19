module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: ['<rootDir>/tests/helpers/query.test.js'],
  displayName: '@spotlightdata/nanowire-extensions',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // this is just here so our examples look like they would in a real project
    '@spotlightdata/nanowire-extensions': require.resolve('./src'),
  },
};
