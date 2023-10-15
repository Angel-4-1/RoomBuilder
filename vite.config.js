import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

const isCodeSandbox =
  'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default defineConfig({
  plugins: [react()],
  root: 'src/',
  publicDir: '../public/',
  base: './',
  server: {
    host: true,
    open: !isCodeSandbox, // Open if it's not a CodeSandbox
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
})
