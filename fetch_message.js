import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const filePath = path.join(process.cwd(), 'data', 'message.json');

  try {
    const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.status(200).json(json);
  } catch (error) {
    console.error("Read error:", error);
    res.status(500).json({ error: "Failed to read message.json" });
  }
}


