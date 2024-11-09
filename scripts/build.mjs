import { build } from 'esbuild'

await build({
  bundle: true,
  entryPoints: ['src/index.ts'],
  outfile: 'index.cjs',
  format: 'cjs',
  platform: 'node',
  target: 'node14',
  plugins: [
    {
      name: 'alias',
      setup({ onResolve, resolve }) {
        onResolve({ filter: /^prompts$/, namespace: 'file' }, async ({ importer, resolveDir }) => {
          // we can always use non-transpiled code since we support 14.16.0+
          return await resolve('prompts/lib/index.js', {
            importer,
            resolveDir,
            kind: 'import-statement',
          })
        })
      },
    },
  ],
})
