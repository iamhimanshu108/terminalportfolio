import { Project, LogEntry, ResumeData } from '../types';

const getTodayVersion = (): string => {
  const d = new Date();
  return `v${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
};

const getTodayKernel = (): string => {
  const d = new Date();
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()} DEVSYS.KERNEL (x86_64)`;
};

export const SYSTEM_INFO = {
  host: 'root@iamhimanshu108',
  version: getTodayVersion(),
  kernel: getTodayKernel(),
  builtWith: 'BUILT_WITH_SPRING_BOOT_REACT',
  status: 'ONLINE',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  lastLogin: 'Tue Aug 11 11:42:00 2026 from 192.168.1.108',
  uptime: '99.9%',
  latency: '24ms',
  loc: '45.8k',
  location: 'IN-WEST-1',
  author: 'Himanshu Yadav',
  title: 'Full Stack Web Developer & Automation Specialist',
  socials: {
    github: 'https://github.com/iamhimanshu108',
    linkedin: 'https://www.linkedin.com/in/iamhimanshu108',
    x: 'https://x.com/iamhimanshu108',
    website: 'https://www.iamhimanshu.in'
  },
  bio: [
    '> Backend Engineer & Automation Specialist crafting high-performance microservices and resilient APIs.',
    '> Core Focus: Java Spring Boot, Node.js, FastAPI, PostgreSQL, Redis & Docker containerization.',
    '> Architecting backend AI integrations (Gemini API) and multi-channel system automation pipelines.'
  ],
  stackOverview: {
    languages: ["Java", "Python", "TypeScript", "JavaScript", "C++", "SQL", "Bash"],
    infrastructure: ["Spring Boot", "React.js", "FastAPI", "Docker", "Node.js"],
    databases: ["MySQL", "MongoDB", "PostgreSQL", "Redis"],
    methodologies: ["Backend AI (Gemini API)", "LangChain", "WhatsApp/Telegram Automation", "Google Apps Script", "AppSheet"]
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'ats_score_analyzer',
    name: './ats_score_analyzer.ts',
    status: 'DEPLOYED',
    description: 'AI-powered ATS Resume Evaluation system built with React.js, Gemini AI, TypeScript, and TailwindCSS. Compares candidate resumes against target job descriptions to generate compatibility scores, key missing skill tags, and actionable resume optimization suggestions.',
    tech: ['React.js', 'Gemini AI', 'TypeScript', 'TailwindCSS'],
    repoUrl: 'https://github.com/iamhimanshu108/ats-score-analyzer',
    liveUrl: 'https://www.iamhimanshu.in/',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop',
    architecture: 'Client SPA + Server-Side Gemini AI Proxy',
    metrics: {
      latency: '1.2s',
      throughput: '1.4k evaluation/day',
      uptime: '99.9%'
    },
    logs: [
      'INFO: ATS AI Evaluation Engine initialized with Gemini 1.5 Pro pipeline',
      'INFO: PDF & DOCX document parser mounted with zero allocation buffer',
      'SUCCESS: Generated compatibility analysis score: 92% match'
    ]
  },
  {
    id: 'ai_email_assistant',
    name: './ai_email_assistant.java',
    status: 'DEPLOYED',
    description: 'Intelligent email composition and response assistant microservice powered by Spring Boot, React.js, Material-UI, Spring Security, and the Gemini API. Automatically context-evaluates incoming email threads and drafts tailored, professional replies.',
    tech: ['Spring Boot', 'React.js', 'Gemini API', 'Spring Security', 'MaterialUI'],
    repoUrl: 'https://github.com/iamhimanshu108/ai-email-assistant',
    liveUrl: 'https://www.iamhimanshu.in/',
    imageUrl: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=800&auto=format&fit=crop',
    architecture: 'Spring Boot REST Gateway + Gemini Model Handler',
    metrics: {
      latency: '450ms',
      throughput: '850 req/s',
      uptime: '99.9%'
    },
    logs: [
      'INFO: Spring Boot service started on port 8080 with Spring Security filter chain',
      'INFO: Connected to Google Gemini Generative Model endpoint',
      'SUCCESS: Context reply payload generated with 98.8% accuracy'
    ]
  },
  {
    id: 'automation_router',
    name: './automation_router.py',
    status: 'DEPLOYED',
    description: 'Multi-channel enterprise custom automation architecture supporting trigger-based workflows across WhatsApp, Telegram, Email, AppSheet, and Google Sheets using FastAPI, Node.js, and Docker containerization.',
    tech: ['Python', 'FastAPI', 'Google Apps Script', 'AppSheet', 'Docker'],
    repoUrl: 'https://github.com/iamhimanshu108/automation-router',
    liveUrl: 'https://www.iamhimanshu.in/',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    architecture: 'FastAPI Webhook Dispatcher + AppSheet / AppsScript Workers',
    metrics: {
      latency: '120ms',
      throughput: '50k+ automations/mo',
      uptime: '100.0%'
    },
    logs: [
      'INFO: Webhook event received from WhatsApp Business API',
      'INFO: Google Apps Script trigger dispatched payload to AppSheet datastore',
      'SUCCESS: Automated response delivered via Telegram bot channel'
    ]
  },
  {
    id: 'crypto_tracker',
    name: './crypto_tracker.ts',
    status: 'DEPLOYED',
    description: 'Real-time cryptocurrency tracking platform featuring live market prices, interactive trend charts, market sentiment metrics, and custom user watchlists built with React, TypeScript, and CoinGecko REST APIs.',
    tech: ['React', 'TypeScript', 'TailwindCSS', 'CoinGecko API'],
    repoUrl: 'https://github.com/iamhimanshu108/crypto-tracker',
    liveUrl: 'https://www.iamhimanshu.in/',
    imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop',
    architecture: 'React Single Page App + Polling Stream Data Layer',
    metrics: {
      latency: '45ms',
      throughput: '2.4k ops/s',
      uptime: '99.95%'
    },
    logs: [
      'INFO: Initialized WebSocket & Polling feed for CoinGecko market tickers',
      'SUCCESS: Rendered live market chart for BTC/USD, ETH/USD, and SOL/USD'
    ]
  },
  {
    id: 'weather_dashboard',
    name: './weather_dashboard.ts',
    status: 'DEPLOYED',
    description: 'Comprehensive weather forecasting application delivering live radar imagery, severe weather alerts, historical climate analysis, and geo-location forecasts built with React, TypeScript, and OpenWeather APIs.',
    tech: ['React', 'TypeScript', 'TailwindCSS', 'OpenWeather API'],
    repoUrl: 'https://github.com/iamhimanshu108/weather-dashboard',
    liveUrl: 'https://www.iamhimanshu.in/',
    imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=800&auto=format&fit=crop',
    architecture: 'React + Location Services API',
    metrics: {
      latency: '80ms',
      throughput: '1.5k req/s',
      uptime: '99.9%'
    },
    logs: [
      'INFO: GeoLocation pinpointed browser coordinates',
      'SUCCESS: Fetched 7-day forecast & air quality metrics'
    ]
  },
  {
    id: 'otp_security_service',
    name: './otp_security_service.java',
    status: 'DEPLOYED',
    description: 'Robust authentication and OTP verification system utilizing Spring Boot, Spring Security, JWT tokens, and ReactJs frontend to ensure secure multi-factor login and token expiration handling.',
    tech: ['Spring Boot', 'Spring Security', 'JWT', 'ReactJs', 'MySQL'],
    repoUrl: 'https://github.com/iamhimanshu108/otp-verification-service',
    liveUrl: 'https://www.iamhimanshu.in/',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop',
    architecture: 'Spring Boot REST + JWT Auth Provider',
    metrics: {
      latency: '65ms',
      throughput: '5.2k auth/s',
      uptime: '99.99%'
    },
    logs: [
      'INFO: Generated 6-digit cryptographic OTP token with 5-min TTL',
      'SUCCESS: JWT token issued with secure HTTP-only cookie'
    ]
  },
  {
    id: 'employee_management',
    name: './employee_management.java',
    status: 'DEPLOYED',
    description: 'Enterprise Employee Management system constructed with Spring Boot, ReactJs, MaterialUI, and MySQL database, supporting employee lifecycle tracking, department structures, and role permissions.',
    tech: ['Spring Boot', 'ReactJs', 'MySQL', 'MaterialUI', 'REST API'],
    repoUrl: 'https://github.com/iamhimanshu108/employee-management-system',
    liveUrl: 'https://www.iamhimanshu.in/',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
    architecture: 'Full Stack Java Spring + React Portal + MySQL DB',
    metrics: {
      latency: '90ms',
      throughput: '800 req/s',
      uptime: '99.9%'
    },
    logs: [
      'INFO: Spring Data JPA initialized MySQL relational schema',
      'SUCCESS: Loaded workforce directory records for 250+ employees'
    ]
  }
];

