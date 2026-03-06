import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  outDir: 'bin',
  format: ['esm'],
  shims: true,
})
