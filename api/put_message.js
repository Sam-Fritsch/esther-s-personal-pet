// api/put_message.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { dailyMessage } = req.body;
  if (!dailyMessage) return res.status(400).json({ error: 'Missing dailyMessage' });

  const TOKEN = process.env.GITHUB_TOKEN;
  const REPO = process.env.GITHUB_REPO; // e.g., "username/repo-name"

  try {
    // Get current file SHA
    const getRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/data/message.json`,
      { headers: { Authorization: `token ${TOKEN}` } }
    );
    const { sha } = await getRes.json();

    // Update file
    const content = Buffer.from(JSON.stringify({ dailyMessage }, null, 2)).toString('base64');
    
    await fetch(
      `https://api.github.com/repos/${REPO}/contents/data/message.json`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Update message',
          content,
          sha
        })
      }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to update' });
  }
}
