/* Based on https://github.com/rollup/rollup-starter-lib/tree/babel */
// import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  {
    entry: 'src/index.js',
    external: ['ms'],
    targets: [{ dest: pkg.main, format: 'cjs' }, { dest: pkg.module, format: 'es' }],
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
];
