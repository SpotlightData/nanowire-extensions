module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: ['<rootDir>/tests/helpers/query.test.js'],
  displayName: 'nanowire-extensions',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // this is just here so our examples look like they would in a real project
    'nanowire-extensions': require.resolve('./src'),
  },
};
