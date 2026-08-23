export interface SkillItem {
  id: string;
  order: number;
  name: string;
  badge?: string;
  iconType?: string;
}

export interface SkillCategoryGroup {
  id: string;
  order: number;
  title: string;
  iconName: 'server' | 'database' | 'cpu' | 'bot' | 'code' | 'layers' | 'zap';
  borderColor?: string;
  color?: string;
  skills: SkillItem[];
}

export const SKILLS_DATA: SkillCategoryGroup[] = [
  {
    id: 'backend_core',
    order: 1,
    title: 'Backend Core & Microservices',
    iconName: 'server',
    borderColor: 'border-emerald-500/40 hover:border-emerald-400',
    color: 'text-emerald-400',
    skills: [
      { id: 'java_spring', order: 1, name: 'Java Spring Boot', iconType: 'spring' },
      { id: 'spring_security', order: 2, name: 'Spring Security & JWT', iconType: 'shield' },
      { id: 'nodejs_express', order: 3, name: 'Node.js & Express', iconType: 'nodejs' },
      { id: 'fastapi_python', order: 4, name: 'FastAPI & Python', iconType: 'fastapi' },
      { id: 'rest_microservices', order: 5, name: 'REST Microservices', iconType: 'boxes' }
    ]
  },
  {
    id: 'databases_cache',
    order: 2,
    title: 'Databases & Caching Layer',
    iconName: 'database',
    borderColor: 'border-cyan-500/40 hover:border-cyan-400',
    color: 'text-cyan-400',
    skills: [
      { id: 'postgresql', order: 1, name: 'PostgreSQL', iconType: 'postgres' },
      { id: 'mysql', order: 2, name: 'MySQL', iconType: 'mysql' },
      { id: 'mongodb', order: 3, name: 'MongoDB', iconType: 'mongodb' },
      { id: 'redis', order: 4, name: 'Redis', iconType: 'redis' }
    ]
  },
  {
    id: 'devops_infra',
    order: 3,
    title: 'DevOps & Infrastructure',
    iconName: 'cpu',
    borderColor: 'border-amber-500/40 hover:border-amber-400',
    color: 'text-amber-400',
    skills: [
      { id: 'docker', order: 1, name: 'Docker Containers', iconType: 'docker' },
      { id: 'linux_bash', order: 2, name: 'Linux & POSIX Bash', iconType: 'bash' },
      { id: 'git_github', order: 3, name: 'Git & GitHub', iconType: 'git' },
      { id: 'maven', order: 4, name: 'Maven', iconType: 'maven' },
      { id: 'postman', order: 5, name: 'Postman', iconType: 'postman' },
      { id: 'cicd', order: 6, name: 'CI/CD Pipelines', iconType: 'workflow' }
    ]
  },
  {
    id: 'ai_automation',
    order: 4,
    title: 'AI & Multi-Channel Automation',
    iconName: 'bot',
    borderColor: 'border-purple-500/40 hover:border-purple-400',
    color: 'text-purple-400',
    skills: [
      { id: 'gemini_api', order: 1, name: 'Gemini AI API', iconType: 'sparkles' },
      { id: 'llms', order: 2, name: 'LLMs & Prompt Eng.', iconType: 'cpu' },
      { id: 'google_apps_script', order: 3, name: 'Google Apps Script', iconType: 'code' },
      { id: 'appsheet', order: 4, name: 'AppSheet', iconType: 'layers' },
      { id: 'bots', order: 5, name: 'WhatsApp & Telegram Bots', iconType: 'bot' }
    ]
  },
  {
    id: 'frontend_ui',
    order: 5,
    title: 'Frontend & Interactive UI',
    iconName: 'code',
    borderColor: 'border-sky-500/40 hover:border-sky-400',
    color: 'text-sky-400',
    skills: [
      { id: 'reactjs', order: 1, name: 'React.js', iconType: 'react' },
      { id: 'nextjs', order: 2, name: 'Next.js', iconType: 'next' },
      { id: 'typescript', order: 3, name: 'TypeScript', iconType: 'typescript' },
      { id: 'javascript', order: 4, name: 'JavaScript', iconType: 'javascript' },
      { id: 'tailwindcss', order: 5, name: 'TailwindCSS', iconType: 'tailwind' },
      { id: 'motion', order: 6, name: 'Motion & GSAP', iconType: 'sparkles' }
    ]
  }
];
