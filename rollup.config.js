/* Based on https://github.com/rollup/rollup-starter-lib/tree/babel */
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    external: ['react', 'antd'],
    output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }],
    plugins: [
      resolve({
        module: true,
      }),
      commonjs({
        include: 'node_modules/**', // Default: undefined
      }),
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
];
