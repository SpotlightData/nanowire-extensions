# nanowire-extensions

[![Build Status](https://travis-ci.com/SpotlightData/nanowire-extensions.svg?branch=master)](https://travis-ci.com/SpotlightData/nanowire-extensions)

## Installation

`yarn add @spotlightdata/nanowire-extensions` or `npm install @spotlightdata/nanowire-extensions`

## Testing

Run `yarn test` to start. We use `jest` as our test runner together with `react-testing-library`.

### Notes on peerDependencies

Because some of the dependencies are listed as peerDependencies, we require to manually install them as neither npm or yarn have a solution as of this time.
Run `yarn prepare` to run installation script for them.
