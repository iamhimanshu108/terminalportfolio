import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleApiRequest } from '../apiHandler.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Delegate to existing apiHandler
    const handled = await handleApiRequest(req as any, res as any);
    if (!handled) {
      res.status(404).json({ error: "Endpoint not found" });
    }
  } catch (error: any) {
    console.error("Vercel Serverless API Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
