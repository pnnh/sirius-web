import { defineConfig } from 'vite'
import path from 'path' 
import * as fs from 'fs' 
 
const config = defineConfig({
  plugins: [ 
  ],
  base: '/',
  server: {
    hmr: true
  },
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    manifest: true,
    ssrManifest: true,
    // rollupOptions: { 
    //   input: ['src/index.tsx'],
    //   output: { 
    //     dir: path.resolve(__dirname, 'dist'),
    //     format: 'esm', 
    //   }
    // }
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '~', replacement: path.resolve(__dirname, 'node_modules') }
    ]
  },
  publicDir: 'public',
  css: {
    preprocessorOptions: {
      sass: {}
    }
  }
})

export default config