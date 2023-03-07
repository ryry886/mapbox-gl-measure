import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve'
import terser from '@rollup/plugin-terser';
const production = !process.env.ROLLUP_WATCH;
export default {
  input: ['index.js'],
  output: {
    name: 'MapboxMeasure',
    file: "dist/mapbox-gl-measure.js",
    format: 'umd',
    sourcemap: !production,
    // globals:{
    //   '@mapbox/mapbox-gl-draw':'MapboxDraw' //告诉rollup @mapbox/mapbox-gl-draw模块的ID  为全局变量 MapboxDraw
    // }
  },
  treeshake: true,
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    production && terser(), //生产环境压缩
    !production && serve({   //开发环境打开示例
      open:true,
      openPage:'/public/index.html',
      contentBase: '',
    })
  ],
  // external:['@mapbox/mapbox-gl-draw'] //不打包@mapbox/mapbox-gl-draw，需配合globals
};