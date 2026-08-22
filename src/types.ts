import React from 'react';

export type NavPath = '~/home' | '~/projects' | '~/skills' | '~/experience' | '~/resume' | '~/contact';

export type HeaderTab = 'SESSION' | 'EXECUTE' | 'DEBUG';

export type ProjectStatus = 'DEPLOYED' | 'RUNNING' | 'ARCHIVED' | 'FAILED' | 'BUILD';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  description: string;
  tech: string[];
  progress?: number;
  repoUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  architecture?: string;
  logs?: string[];
  metrics?: {
    latency: string;
    throughput: string;
    uptime: string;
  };
}

export type LogLevel = 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  process: string;
  task: string;
  metricOrNote?: string;
  details?: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ResumeData {
  profile: {
    name: string;
    status: string;
    location: string;
    summary: string;
  };
  skills: Record<string, string[]>;
  metrics: Record<string, string>;
  experience: Array<{
    role: string;
    company: string;
    duration: string;
    highlights: string[];
    type?: string;
    status?: string;
    bullets?: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
}

export interface TerminalHistory {
  id: string;
  command: string;
  output: string | React.ReactNode;
  timestamp: string;
}
