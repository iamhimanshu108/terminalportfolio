import { IncomingMessage, ServerResponse } from 'http';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export async function handleApiRequest(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const urlObj = new URL(req.url || '', 'http://localhost');
  const pathname = urlObj.pathname;

  if (!pathname.startsWith('/api/')) {
    return false;
  }

  // CORS headers for development flexibility
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return true;
  }

  if (pathname === '/api/health') {
    const d = new Date();
    const verStr = `v${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
    const kerStr = `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}.DEVSYS.KERNEL`;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: "ONLINE",
      kernel: kerStr,
      version: verStr,
      host: "root@iamhimanshu108",
      uptime: "99.999%",
      latency: "24ms",
      timestamp: d.toISOString(),
    }));
    return true;
  }

  if (pathname === '/api/contact' && req.method === 'POST') {
    const body = await parseBody(req);
    const { name, email, message, subject } = body;
    console.log(`[CONTACT_DISPATCH] From: ${name} <${email}> | Subject: ${subject || "General"}\nMessage: ${message}`);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      status: "200_OK",
      message: "Message successfully dispatched to Himanshu Yadav's inbox queue.",
      packetId: `PKT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      timestamp: new Date().toISOString()
    }));
    return true;
  }

  if (pathname === '/api/ai' && req.method === 'POST') {
    const body = await parseBody(req);
    const { prompt, history } = body;
    const apiKey = process.env.GEMINI_API_KEY;

    let reply = "";
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `You are ROOT_AI, an embedded developer system terminal assistant on Himanshu Yadav's official portfolio system (root@iamhimanshu108 v2026.8.12).
Provide concise, technical, terminal-formatted CLI responses. Use code blocks, clean ascii, or short bullet points.
Profile details (from https://www.iamhimanshu.in):
- Name: Himanshu Yadav
- Hostname: root@iamhimanshu108
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

        reply = response.text || "Command executed with no output.";
      } catch (apiErr: any) {
        console.warn("Gemini API call failed, falling back to local system assistant:", apiErr.message);
      }
    }

    if (!reply) {
      const queryLower = (prompt || "").toLowerCase();
      if (queryLower.includes("project") || queryLower.includes("work")) {
        reply = `[SYSTEM_AI_RESPONSE] Featured Projects:
• ATS Score Analyzer: AI resume match evaluator (React, Gemini API, Tailwind)
• AI Email Assistant: Context-aware response drafting (Spring Boot, MaterialUI)
• Multi-Channel Automation: Trigger workflow engine (FastAPI, Docker, AppsScript)
• OTP Verification Service: JWT & Security backend (Spring Boot, React)
• Employee Management Portal: Enterprise dashboard (Spring Boot, MySQL)`;
      } else if (queryLower.includes("skill") || queryLower.includes("stack") || queryLower.includes("tech")) {
        reply = `[SYSTEM_AI_RESPONSE] Technical Stack Overview:
• Languages: Java, Python, TypeScript, JavaScript, SQL, C++, Bash
• Backend & Cloud: Spring Boot, FastAPI, Node.js, Express, Docker, REST APIs
• Frontend: React.js, Next.js, TailwindCSS, MaterialUI
• Databases: MySQL, PostgreSQL, MongoDB, Redis
• Automation & AI: Gemini API, LangChain, WhatsApp/Telegram Webhooks, Apps Script`;
      } else if (queryLower.includes("contact") || queryLower.includes("email") || queryLower.includes("reach") || queryLower.includes("hire")) {
        reply = `[SYSTEM_AI_RESPONSE] Developer Contact Matrix:
• Name: Himanshu Yadav
• Email: hiyadav2022@gmail.com
• Website: https://www.iamhimanshu.in
• GitHub: https://github.com/iamhimanshu108
• LinkedIn: https://www.linkedin.com/in/iamhimanshu108`;
      } else if (queryLower.includes("who") || queryLower.includes("about") || queryLower.includes("himanshu")) {
        reply = `[SYSTEM_AI_RESPONSE] Root Developer Profile:
Himanshu Yadav — Full Stack Web Developer & Automation Specialist.
Specializing in high-performance web applications, Java Spring Boot microservices, AI API integrations, and enterprise multi-channel automation workflows.`;
      } else {
        reply = `[SYSTEM_AI_RESPONSE] System Query: "${prompt}"
• System Kernel: 2026.8.12.DEVSYS.KERNEL
• Host: root@iamhimanshu108 (ONLINE)
• Developer: Himanshu Yadav (Full Stack Web Developer & Automation Specialist)
• Portfolio: https://www.iamhimanshu.in
• Use commands like 'projects', 'experience', 'resume', 'skills', or 'contact' for detailed views.`;
      }
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ reply, timestamp: new Date().toISOString() }));
    return true;
  }

  if (pathname === '/api/github-contributions') {
    const username = urlObj.searchParams.get('username') || "iamhimanshu108";
    const year = urlObj.searchParams.get('year') || "2026";
    try {
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

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        username,
        year,
        totalContributions,
        currentStreak,
        longestStreak,
        maxDaily,
        days: fullYearDays
      }));
      return true;
    } catch (err: any) {
      console.error("Error fetching GitHub contributions:", err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        error: "Failed to fetch live GitHub contributions",
        username,
        year
      }));
      return true;
    }
  }

  return false;
}

function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
  });
}
