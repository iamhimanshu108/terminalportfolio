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

const skill = (id: string, order: number, name: string, iconType: string): SkillItem => ({ id, order, name, iconType });

export const SKILLS_DATA: SkillCategoryGroup[] = [
  {
    id: 'mern_full_stack', order: 1, title: 'Full-Stack / MERN', iconName: 'layers',
    borderColor: 'border-emerald-500/40 hover:border-emerald-400', color: 'text-emerald-400',
    skills: [skill('mern', 1, 'MERN Stack', 'layers'), skill('mongodb', 2, 'MongoDB', 'mongodb'), skill('express', 3, 'Express.js', 'nodejs'), skill('react', 4, 'React', 'react'), skill('node', 5, 'Node.js', 'nodejs')]
  },
  {
    id: 'python_backend', order: 2, title: 'Python Backend', iconName: 'server',
    borderColor: 'border-cyan-500/40 hover:border-cyan-400', color: 'text-cyan-400',
    skills: [skill('python', 1, 'Python', 'code'), skill('fastapi', 2, 'FastAPI', 'fastapi'), skill('rest', 3, 'REST APIs', 'boxes'), skill('microservices', 4, 'Microservices', 'boxes')]
  },
  {
    id: 'ai_gen_ai', order: 3, title: 'AI / Gen AI / RAG', iconName: 'bot',
    borderColor: 'border-purple-500/40 hover:border-purple-400', color: 'text-purple-400',
    skills: [skill('gen_ai', 1, 'Gen AI', 'sparkles'), skill('ai_integrations', 2, 'AI Integrations', 'bot'), skill('rag', 3, 'RAG', 'layers'), skill('llms', 4, 'LLMs', 'cpu')]
  },
  {
    id: 'frontend', order: 4, title: 'Frontend Engineering', iconName: 'code',
    borderColor: 'border-sky-500/40 hover:border-sky-400', color: 'text-sky-400',
    skills: [skill('react_frontend', 1, 'React', 'react'), skill('nextjs', 2, 'Next.js', 'next'), skill('typescript', 3, 'TypeScript', 'typescript'), skill('javascript', 4, 'JavaScript', 'javascript')]
  },
  {
    id: 'databases', order: 5, title: 'Databases', iconName: 'database',
    borderColor: 'border-blue-500/40 hover:border-blue-400', color: 'text-blue-400',
    skills: [skill('postgresql', 1, 'PostgreSQL', 'postgres'), skill('mongodb_db', 2, 'MongoDB', 'mongodb')]
  },
  {
    id: 'devops', order: 6, title: 'DevOps & Infrastructure', iconName: 'cpu',
    borderColor: 'border-amber-500/40 hover:border-amber-400', color: 'text-amber-400',
    skills: [skill('docker', 1, 'Docker', 'docker'), skill('git', 2, 'Git', 'git'), skill('cicd', 3, 'CI/CD', 'workflow'), skill('linux', 4, 'Linux', 'bash')]
  },
  {
    id: 'architecture', order: 7, title: 'Architecture & Design', iconName: 'layers',
    borderColor: 'border-rose-500/40 hover:border-rose-400', color: 'text-rose-400',
    skills: [skill('system_design', 1, 'System Design', 'layers'), skill('api_design', 2, 'API Design', 'boxes'), skill('scalability', 3, 'Scalable Systems', 'zap')]
  }
];
