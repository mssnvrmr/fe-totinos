import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // fsevents-based watching does not fire in this environment, so HMR
    // only works when Vite polls the filesystem for changes.
    watch: {
      usePolling: true,
      interval: 200,
    },
  },
})
