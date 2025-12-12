import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  const { dailyMessage } = req.body;

  if (!dailyMessage) {
    return res.status(400).json({ error: 'Missing dailyMessage' });
  }

  const filePath = path.join(process.cwd(), 'data', 'message.json');

  try {
    fs.writeFileSync(
      filePath,
      JSON.stringify({ dailyMessage }, null, 2)
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Write error:', error);
    return res.status(500).json({ error: 'Failed to write message.json' });
  }
}