export const EXPERIENCE_LOGS: LogEntry[] = [
  {
    id: 'log-1',
    timestamp: '2026-08-01T09:00:00Z',
    level: 'SUCCESS',
    process: "Process 'Full Stack Web Developer & Automation Specialist' active at iamhimanshu.in",
    task: "Engineered AI-driven web apps and enterprise automation systems leveraging Java Spring Boot, React, FastAPI, and Docker.",
    metricOrNote: "Metric: Delivered 15+ production applications with 99.9% uptime."
  },
  {
    id: 'log-2',
    timestamp: '2026-05-15T11:30:00Z',
    level: 'SUCCESS',
    process: "Process 'ATS Score Analyzer & AI Pipeline' deployed",
    task: "Built ATS resume evaluation system with React, TypeScript, TailwindCSS, and Gemini AI context evaluator.",
    metricOrNote: "Metric: Automated compatibility scoring with 92%+ evaluation accuracy."
  },
  {
    id: 'log-3',
    timestamp: '2025-11-20T14:15:00Z',
    level: 'INFO',
    process: "Process 'AI Email Reply Assistant' service running",
    task: "Architected Spring Boot microservice with Spring Security, JWT, Material-UI, and Gemini API for automated email reply drafting.",
    metricOrNote: "Metric: Reduced email response drafting time by 80%."
  },
  {
    id: 'log-4',
    timestamp: '2024-08-10T08:30:00Z',
    level: 'SUCCESS',
    process: "Process 'Multi-Channel Automation Router' active",
    task: "Built custom multi-channel messaging and workflow automations for WhatsApp, Telegram, Email, AppSheet, and Google Apps Script using FastAPI & Docker.",
    metricOrNote: "Metric: Processed 100k+ automated triggers/month seamlessly."
  },
  {
    id: 'log-5',
    timestamp: '2023-03-12T10:00:00Z',
    level: 'SUCCESS',
    process: "Process 'Spring Boot Security & OTP Verification' deployed",
    task: "Constructed secure OTP authentication microservice with JWT tokens, Spring Security, and MySQL database.",
    metricOrNote: "Metric: Handles 5k+ auth requests/sec with under 65ms response latency."
  },
  {
    id: 'log-6',
    timestamp: '2022-08-01T10:00:00Z',
    level: 'INFO',
    process: "Process 'Full Stack Developer (Java Spring Boot + React)' initialized",
    task: "Developed high-concurrency RESTful APIs, Spring Data JPA entities, and responsive React interfaces.",
    metricOrNote: "Metric: Optimized database queries reducing page load times by 45%."
  }
];

