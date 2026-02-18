import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import skills from '../data/skills.json' with { type: 'json' };
import projects from '../data/projects.json' with { type: 'json' };
import resume from '../data/resume.json' with { type: 'json' };
import general from '../data/general.json' with { type: 'json' };
import help from '../data/help.json' with { type: 'json' };
import { generateText } from '../lib/vertex.js';

const router = Router();

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

interface AskStefanRequestBody {
  question: string;
}

// Simple in-memory rate limiting
const requestCounts = new Map<string, RateLimitRecord>();

function checkRateLimit(ip: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

router.post(
  '/',
  [
    body('question')
      .trim()
      .isString()
      .isLength({ min: 1, max: 500 })
      .withMessage('Question must be between 1 and 500 characters')
      .custom((value: string) => {
        // Reject if only whitespace
        if (!value || !value.trim()) {
          throw new Error('Question cannot be empty or whitespace only');
        }
        return true;
      }),
  ],
  async (req: Request, res: Response) => {
    // Rate limiting - 10 requests per hour per IP
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(ip, 10, 60 * 60 * 1000)) {
      return res.status(429).json({ error: 'Too many AI requests. Please try again in 1 hour.' });
    }

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { question }: AskStefanRequestBody = req.body;

    // Ensure Vertex AI is configured in the environment before attempting a request
    const projectId = process.env.GOOGLE_CLOUD_PROJECT;
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!projectId || !apiKey) {
      console.error('Missing Vertex AI env vars', { projectId: !!projectId, hasApiKey: !!apiKey });
      return res.status(503).json({ error: 'AI backend not configured. Please contact admin.' });
    }

    const context = `
SKILLS_JSON: ${JSON.stringify(skills)}
PROJECTS_JSON: ${JSON.stringify(projects)}
RESUME_JSON: ${JSON.stringify(resume)}
GENERAL_JSON: ${JSON.stringify(general)}
HELP_JSON: ${JSON.stringify(help)}
  `;

    const prompt = `
You are Stefan AI, the assistant for Stefan Bobrowski's portfolio.
Answer questions using ONLY information found in the provided JSON context unless the user requests general advice or general technical help.

STRICT RULES:
1. Do NOT use markdown bold, italics, blockquotes, code fences, or emojis.
2. When listing skills, categories, or items, always use simple dash-prefixed bullet lists:
   - Example item
   - Another item
3. Categories with sub-items MUST follow this structure:
   - Category:
     - Sub-item 1
     - Sub-item 2
4. Never place categories and sub-items on the same bullet level.
5. Keep responses clean, plain, and structured.
6. Avoid decorative characters such as asterisks, stars, or unusual symbols.
7. When answering about work, skills, or experience, list only what exists in SKILLS_JSON, PROJECTS_JSON, RESUME_JSON, or GENERAL_JSON.
8. If the user asks for something not in the context, say it is not documented unless it is general advice or general coding help.
9. Never invent or hallucinate skills, tools, projects, or experience not explicitly found in the JSON context.
10. Do NOT repeat the entire context back to the user.

STRUCTURE RULES:
- Begin with a direct one-sentence answer when appropriate.
- If multiple items need to be listed, always use this exact structure:

Answer:
<one sentence>

Details:
- Category:
  - Sub-item
  - Sub-item
- Category:
  - Sub-item
  - Sub-item

OPTIONAL SECTIONS (use only when helpful):
Summary:
- Short recap

Relevant Skills:
- Skill A
- Skill B
- Skill C

TONE:
- Friendly and professional
- Clear and direct
- No fluff or filler
- Developer portfolio style

CONTEXT (READ ONLY):
${context}

USER QUESTION:
${question}
  `;

    try {
      const answer = await generateText(prompt);
      res.json({ answer });
    } catch (error) {
      console.error('AI generation error:', error);
      res.status(500).json({
        error: 'Failed to generate response. Please try again.',
        detail: error instanceof Error ? error.message : String(error),
      });
    }
  }
);

export default router;
