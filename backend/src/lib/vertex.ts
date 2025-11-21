import dotenv from 'dotenv';
dotenv.config();

// Use "global" for the 2.5 models (required for newest APIs)
const LOCATION = 'global';
const API_BASE = `https://aiplatform.googleapis.com/v1/projects`;
const MODEL = 'publishers/google/models/gemini-2.5-flash';

export async function generateText(prompt: string): Promise<string> {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!projectId) throw new Error('Missing GOOGLE_CLOUD_PROJECT');
  if (!apiKey) throw new Error('Missing GOOGLE_API_KEY');

  const url = `${API_BASE}/${projectId}/locations/${LOCATION}/${MODEL}:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Vertex AI error:', text);
    throw new Error(`Vertex AI API request failed: ${res.status}`);
  }

  const data = await res.json();

  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response from Gemini.';
}

export default generateText;
