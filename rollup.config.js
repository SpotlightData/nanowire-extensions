/* Based on https://github.com/rollup/rollup-starter-lib/tree/babel */
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const external = Object.keys(pkg.peerDependencies).concat([
  'rxjs/ajax',
  'rxjs/operators',
  'uppy/lib/core/Plugin',
  'uppy/lib/plugins/DragDrop',
]);

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
        namedExports: {
          'node_modules/react-dom/index.js': ['findDOMNode', 'createPortal', 'render'],
        },
      }),
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
];
