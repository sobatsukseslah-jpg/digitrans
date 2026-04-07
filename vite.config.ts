import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(process.env.API_KEY || process.env.GEMINI_API_KEY || 'AIzaSyB8nSXTaASXRZHeK0EA4zGycicu1Tsis0o'),
        'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || 'AIzaSyB8nSXTaASXRZHeK0EA4zGycicu1Tsis0o')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
