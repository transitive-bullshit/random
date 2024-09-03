import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    outDir: 'dist',
    target: 'es2018',
    platform: 'neutral',
    format: ['esm', 'cjs'],
    splitting: false,
    sourcemap: true,
    minify: false,
    shims: true,
    dts: true
  }
])
