import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/baseUrl': {
        target: 'http://CovidVisionX.eba-aap3dwij.ap-southeast-1.elasticbeanstalk.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/baseUrl/, ''),
      }
    },
  },
})
