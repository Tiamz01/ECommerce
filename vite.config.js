import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-redux'],
          ui: ['@heroicons/react'],
          utils: ['lodash']
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    // Enable CSS minification
    minify: 'esbuild',
    // Enable CSS optimization
    cssMinify: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-redux', '@heroicons/react'],
  },
  server: {
    cors: true,
    strictPort: true,
  },
  // Add CSS optimization
  css: {
    postcss: './postcss.config.cjs',
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`
      }
    }
  }
})