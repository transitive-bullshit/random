import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    outDir: 'dist',
    target: 'es2020',
    platform: 'neutral',
    format: ['esm'],
    sourcemap: true,
    minify: false,
    shims: true,
    dts: true
  }
])
