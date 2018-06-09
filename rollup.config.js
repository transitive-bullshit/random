import replace from 'rollup-plugin-replace' // rollup-plugin-alias'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'

export default {
  input: 'src/random.js',
  output: [
    {
      file: pkg.browser,
      format: 'cjs',
      sourceMap: true
    }
  ],
  // external: Object.keys(pkg.dependencies),
  plugins: [
    replace({
      exclude: 'node_modules/**',
      delimiters: [ '\'', '\'' ],
      values: {
        'ow': '\'ow-shim\''
      }
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      browser: true
    }),
    commonjs()
  ]
}
