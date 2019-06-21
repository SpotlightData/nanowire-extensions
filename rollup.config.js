import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
  input: './v2/source/index.ts',
  output: [
    {
      format: 'cjs',
      file: './v2/dist/index.cjs.js',
    },
    {
      format: 'esm',
      file: './v2/dist/index.esm.js',
    },
  ],
  // Externals should be used on all peer dependencies
  plugins: [json(), typescript(), resolve({ preferBuiltins: true }), commonjs({})],
};
