import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/FormValidate/index.js',
  output: [
    {
      file: 'dist/vanillajs-form-validator.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/vanillajs-form-validator.es.js',
      format: 'es'
    },
    {
      file: 'dist/vanillajs-form-validator.min.js',
      format: 'iife',
      name: 'FormValidate',
      plugins: [terser()]
    }
  ]
}
