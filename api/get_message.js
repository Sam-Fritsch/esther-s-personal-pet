// api/get_message.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });

  const TOKEN = process.env.GITHUB_TOKEN;
  const REPO = process.env.GITHUB_REPO;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/contents/data/message.json`,
      { headers: { Authorization: `token ${TOKEN}` } }
    );
    
    const data = await response.json();
    const content = JSON.parse(Buffer.from(data.content, 'base64').toString());

    return res.status(200).json(content);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to fetch' });
  }
}

