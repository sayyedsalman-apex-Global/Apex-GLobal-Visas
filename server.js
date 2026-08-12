import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { handleEmailRequest } from './server/email-handler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.RESEND_API_KEY;

// API Endpoints for secure email routing


app.post('/api/send-assessment', async (req, res) => {
  try {
    const result = await handleEmailRequest({ action: 'assessment', data: req.body }, apiKey);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/send-advisory', async (req, res) => {
  try {
    const result = await handleEmailRequest({ action: 'advisory', data: req.body }, apiKey);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});





// Serve static assets from built Vite client dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback all other requests to index.html for Single Page App routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[PROD SERVER] Apex server running on port ${PORT}`);
});
