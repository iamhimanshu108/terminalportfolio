

export interface EducationItem {
  id: string;
  order?: number;
  degree: string;
  institution: string;
  institutionUrl?: string;
  location: string;
  year: string;
  status: 'IN_PROGRESS' | 'PURSUING' | 'COMPLETED';
  highlights: string[];
  drivePdfUrl?: string;
  driveImageUrl?: string;
}

export type CertCategory = 'CLOUD_DEVOPS' | 'BACKEND_NODEJS' | 'BACKEND_JAVA' | 'AI_AUTOMATION' | 'FULL_STACK' | 'GENERAL';

export interface CertificateItem {
  id: string;
  order?: number;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  category: CertCategory;
  skills: string[];
  description: string;
  drivePdfUrl?: string;
  driveImageUrl?: string;
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-mca',
    order: 1,
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Sikkim Manipal University',
    institutionUrl: 'https://smu.edu.in',
    location: 'India // Distance Education',
    year: '2026 - 2028',
    status: 'IN_PROGRESS',
    highlights: [
      'Advanced study of Cloud Architectures, Distributed Systems, Software Engineering, and Enterprise Java Web Frameworks.',
      'Developing high-performance microservice backends, REST API routers, and AI automation systems.'
    ],
    drivePdfUrl: 'https://drive.google.com/file/d/YOUR_MCA_DRIVE_FILE_ID/view?usp=sharing'
  },
  {
    id: 'edu-bca',
    order: 2,
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'IGNOU',
    institutionUrl: 'https://www.ignou.ac.in',
    location: 'New Delhi, India',
    year: '2021 - 2024',
    status: 'COMPLETED',
    highlights: [
      'Specialized in Data Structures & Algorithms, Object-Oriented Programming (Java), and Database Management Systems (SQL).',
      'Developed multiple production capstone projects integrating RESTful web architectures and cloud databases.'
    ],
    drivePdfUrl: 'https://drive.google.com/file/d/YOUR_BCA_DRIVE_FILE_ID/view?usp=sharing'
  }
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'cert-upgrad-genai',
    order: 1,
    title: 'Generative AI Foundations Certificate',
    issuer: 'upGrad & Microsoft',
    issueDate: 'May 2026',
    credentialId: 'harU1961VhMwXqQp',
    category: 'AI_AUTOMATION',
    skills: ['Generative AI', 'Prompt Engineering', 'AI Content Creation', 'AI Analysis', 'AI Automation'],
    description: 'Program completed in collaboration with upGrad and Microsoft covering Generative AI Foundations, Advanced Prompt Engineering Techniques, AI-Powered Research, Analysis & Presentation, Problem-Solving, and Automation.',
    drivePdfUrl: 'https://drive.google.com/file/d/1a055575bVPGVlyqA1TfdYKpPGuZwMUZo/view?usp=sharing'
  },
  {
    id: 'cert-udemy-nodejs',
    order: 2,
    title: 'Node.js - Beginner to Advance Course with Projects',
    issuer: 'Udemy (Hitesh Choudhary & Piyush Garg)',
    issueDate: 'Aug 2026',
    credentialId: 'UC-ac4fdbfa-c4ce-481f-be51-7590b95e82e6',
    category: 'BACKEND_NODEJS',
    skills: ['Node.js', 'JavaScript', 'Express.js', 'REST APIs', 'Backend Architecture', 'Async I/O'],
    description: '36.5 hours of comprehensive hands-on backend training covering Node.js from beginner to advanced concepts, server architecture, asynchronous programming, and RESTful web API development.',
    drivePdfUrl: 'https://drive.google.com/file/d/1SKglyrBwLD-HCOJpBUmqpHK_8Re2PuZ-/view?usp=sharing'
  },
  {
    id: 'cert-pw-fullstack-2.0',
    order: 3,
    title: 'Full Stack Web Development 2.0',
    issuer: 'Physics Wallah (PW Skills)',
    issueDate: 'May 2025',
    credentialId: '70752542-0e29-46d1-b4b8-61aab87d584a',
    category: 'FULL_STACK',
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'REST APIs', 'Full Stack Dev'],
    description: 'Comprehensive Full Stack Web Development 2.0 certification from Physics Wallah (PW Skills) validating end-to-end expertise in modern web application architecture, backend API integration, and full stack deployment.',
    drivePdfUrl: 'https://drive.google.com/file/d/1zyZVjYX-BUGGKYAP7GV-wc7JpyiLBPEL/view?usp=sharing'
  },
  {
    id: 'cert-spark-java-fullstack',
    order: 4,
    title: 'Spark 2.0 : Job Ready Java Full Stack LIVE Course',
    issuer: 'Physics Wallah / PW Skills (Ashwani Kumar)',
    issueDate: 'Nov 2024',
    category: 'BACKEND_JAVA',
    skills: ['Java', 'Spring Boot', 'REST APIs', 'Hibernate JPA', 'Spring Security', 'Full Stack Java'],
    description: 'Completed the intensive live Spark 2.0 Job Ready Java Full Stack engineering course taught by Senior Software Engineer Ashwani Kumar, covering Core & Advanced Java, Spring Boot microservices, database architecture, and REST API development.',
    drivePdfUrl: 'https://drive.google.com/file/d/1QyBQZ4YuPL7Fv8IkoHqmYhLSxc66uO9b/view?usp=sharing'
  }
];