export const RAW_RESUME_YAML = `---
profile:
  name: "Himanshu Yadav"
  title: "Full Stack Web Developer & Automation Specialist"
  website: "https://www.iamhimanshu.in"
  status: "[ RUNNING ]"
  location: "India // Global Remote"
  email: "hiyadav2022@gmail.com"
  github: "https://github.com/iamhimanshu108"
  summary: |
    Results-driven Full Stack Web Developer and Automation Specialist transforming complex business challenges into efficient solutions.
    Expertise in Backend AI (Gemini API), Java Spring Boot, MERN Stack, System Design, DevOps (Docker, Git), and custom multi-channel automations (WhatsApp, Telegram, Email, AppSheet, Google Apps Script).
skills:
  languages: ["Java", "Python", "TypeScript", "JavaScript", "C++", "SQL", "HTML/CSS"]
  backend_frameworks: ["Spring Boot", "Spring Security", "FastAPI", "Node.js", "Express"]
  frontend_frameworks: ["React.js", "Next.js", "TailwindCSS", "MaterialUI"]
  databases: ["MySQL", "MongoDB", "PostgreSQL"]
  tools_devops: ["Docker", "Git", "GitHub Actions", "Google Apps Script", "AppSheet", "Postman", "Maven", "JWT"]
  ai_integrations: ["Backend AI", "Gemini API", "LangChain", "REST APIs"]
experience:
  - role: "Web Developer"
    company: "BizSkill"
    duration: "Jul 2025 - Present"
    highlights:
      - "Developed responsive web dashboards using HTML, CSS, and JavaScript."
      - "Integrated App Script solutions to automate internal reporting processes."
  - role: "Web Development Intern"
    company: "BizSkill"
    duration: "May 2025 - Jul 2025"
    highlights:
      - "Contributed to frontend layouts and user interfaces with standard version controls."
  - role: "Full Stack Developer"
    company: "Unified Mentor Private Limited"
    duration: "Dec 2024 - Jan 2025"
    highlights:
      - "Assisted in backend development, Spring Security integration, and database operations."
  - role: "Web Development Intern"
    company: "Prodigy InfoTech"
    duration: "May 2024 - Jun 2024"
    highlights:
      - "Assisted in responsive frontend implementations using HTML, CSS, and JavaScript."
education:
  - degree: "MCA (Master of Computer Applications)"
    institution: "Sikkim Manipal University"
    year: "2026 - 2028"
  - degree: "BCA (Bachelor of Computer Applications)"
    institution: "IGNOU"
    year: "2021 - 2024"
---`;

