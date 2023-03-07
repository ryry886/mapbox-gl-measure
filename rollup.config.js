import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve'
import terser from '@rollup/plugin-terser';

export default {
  input: ['index.js'],
  output: {
    name: 'MapboxMeasure',
    file: "dist/mapbox-gl-measure.js",
    format: 'umd',
    sourcemap: true,
    // globals:{
    //   '@mapbox/mapbox-gl-draw':'MapboxDraw' //告诉rollup @mapbox/mapbox-gl-draw模块的ID  为全局变量 MapboxDraw
    // }
  },
  treeshake: true,
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    terser(),
    serve({
      open:true,
      openPage:'/public/index.html',
      contentBase: '',
    })
  ],
  // external:['@mapbox/mapbox-gl-draw'] //不打包@mapbox/mapbox-gl-draw，需配合globals
};