import { ResumeData } from '../types';

export const RAW_RESUME_YAML = `---
profile:
  name: "Himanshu Yadav"
  title: "Full Stack Web Developer & Automation Specialist"
  website: "https://www.iamhimanshu.in"
  status: "[ RUNNING ]"
  location: "India // Global Remote"
  email: "hiyadav2022@gmail.com"
  github: "https://github.com/iamhimanshu108"
  drive_url: "https://drive.google.com/file/d/1KOeUEkU3p2jdlHc8vNT_i3xOJifZ_dnT/view?usp=sharing"
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
  drivePdfUrl: "https://drive.google.com/file/d/1KOeUEkU3p2jdlHc8vNT_i3xOJifZ_dnT/view?usp=sharing",
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
