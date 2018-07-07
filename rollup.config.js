/* Based on https://github.com/rollup/rollup-starter-lib/tree/babel */
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const external = ['react', 'react-jss', 'antd', 'moment', 'ramda', 'shortid'];

export default [
  {
    input: 'src/index.js',
    external,
    output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }],
    plugins: [
      resolve({
        module: true,
      }),
      commonjs({
        include: 'node_modules/**',
        ignore: external,
      }),
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
];
