import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: ['index.js'],
  output: {
    name: 'MapboxMeasure',
    file: "dist/mapbox-gl-measure.js",
    format: 'esm',
    sourcemap: true,
    indent: false
  },
  treeshake: true,
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),


  ],
};