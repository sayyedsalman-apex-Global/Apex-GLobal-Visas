import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { handleEmailRequest } from './server/email-handler.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  // Populate process.env so they can be referenced inside the shared email handler securely
  process.env.RESEND_API_KEY = env.RESEND_API_KEY;
  process.env.ADMIN_EMAIL = env.ADMIN_EMAIL;

  const apiKey = env.RESEND_API_KEY;

  const apiMiddleware = (req, res, next) => {
    const validRoutes = ['/api/send-assessment', '/api/send-advisory'];
    if (validRoutes.includes(req.url) && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
      });
      req.on('end', async () => {
        try {
          const data = JSON.parse(body);
          let action = '';
          if (req.url === '/api/send-assessment') action = 'assessment';
          if (req.url === '/api/send-advisory') action = 'advisory';

          const response = await handleEmailRequest({ action, data }, apiKey);
          res.writeHead(response.status, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(response.data));
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
      });
    } else {
      next();
    }
  };

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'resend-api',
        configureServer(server) {
          server.middlewares.use(apiMiddleware);
        },
        configurePreviewServer(server) {
          server.middlewares.use(apiMiddleware);
        }
      }
    ],
  };
})

