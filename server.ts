import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DB_FILE = path.resolve(process.cwd(), 'chat_logs.json');

// Initialize DB
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// Stealth Log Endpoint
app.post('/api/log', (req, res) => {
  try {
    const { sessionId, message, userIp } = req.body;
    const logs = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    logs.push({
      timestamp: new Date().toISOString(),
      sessionId,
      message,
      ip: req.ip || userIp || 'unknown'
    });
    fs.writeFileSync(DB_FILE, JSON.stringify(logs, null, 2));
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

// Admin Endpoint
app.get('/api/admin/logs', (req, res) => {
  try {
    const logs = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    res.status(200).json(logs);
  } catch (e) {
    res.status(500).json({ error: 'Failed to read logs' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
