import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ONLINE",
      kernel: "2026.8.12.DEVSYS.KERNEL",
      version: "v2026.8.12",
      host: "root@Himanshu",
      uptime: "99.999%",
      latency: "24ms",
      timestamp: new Date().toISOString(),
    });
  });

  // AI Assistant endpoint using Gemini
  app.post("/api/ai", async (req, res) => {
    try {
      const { prompt, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(400).json({
          error: "GEMINI_API_KEY not configured.",
          reply: "System warning: GEMINI_API_KEY is missing. Configure secrets in AI Studio settings to enable terminal AI query execution."
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are ROOT_AI, an embedded developer system terminal assistant on Himanshu Yadav's official portfolio system (root@Himanshu v2026.8.12).
Provide concise, technical, terminal-formatted CLI responses. Use code blocks, clean ascii, or short bullet points.
Profile details (from https://www.iamhimanshu.in):
- Name: Himanshu Yadav
- Hostname: root@Himanshu
- System Version: v2026.8.12
- Role: Full Stack Web Developer & Automation Specialist // Backend AI & DevOps Architect
- Official Portfolio: https://www.iamhimanshu.in
- Email: hiyadav2022@gmail.com | GitHub: @iamhimanshu108
- Tech Stack: Java Spring Boot, Spring Security, React.js, Next.js, MERN Stack, FastAPI, Node.js, Python, TypeScript, TailwindCSS, MaterialUI, Docker, MySQL, MongoDB, PostgreSQL, REST APIs, Gemini API.
- Key Capabilities: Custom automation architectures for WhatsApp, Telegram, Email, AppSheet, and Google Apps Script.
- Key Featured Projects:
  1. ATS Score Analyzer (React, Gemini AI, TypeScript, TailwindCSS)
  2. AI Email Reply Assistant (Spring Boot, React.js, MaterialUI, Gemini API)
  3. Multi-Channel Automation Engine (FastAPI, Google Apps Script, AppSheet, Docker)
  4. Crypto Tracker (React, CoinGecko API)
  5. Weather & Climate Dashboard (React, OpenWeather API)
  6. OTP Verification Service (Spring Boot, Spring Security, JWT, ReactJs)
  7. Employee Management Portal (Spring Boot, ReactJs, MySQL, MaterialUI)
Answer the user's CLI question or system inquiry concisely in terminal style format.`;

      const contents = history && Array.isArray(history) && history.length > 0
        ? history.concat([{ role: "user", parts: [{ text: prompt }] }])
        : prompt;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      });

      res.json({
        reply: response.text || "Command executed with no output.",
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      console.error("AI Terminal error:", err);
      res.status(500).json({
        error: err.message || "Execution error",
        reply: `[ERROR_TERMINAL_AI] ${err.message || "Failed to process query."}`
      });
    }
  });

  // Contact API endpoint
  app.post("/api/contact", (req, res) => {
    const { name, email, message, subject } = req.body;
    console.log(`[CONTACT_DISPATCH] From: ${name} <${email}> | Subject: ${subject || "General"}\nMessage: ${message}`);
    
    // Simulate contact dispatch with delay
    setTimeout(() => {
      res.json({
        success: true,
        status: "200_OK",
        message: "Message successfully dispatched to Himanshu Yadav's inbox queue.",
        packetId: `PKT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        timestamp: new Date().toISOString()
      });
    }, 600);
  });

  // Real GitHub Contributions API proxy endpoint
  app.get("/api/github-contributions", async (req, res) => {
    try {
      const username = (req.query.username as string) || "iamhimanshu108";
      const year = (req.query.year as string) || "2026";
      
      const ghUrl = `https://github.com/users/${encodeURIComponent(username)}/contributions?from=${year}-01-01&to=${year}-12-31`;
      const response = await fetch(ghUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html"
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub responded with status ${response.status}`);
      }

      const html = await response.text();

      // Parse Total Count
      const totalMatch = html.match(/([0-9,]+)\s+contributions/i);
      const totalContributions = totalMatch ? parseInt(totalMatch[1].replace(/,/g, "")) : 0;

      // Map day IDs to day objects
      const dayMap = new Map<string, { id: string; date: string; level: number; count: number; text: string }>();
      const tdMatches = html.match(/<td[^>]*class="ContributionCalendar-day"[^>]*>/g) || [];

      for (const td of tdMatches) {
        const dateM = td.match(/data-date="([^"]+)"/);
        const levelM = td.match(/data-level="([^"]+)"/);
        const idM = td.match(/id="([^"]+)"/);
        if (dateM && levelM && idM) {
          dayMap.set(idM[1], {
            id: idM[1],
            date: dateM[1],
            level: parseInt(levelM[1]),
            count: 0,
            text: `0 contributions on ${dateM[1]}`
          });
        }
      }

      const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>(.*?)<\/tool-tip>/gi;
      let match;
      while ((match = tooltipRegex.exec(html)) !== null) {
        const id = match[1];
        const text = match[2];
        if (dayMap.has(id)) {
          let count = 0;
          const countMatch = text.match(/([0-9,]+)\s+contribution/i);
          if (countMatch) {
            count = parseInt(countMatch[1].replace(/,/g, ""));
          }
          dayMap.get(id)!.count = count;
          dayMap.get(id)!.text = text.replace(/<\/?[^>]+(>|$)/g, "");
        }
      }

      const daysArr = Array.from(dayMap.values()).sort((a, b) => a.date.localeCompare(b.date));

      // Ensure full year date coverage (Jan 1 to Dec 31)
      const targetYearNum = parseInt(year) || 2026;
      const isLeap = (targetYearNum % 4 === 0 && targetYearNum % 100 !== 0) || (targetYearNum % 400 === 0);
      const totalYearDays = isLeap ? 366 : 365;

      const dayByDateMap = new Map<string, typeof daysArr[0]>();
      for (const d of daysArr) {
        dayByDateMap.set(d.date, d);
      }

      const fullYearDays: typeof daysArr = [];
      const yearStart = new Date(Date.UTC(targetYearNum, 0, 1));

      for (let i = 0; i < totalYearDays; i++) {
        const d = new Date(yearStart);
        d.setUTCDate(yearStart.getUTCDate() + i);
        const dateStr = d.toISOString().split("T")[0];

        if (dayByDateMap.has(dateStr)) {
          fullYearDays.push(dayByDateMap.get(dateStr)!);
        } else {
          fullYearDays.push({
            id: `gen-${dateStr}`,
            date: dateStr,
            level: 0,
            count: 0,
            text: `0 contributions on ${dateStr}`
          });
        }
      }

      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;
      let maxDaily = 0;

      for (let i = 0; i < fullYearDays.length; i++) {
        const day = fullYearDays[i];
        if (day.count > maxDaily) maxDaily = day.count;

        if (day.count > 0 || day.level > 0) {
          tempStreak++;
          if (tempStreak > longestStreak) longestStreak = tempStreak;
        } else {
          tempStreak = 0;
        }
      }

      for (let i = fullYearDays.length - 1; i >= 0; i--) {
        if (fullYearDays[i].count > 0 || fullYearDays[i].level > 0) {
          currentStreak++;
        } else {
          if (i === fullYearDays.length - 1) continue;
          break;
        }
      }

      res.json({
        username,
        year,
        totalContributions,
        currentStreak,
        longestStreak,
        maxDaily,
        days: fullYearDays
      });

    } catch (err: any) {
      console.error("Error fetching GitHub contributions:", err);
      res.status(500).json({
        error: "Failed to fetch live GitHub contributions",
        username: "iamhimanshu108",
        year: req.query.year || "2026"
      });
    }
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[DEVSYS_KERNEL] Terminal Portfolio running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
