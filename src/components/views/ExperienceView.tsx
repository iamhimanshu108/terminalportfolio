import React from 'react';
import { NavPath } from '../../types';
import { CheckCircle2, Briefcase, ExternalLink } from 'lucide-react';
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
  achievements: { title: string; description: string }[];
}

export const ExperienceView: React.FC<ExperienceViewProps> = () => {
  const experienceData: ExperienceRole[] = [
    {
      id: 'exp-bizskill-dev',
      role: 'Web Developer',
      company: 'BizSkill',
      companyUrl: 'https://bizskill.in',
      type: 'Full Time',
      duration: 'Jul 2025 - Present',
      location: 'Guwahati, Assam, India (On-site)',
      status: 'ACTIVE_ROLE',
      summary: 'Developing responsive web dashboards, custom Google Apps Script workflow automations, and collaborating with backend teams for optimized API delivery.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Google Apps Script', 'REST APIs', 'Dashboard UI'],
      achievements: [
        {
          title: 'Responsive Web Dashboards',
          description: 'Developed responsive web dashboards using HTML, CSS, and JavaScript to streamline client analytics.'
        },
        {
          title: 'Google Apps Script Automation',
          description: 'Integrated Apps Script solutions to automate internal reporting processes, saving significant manual hours.'
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
      summary: 'Assisted in building responsive web interfaces, executing frontend designs, and learning version control best practices.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'Responsive Design'],
      achievements: [
        {
          title: 'Frontend UI Implementation',
          description: 'Contributed to creation of responsive layout templates and verified cross-device browser compatibility.'
        }
      ]
    },
    {
      id: 'exp-unified-mentor',
      role: 'Full Stack Developer',
      company: 'Unified Mentor Private Limited',
      type: 'Internship',
      duration: 'Dec 2024 - Jan 2025',
      location: 'Remote',
      status: 'COMPLETED',
      summary: 'Focused on backend development, designing scalable microservices, and writing unit test cases.',
      technologies: ['Spring Framework', 'Software Infrastructure', 'Java', 'JUnit', 'REST APIs'],
      achievements: [
        {
          title: 'Backend API Service',
          description: 'Assisted in designing backend application logic and data models for student platforms.'
        }
      ]
    },
    {
      id: 'exp-prodigy-infotech',
      role: 'Web Development Intern',
      company: 'Prodigy InfoTech',
      companyUrl: 'https://prodigyinfotech.dev',
      type: 'Internship',
      duration: 'May 2024 - Jun 2024',
      location: 'Remote',
      status: 'COMPLETED',
      summary: 'Hands-on frontend engineering contributing to client projects with clean HTML, CSS, and vanilla JS.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Git', 'Frontend UI'],
      achievements: [
        {
          title: 'Live Project Contributions',
          description: 'Participated in designing landing pages and interactive user widgets.'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6 font-mono text-xs text-slate-200">
      {/* Top Command Line */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
          <span className="hidden sm:inline">root@iamhimanshu108:~$</span>
          <span className="sm:hidden">~$</span>
          <Typewriter text="cat ~/experience.json" className="text-slate-100 font-semibold" speed={35} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold text-[10px] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            [ CAREER_ACTIVE ]
          </span>
        </div>
      </div>

      {/* Work Experience section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Briefcase className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-slate-200 text-sm tracking-wide">WORK_EXPERIENCE</span>
        </div>

        {/* Experience Roles Timeline List */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
          {experienceData.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Circle Node */}
              <div className="absolute -left-[27px] top-1.5 w-4 h-4 rounded-full bg-[#070B14] border-2 border-slate-400 group-hover:border-emerald-400 group-hover:bg-emerald-500/20 transition-all flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-emerald-400" />
              </div>

              <div className="bg-[#0A0E1A] border border-slate-800/95 hover:border-emerald-500/50 p-4 sm:p-5 rounded-lg space-y-3 shadow-xl transition-all">
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

                {/* Achievements Description */}
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
      </div>
    </div>
  );
};