export const RESUME_PARSED: ResumeData = {
  profile: {
    name: "Himanshu Yadav",
    status: "[ RUNNING ]",
    location: "India // Global Remote",
    summary: "Results-driven Full Stack Web Developer and Automation Specialist transforming complex business challenges into efficient solutions with expertise in Backend AI (Gemini API), Java Spring Boot, MERN Stack, System Design, and Docker automations."
  },
  skills: {
    languages: ["Java", "Python", "TypeScript", "JavaScript", "C++", "SQL"],
    infrastructure: ["Docker", "Git", "Google Apps Script", "AppSheet", "Maven"],
    databases: ["MySQL", "MongoDB", "PostgreSQL"]
  },
  metrics: {
    uptime: "99.99%",
    loc_written: "45.8k+",
    deployments: "15+ Apps"
  },
  experience: [
    {
      role: "Web Developer",
      company: "BizSkill",
      duration: "Jul 2025 - Present",
      highlights: [
        "Developed responsive web dashboards using HTML, CSS, and JavaScript.",
        "Integrated App Script solutions to automate internal reporting processes."
      ]
    },
    {
      role: "Web Development Intern",
      company: "BizSkill",
      duration: "May 2025 - Jul 2025",
      highlights: [
        "Contributed to frontend layouts and user interfaces with standard version controls."
      ]
    },
    {
      role: "Full Stack Developer",
      company: "Unified Mentor Private Limited",
      duration: "Dec 2024 - Jan 2025",
      highlights: [
        "Assisted in backend development, Spring Security integration, and database operations."
      ]
    },
    {
      role: "Web Development Intern",
      company: "Prodigy InfoTech",
      duration: "May 2024 - Jun 2024",
      highlights: [
        "Assisted in responsive frontend implementations using HTML, CSS, and JavaScript."
      ]
    }
  ],
  education: [
    {
      degree: "MCA (Master of Computer Applications)",
      institution: "Sikkim Manipal University",
      year: "2026 - 2028"
    },
    {
      degree: "BCA (Bachelor of Computer Applications)",
      institution: "IGNOU",
      year: "2021 - 2024"
    }
  ]
};
