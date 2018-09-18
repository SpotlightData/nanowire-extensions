const {
  start,
  devServer,
  when,
  bundle,
  library,
  configure,
  customise,
  tag,
  tap,
} = require('@atecake/builder');

const pkg = require('./package.json');

start([
  configure(),
  customise(config => {
    const [env, react] = config.build.babel.presets;
    const newEnv = [
      '@babel/preset-env',
      Object.assign({}, env[1], {
        targets: {
          ie: 11,
        },
      }),
    ];
    return {
      build: {
        babel: {
          presets: [newEnv, react],
        },
      },
    };
  }),
  when('build', [
    bundle({ files: { input: 'src/index.js', output: pkg.main } }),
    bundle({
      files: { input: 'src/index.js', output: pkg.module },
      build: { rollup: { format: 'esm' } },
      action: Promise.resolve(),
    }),
    library({
      files: { input: 'src', output: 'lib' },
      build: { rollup: { format: 'cjs' } },
      action: Promise.resolve(),
    }),
  ]),
  when('start', [devServer()]),
  when('tag', [tag()]),
]);
