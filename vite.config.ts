import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv, type Plugin} from 'vite';

// Static pages that live in public/ as directories, e.g. public/resources/.
// GitHub Pages serves their index.html happily, but Vite's dev server answers
// with the SPA shell instead, so the router renders a 404 and the page looks
// broken in dev only. Serve the file directly so dev matches production.
function publicDirectoryPages(): Plugin {
  return {
    name: 'public-directory-pages',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').split('?')[0];
        const match = /^\/([\w-]+)\/?$/.exec(url);
        if (!match) return next();
        const file = path.resolve(__dirname, 'public', match[1], 'index.html');
        if (!fs.existsSync(file)) return next();
        res.setHeader('Content-Type', 'text/html');
        res.end(fs.readFileSync(file));
      });
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), publicDirectoryPages()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify: file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
