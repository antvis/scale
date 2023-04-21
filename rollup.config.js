import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/scale.min.js',
      name: 'Scale',
      format: 'umd',
      sourcemap: false,
    },
    plugins: [resolve(), commonjs(), typescript(), uglify()],
  },
];
