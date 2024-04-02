import esbuild from 'esbuild'
import pkg from './package.json' assert { type: "json" }

esbuild.build({
  entryPoints: ['src/index.ts'],
  outdir: 'lib',
  platform: 'node',
  target: 'node18',
  format: 'cjs',
  bundle: true,
  sourcemap: true,
  define: {
    'process.env.DOWNLOAD_STOCK_PRICES_SCHEDULE': `'${process.env.DOWNLOAD_STOCK_PRICES_SCHEDULE || '0 0' } * * 1,2,3,4,5'`,
  },
  external: Object.keys(pkg.dependencies),
}).catch((error) => {
  console.error(error)
  process.exit(1)
})
