// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  entry: 'es6/index.js',
  format: 'cjs',
  sourceMap: 'inline',  
  external: ['node-fetch'],
  plugins: [
    resolve({jsnext: true}),
    sourcemaps(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    uglify()
  ],
  dest: 'es5/index.js'
};