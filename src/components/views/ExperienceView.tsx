import React, { useState } from 'react';
import { NavPath } from '../../types';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  Building2, 
  GraduationCap, 
  ExternalLink,
  Terminal,
  Cpu,
  Layers,
  Award,
  ChevronRight
} from 'lucide-react';
import { sound } from '../../lib/sound';
import { Typewriter } from '../Typewriter';

interface ExperienceViewProps {
  onNavigate: (path: NavPath) => void;
  onOpenSsh: () => void;
}

interface ExperienceRole {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  type: string;
  duration: string;
  location: string;
  status: string;
  summary: string;
  technologies: string[];
  achievements: {
    title: string;
    description: string;
    metric?: string;
  }[];
}

export const ExperienceView: React.FC<ExperienceViewProps> = ({ onNavigate, onOpenSsh }) => {
  const [activeTechFilter, setActiveTechFilter] = useState<string>('ALL');

  const experienceData: ExperienceRole[] = [
    {
      id: 'exp-bizskill-dev',
      role: 'Web Developer',
      company: 'BizSkill',
      companyUrl: 'https://bizskill.in',
      type: 'Full Time / Contract',
      duration: 'Jul 2025 - Present',
      location: 'Remote',
      status: 'ACTIVE_ROLE',
      summary: 'Building responsive web dashboards, custom Google Apps Script workflow automations, and collaborating with backend teams for optimized API delivery.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'App Script', 'REST APIs', 'Dashboard UI'],
      achievements: [
        {
          title: 'Responsive Web Dashboards',
          description: 'Developed responsive web dashboards using HTML, CSS, and JavaScript to streamline client analytics and operational metrics.'
        },
        {
          title: 'Google App Script Automation',
          description: 'Integrated App Script solutions to automate internal reporting processes, reducing manual effort significantly.'
        },
        {
          title: 'Business Operations Automation',
          description: 'Assisted mid-sized businesses in automating their daily operations and workflow triggers.'
        },
        {
          title: 'Backend & API Optimization',
          description: 'Collaborated with backend teams to enhance API response efficiency and overall system performance.'
        }
      ]
    },
    {
      id: 'exp-bizskill-intern',
      role: 'Web Development Intern',
      company: 'BizSkill',
      companyUrl: 'https://bizskill.in',
      type: 'Internship',
      duration: 'May 2025 - Jul 2025',
      location: 'Remote',
      status: 'COMPLETED',
      summary: 'Assisted in building responsive web interfaces, executing modern frontend designs, and learning version control best practices.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'Responsive Design'],
      achievements: [
        {
          title: 'User Interface Development',
          description: 'Assisted in the development of user-friendly web interfaces using HTML5 and CSS3.'
        },
        {
          title: 'Collaborative Feature Engineering',
          description: 'Collaborated with senior developers to implement responsive design features across desktop and mobile browsers.'
        },
        {
          title: 'Modern Web Practices',
          description: 'Gained hands-on experience in modern web development practices, clean CSS architectures, and Git version control.'
        }
      ]
    },
    {
      id: 'exp-unified-mentor',
      role: 'Full Stack Web Developer',
      company: 'Unified Mentor',
      companyUrl: 'https://unifiedmentor.com',
      type: 'Developer Trainee / Contractor',
      duration: 'Dec 2024 - Jan 2025',
      location: 'Remote',
      status: 'COMPLETED',
      summary: 'Focused on backend development, building high-performance microservices in Python and FastAPI.',
      technologies: ['Python', 'FastAPI', 'Backend Architecture', 'REST APIs', 'Scalable Design'],
      achievements: [
        {
          title: 'Backend Technology & Frameworks',
          description: 'Developed in-depth expertise in backend development using modern technologies and frameworks.'
        },
        {
          title: 'Python & FastAPI Service Design',
          description: 'Built practical skills in Python, FastAPI, and scalable service design through active participation in real-time projects.'
        }
      ]
    },
    {
      id: 'exp-prodigy-infotech',
      role: 'Frontend Developer',
      company: 'Prodigy InfoTech',
      companyUrl: 'https://prodigyinfotech.dev',
      type: 'Internship',
      duration: 'May 2024 - Jun 2024',
      location: 'Remote',
      status: 'COMPLETED',
      summary: 'Hands-on frontend engineering contributing to real-time client projects with clean HTML, CSS, and vanilla JS.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Frontend UI', 'Git'],
      achievements: [
        {
          title: 'Frontend Engineering Principles',
          description: 'Strengthened understanding of frontend development principles and cutting-edge web tools.'
        },
        {
          title: 'Live Project Contributions',
          description: 'Gained hands-on proficiency in HTML, CSS, and JavaScript by contributing to live projects.'
        }
      ]
    },
    {
      id: 'exp-freelance',
      role: 'Full Stack Web Developer & Automation Specialist',
      company: 'iamhimanshu.in',
      companyUrl: 'https://www.iamhimanshu.in/',
      type: 'Independent / Freelance Architect',
      duration: '2022 - PRESENT',
      location: 'India // Global Remote',
      status: 'ACTIVE_ROLE',
      summary: 'Engineering full-stack web applications, AI-powered developer tools, enterprise backend APIs, and custom multi-channel workflow automations.',
      technologies: ['Java Spring Boot', 'React.js', 'TypeScript', 'FastAPI', 'Gemini AI', 'Docker', 'MySQL', 'Google Apps Script'],
      achievements: [
        {
          title: 'ATS Resume Analyzer & AI Tools',
          description: 'Architected automated AI resume scanner and email drafting tools leveraging React.js, Spring Boot, and Gemini API.'
        },
        {
          title: 'Multi-Channel Automation Router',
          description: 'Designed custom webhook dispatchers across WhatsApp, Telegram, AppSheet, and Google Apps Script.'
        }
      ]
    }
  ];

  const educationData = {
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    institution: 'Computer Science & Engineering Department',
    duration: '2020 - 2024',
    status: 'COMPLETED',
    highlights: [
      'Specialized in Data Structures & Algorithms, Object-Oriented Programming (Java), and Database Management Systems (SQL).',
      'Developed multiple production capstone projects integrating RESTful web architectures and cloud databases.'
    ]
  };

  const techFilters = ['ALL', 'Java Spring Boot', 'React.js', 'FastAPI', 'Gemini AI', 'Docker', 'Automations'];

  const filterRoleByTech = (role: ExperienceRole) => {
    if (activeTechFilter === 'ALL') return true;
    if (activeTechFilter === 'Automations') {
      return role.technologies.some(t => ['Google Apps Script', 'AppSheet', 'WhatsApp', 'Telegram'].includes(t));
    }
    return role.technologies.includes(activeTechFilter);
  };

  return (
    <div className="space-y-6 font-mono text-xs text-slate-200">
      {/* Top Command Line */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
          <span>root@Himanshu:~$</span>
          <Typewriter text="cat ~/experience.json" className="text-slate-100 font-semibold" speed={35} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold text-[10px] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            [ CAREER_ACTIVE ]
          </span>
        </div>
      </div>

      {/* Terminal Experience Banner Header */}
      <div className="bg-[#070B14] border border-slate-800 rounded-lg p-5 shadow-xl space-y-3 relative overflow-hidden">
        <div className="absolute right-3 top-3 opacity-10 pointer-events-none">
          <Briefcase className="w-32 h-32 text-emerald-400" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                WORK_EXPERIENCE & PROFESSIONAL_SUMMARY
              </h2>
              <p className="text-slate-400 text-xs">
                3+ Years of Full-Stack Web Development, Backend AI Engineering & Automation
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                sound.playKeypress();
                onNavigate('~/resume');
              }}
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded text-xs transition-colors flex items-center space-x-1.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>VIEW_FULL_RESUME</span>
            </button>

            <button
              onClick={() => {
                sound.playSshConnect();
                onOpenSsh();
              }}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 rounded text-xs transition-colors font-bold"
            >
              SSH_HIRE_ME
            </button>
          </div>
        </div>

        {/* Tech Filter Buttons */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
          <span className="text-slate-500 text-[11px] font-bold mr-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-slate-400" /> FILTER_TECH:
          </span>
          {techFilters.map((tech) => (
            <button
              key={tech}
              onClick={() => {
                sound.playKeypress();
                setActiveTechFilter(tech);
              }}
              className={`px-2.5 py-0.5 text-[10px] font-bold rounded border transition-colors ${
                activeTechFilter === tech
                  ? 'bg-emerald-500 text-black border-emerald-400'
                  : 'bg-[#050810] text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Experience Roles Timeline List */}
      <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
        {experienceData.filter(filterRoleByTech).map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline Circle Node */}
            <div className="absolute -left-[27px] top-1 w-4 h-4 rounded-full bg-[#070B14] border-2 border-slate-400 group-hover:border-emerald-400 group-hover:bg-emerald-500/20 transition-all flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-emerald-400" />
            </div>

            <div className="bg-[#0A0E1A] border border-slate-800/90 hover:border-emerald-500/50 p-5 rounded-lg space-y-3 shadow-xl transition-all">
              {/* Role Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 group-hover:text-emerald-400 transition-colors">
                    {exp.role}
                    {exp.companyUrl && (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-slate-400 hover:text-emerald-400"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </h3>
                  <div className="text-slate-400 text-xs font-semibold mt-0.5">
                    {exp.company}
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-400 font-semibold bg-[#050810] px-2.5 py-1 rounded border border-slate-800 self-start">
                  {exp.duration}
                </div>
              </div>

              {/* Bullet Points achievements matching screenshot style */}
              <ul className="space-y-1.5 text-slate-300 text-xs pl-1">
                {exp.achievements.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-slate-500 font-bold">•</span>
                    <span>{item.description}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies footer tags */}
              <div className="pt-2 border-t border-slate-800/50 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-slate-500 font-bold mr-1">STACK:</span>
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-[#050810] border border-slate-800/80 text-emerald-400 text-[10px] font-mono font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="bg-[#0A0E1A] border border-slate-800 p-5 rounded-lg space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">ACADEMIC_BACKGROUND</h3>
              <p className="text-slate-400 text-xs">{educationData.institution}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-[11px]">
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-bold">
              {educationData.duration}
            </span>
            <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold">
              [{educationData.status}]
            </span>
          </div>
        </div>

        <div className="bg-[#050810] border border-slate-800/80 p-3 rounded space-y-2">
          <h4 className="font-bold text-cyan-400 text-xs flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            {educationData.degree}
          </h4>

          <ul className="space-y-1.5 text-slate-300 text-xs pl-2">
            {educationData.highlights.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">&gt;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
