import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { handleApiRequest } from "./apiHandler";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // API Middleware delegate
  app.use(async (req, res, next) => {
    if (req.url && req.url.startsWith('/api/')) {
      try {
        const handled = await handleApiRequest(req, res);
        if (handled) return;
      } catch (err) {
        console.error("API error:", err);
      }
    }
    next();
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`[KERNEL] Server running on http://localhost:${PORT}`);
  });
}

startServer();
