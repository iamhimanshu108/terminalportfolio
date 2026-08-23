import { Project, LogEntry, ResumeData } from '../types';

const getTodayVersion = (): string => {
  const d = new Date();
  return `v${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
};

const getTodayKernel = (): string => {
  const d = new Date();
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()} KERNEL (x86_64)`;
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

export { PROJECTS_DATA } from './projectsData';
export { RAW_RESUME_YAML, RESUME_PARSED } from './resumeData';
export { SKILLS_DATA } from './skillsData';

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
