import { google } from 'googleapis';

export default async function handler(req, res) {
  try {
    const keys = {
      type: 'service_account',
      project_id: process.env.CLIENT_ID,
      private_key: process.env.CLIENT_SECRET,
      client_email: process.env.CLIENT_EMAIL
    };

    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = '1bZzaUZOxaCzXLvy8ix2-RzOZNcD-LkNA5MkzxQYhJRY';
    const range = 'Sheet1!A1:C10';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    console.log(response);

    const rows = response.data.values || [];
    res.status(200).json({ rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
