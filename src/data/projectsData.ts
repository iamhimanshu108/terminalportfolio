import { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'ats_score_analyzer',
    order: 1,
    name: './ats_score_analyzer.ts',
    status: 'DEPLOYED',
    description: 'AI-powered ATS Resume Evaluation system built with React.js, Gemini AI, TypeScript, and TailwindCSS. Compares candidate resumes against target job descriptions to generate compatibility scores, key missing skill tags, and actionable resume optimization suggestions.',
    tech: ['React.js', 'Gemini AI', 'TypeScript', 'TailwindCSS'],
    repoUrl: 'https://github.com/iamhimanshu108/ats-score-analyzer',
    liveUrl: 'https://www.iamhimanshu.in/',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'ai_email_assistant',
    order: 2,
    name: './ai_email_assistant.java',
    status: 'DEPLOYED',
    description: 'Intelligent email composition and response assistant microservice powered by Spring Boot, React.js, Material-UI, Spring Security, and the Gemini API. Automatically context-evaluates incoming email threads and drafts tailored, professional replies.',
    tech: ['Spring Boot', 'React.js', 'Gemini API', 'Spring Security', 'MaterialUI'],
    repoUrl: 'https://github.com/iamhimanshu108/ai-email-assistant',
    liveUrl: 'https://www.iamhimanshu.in/',
    imageUrl: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'automation_router',
    order: 3,
    name: './automation_router.py',
    status: 'DEPLOYED',
    description: 'Multi-channel enterprise custom automation architecture supporting trigger-based workflows across WhatsApp, Telegram, Email, AppSheet, and Google Sheets using FastAPI, Node.js, and Docker containerization.',
    tech: ['Python', 'FastAPI', 'Google Apps Script', 'AppSheet', 'Docker'],
    repoUrl: 'https://github.com/iamhimanshu108/automation-router',
    liveUrl: 'https://www.iamhimanshu.in/',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'crypto_tracker',
    order: 4,
    name: './crypto_tracker.ts',
    status: 'DEPLOYED',
    description: 'Real-time cryptocurrency tracking platform featuring live market prices, interactive trend charts, market sentiment metrics, and custom user watchlists built with React, TypeScript, and CoinGecko REST APIs.',
    tech: ['React', 'TypeScript', 'TailwindCSS', 'CoinGecko API'],
    repoUrl: 'https://github.com/iamhimanshu108/crypto-tracker',
    liveUrl: 'https://www.iamhimanshu.in/',
    imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'weather_dashboard',
    order: 5,
    name: './weather_dashboard.ts',
    status: 'DEPLOYED',
    description: 'Comprehensive weather forecasting application delivering live radar imagery, severe weather alerts, historical climate analysis, and geo-location forecasts built with React, TypeScript, and OpenWeather APIs.',
    tech: ['React', 'TypeScript', 'TailwindCSS', 'OpenWeather API'],
    repoUrl: 'https://github.com/iamhimanshu108/weather-dashboard',
    liveUrl: 'https://www.iamhimanshu.in/',
    imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'otp_security_service',
    order: 6,
    name: './otp_security_service.java',
    status: 'DEPLOYED',
    description: 'Robust authentication and OTP verification system utilizing Spring Boot, Spring Security, JWT tokens, and ReactJs frontend to ensure secure multi-factor login and token expiration handling.',
    tech: ['Spring Boot', 'Spring Security', 'JWT', 'ReactJs', 'MySQL'],
    repoUrl: 'https://github.com/iamhimanshu108/otp-verification-service',
    liveUrl: 'https://www.iamhimanshu.in/',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'employee_management',
    order: 7,
    name: './employee_management.java',
    status: 'DEPLOYED',
    description: 'Enterprise Employee Management system constructed with Spring Boot, ReactJs, MaterialUI, and MySQL database, supporting employee lifecycle tracking, department structures, and role permissions.',
    tech: ['Spring Boot', 'ReactJs', 'MySQL', 'MaterialUI', 'REST API'],
    repoUrl: 'https://github.com/iamhimanshu108/employee-management-system',
    liveUrl: 'https://www.iamhimanshu.in/',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop'
  }
];
