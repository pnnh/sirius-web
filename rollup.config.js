import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { visualizer } from 'rollup-plugin-visualizer'
import strip from '@rollup/plugin-strip'
import esbuild from 'rollup-plugin-esbuild'
import alias from '@rollup/plugin-alias'
import scss from 'rollup-plugin-scss'
import path from 'path' 
import del from 'rollup-plugin-delete'

const customResolver = nodeResolve({
  extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss']
})

const isProduction = process.env.NODE_ENV === 'production'

const clientConfig = {
  input: 'src/entry-client.tsx',
  preserveEntrySignatures: false,
  output: {
    dir: 'dist/assets', 
    format: 'iife'
  },
  plugins: [
    del({ targets: 'dist/assets/*', force: true }),
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, 'src') }, 
      ],
      customResolver
    }),
    commonjs(),
    nodeResolve(),
    esbuild({ 
      include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
      sourceMap: true, // default
      minify: process.env.NODE_ENV === 'production',
      target: 'esnext', // default, or 'es20XX', 'esnext'
      jsx: 'transform', // default, or 'preserve'
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      // Like @rollup/plugin-replace
      define: {
        __VERSION__: '"x.y.z"',
      },
      tsconfig: 'tsconfig.json', // default 
      loaders: { 
        '.json': 'json', 
        '.js': 'jsx',
      },
    }),
    scss({
      output: 'dist/assets/index.css',
      watch: ['src']
    }),
    strip({
      include: '**/*.(js|mjs|ts|tsx)',
      debugger: !isProduction,
      functions: isProduction ? ['console.log', 'console.debug'] : [],
      sourceMap: isProduction
    }),
    visualizer({
      filename: 'debug/status.html'
    })
  ]
}

const serverConfig = {
  input: 'src/entry-server.tsx',
  preserveEntrySignatures: false,
  output: {
    dir: "dist/bin", 
    format: 'cjs'
  },
  plugins: [
    del({ targets: 'dist/bin/*', force: true }),
    commonjs(),
    nodeResolve(),
    esbuild({
      // All options are optional
      include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
      sourceMap: true, // default
      minify: process.env.NODE_ENV === 'production',
      target: 'esnext', // default, or 'es20XX', 'esnext'
      jsx: 'transform', // default, or 'preserve'
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      // Like @rollup/plugin-replace
      define: {
        __VERSION__: '"x.y.z"',
      },
      tsconfig: 'tsconfig.json', // default 
      loaders: { 
        '.json': 'json', 
        '.js': 'jsx',
      },
    }), 
    strip({
      include: '**/*.(js|mjs|ts|tsx)',
      debugger: !isProduction,
      functions: isProduction ? [ 'console.debug'] : [],
      sourceMap: isProduction
    }), 
  ]
}

export default [clientConfig, serverConfig]
