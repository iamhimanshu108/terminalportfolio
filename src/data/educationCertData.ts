/**
 * ====================================================================
 * BACKEND & FRONTEND DATA CONFIGURATION FILE: Education & Certificates
 * ====================================================================
 * Customize your Education details and Certificates here.
 * You can set Google Drive links for both PDF certificates and Images!
 * 
 * Google Drive URL Formats Supported:
 * - PDF URL:  https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing
 * - IMAGE URL: https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing 
 *   (or any standard image URL)
 * 
 * The system automatically handles Google Drive previewing, image thumbnails,
 * and direct PDF viewing within the terminal interface!
 */

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  institutionUrl?: string;
  location: string;
  year: string; // e.g. "2026 - 2028" or "2021 - 2024"
  status: 'IN_PROGRESS' | 'PURSUING' | 'COMPLETED' | 'ON_HOLD';
  grade?: string; // e.g. "8.8 / 10 CGPA" or "First Class with Distinction"
  fieldOfStudy?: string;
  description: string;
  highlights: string[];
  courses: string[];
  drivePdfUrl?: string; // Google Drive PDF link to degree transcript or certificate
  driveImageUrl?: string; // Google Drive or web image thumbnail
}

export type CertCategory = 'CLOUD_DEVOPS' | 'BACKEND_JAVA' | 'AI_AUTOMATION' | 'FULL_STACK' | 'GENERAL';

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issuerUrl?: string;
  issueDate: string; // e.g. "Jan 2025"
  expiryDate?: string; // e.g. "No Expiration" or "Jan 2028"
  credentialId?: string; // e.g. "AWS-CERT-908123"
  verificationUrl?: string;
  category: CertCategory;
  skills: string[];
  description: string;
  /**
   * Google Drive PDF link to certificate PDF document.
   * Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   */
  drivePdfUrl?: string;
  /**
   * Google Drive Image link or standard image URL for certificate badge / photo.
   * Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing or image URL
   */
  driveImageUrl?: string;
  driveFolderUrl?: string; // Google Drive folder link containing all certificate assets
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-mca',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Sikkim Manipal University',
    institutionUrl: 'https://smu.edu.in',
    location: 'India // Distance Education',
    year: '2026 - 2028',
    status: 'IN_PROGRESS',
    grade: 'Enrolled (Semester 1)',
    fieldOfStudy: 'Computer Science & Distributed Systems',
    description: 'Advanced postgraduate study of Cloud Architectures, Distributed Systems, Software Engineering, and Enterprise Java Web Frameworks.',
    highlights: [
      'Advanced study of Cloud Architectures, Distributed Systems, Software Engineering, and Enterprise Java Web Frameworks.',
      'Developing high-performance microservice backends, REST API routers, and AI automation systems.'
    ],
    courses: [
      'Advanced Data Structures & Algorithms',
      'Distributed Systems & Cloud Architecture',
      'Enterprise Java & Spring Framework',
      'Advanced Database Management Systems (PostgreSQL/NoSQL)',
      'Artificial Intelligence & Machine Learning Integration'
    ],
    drivePdfUrl: 'https://drive.google.com/file/d/1SAMPLE_MCA_DEGREE_DRIVE_ID/view?usp=sharing',
    driveImageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'edu-bca',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'IGNOU',
    institutionUrl: 'https://www.ignou.ac.in',
    location: 'New Delhi, India',
    year: '2021 - 2024',
    status: 'COMPLETED',
    grade: 'First Class Division',
    fieldOfStudy: 'Computer Applications & Information Technology',
    description: 'Specialized in Data Structures & Algorithms, Object-Oriented Programming (Java), and Database Management Systems (SQL).',
    highlights: [
      'Specialized in Data Structures & Algorithms, Object-Oriented Programming (Java), and Database Management Systems (SQL).',
      'Developed multiple production capstone projects integrating RESTful web architectures and cloud databases.'
    ],
    courses: [
      'Object Oriented Programming in C++ & Java',
      'Data Structures using C',
      'Database Management Systems & SQL',
      'Web Technology (HTML, CSS, JavaScript, PHP)',
      'Operating Systems & Networking Concepts',
      'Software Engineering Principles'
    ],
    drivePdfUrl: 'https://drive.google.com/file/d/1SAMPLE_BCA_DEGREE_DRIVE_ID/view?usp=sharing',
    driveImageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop'
  }
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'cert-spring-boot',
    title: 'Spring Boot Microservices & Enterprise Java Certificate',
    issuer: 'Udemy / Spring Academy',
    issuerUrl: 'https://spring.io',
    issueDate: 'Jan 2025',
    expiryDate: 'No Expiration',
    credentialId: 'UC-SPRING-8849102',
    verificationUrl: 'https://www.udemy.com/certificate/UC-SPRING-8849102/',
    category: 'BACKEND_JAVA',
    skills: ['Java 17', 'Spring Boot', 'Spring Security', 'JWT Auth', 'REST APIs', 'Hibernate JPA'],
    description: 'Demonstrated mastery in constructing enterprise-grade Spring Boot microservices, Spring Security filter chains, JWT multi-factor authentication, Spring Data JPA database persistence, and RESTful web services.',
    drivePdfUrl: 'https://drive.google.com/file/d/1SAMPLE_SPRING_BOOT_CERT_DRIVE_ID/view?usp=sharing',
    driveImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cert-aws-solutions-architect',
    title: 'AWS Academy Cloud Foundations & System Architecture',
    issuer: 'Amazon Web Services (AWS)',
    issuerUrl: 'https://aws.amazon.com/certification/',
    issueDate: 'Nov 2024',
    expiryDate: 'Nov 2027',
    credentialId: 'AWS-CERT-908124',
    verificationUrl: 'https://aws.amazon.com/verification',
    category: 'CLOUD_DEVOPS',
    skills: ['AWS S3', 'EC2', 'IAM', 'Docker', 'VPC Architecture', 'Serverless'],
    description: 'Validation of cloud architecture expertise including deploying scalable applications on AWS EC2, configuring S3 storage buckets, IAM role permissions, VPC networks, and Docker containerization.',
    drivePdfUrl: 'https://drive.google.com/file/d/1SAMPLE_AWS_CERT_DRIVE_ID/view?usp=sharing',
    driveImageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cert-meta-backend-dev',
    title: 'Meta Backend Developer Professional Certificate',
    issuer: 'Meta / Coursera',
    issuerUrl: 'https://www.coursera.org/meta',
    issueDate: 'Aug 2024',
    expiryDate: 'No Expiration',
    credentialId: 'META-BE-449102',
    verificationUrl: 'https://coursera.org/verify/professional-cert/META-BE-449102',
    category: 'BACKEND_JAVA',
    skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Git', 'API Design'],
    description: 'Comprehensive backend engineering certification covering API routing, object-relational mapping (ORM), database optimization, security headers, and unit testing strategies.',
    drivePdfUrl: 'https://drive.google.com/file/d/1SAMPLE_META_CERT_DRIVE_ID/view?usp=sharing',
    driveImageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cert-google-automation',
    title: 'Google IT Automation with Python & Apps Script',
    issuer: 'Google',
    issuerUrl: 'https://grow.google/certificates/',
    issueDate: 'May 2024',
    expiryDate: 'No Expiration',
    credentialId: 'GOOG-AUTO-77120',
    verificationUrl: 'https://coursera.org/verify/professional-cert/GOOG-AUTO-77120',
    category: 'AI_AUTOMATION',
    skills: ['Python Automation', 'Google Apps Script', 'AppSheet', 'Telegram API', 'WhatsApp API'],
    description: 'Certified expertise in building custom multi-channel workflow automations, Google Sheets Apps Script integration, automated email notification pipelines, and Python process scripting.',
    drivePdfUrl: 'https://drive.google.com/file/d/1SAMPLE_GOOGLE_CERT_DRIVE_ID/view?usp=sharing',
    driveImageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cert-react-typescript-pro',
    title: 'Full Stack Web Development (React & TypeScript)',
    issuer: 'Prodigy InfoTech / BizSkill',
    issuerUrl: 'https://bizskill.in',
    issueDate: 'Feb 2024',
    expiryDate: 'No Expiration',
    credentialId: 'PRODIGY-DEV-1082',
    verificationUrl: 'https://bizskill.in/verify',
    category: 'FULL_STACK',
    skills: ['React.js', 'TypeScript', 'TailwindCSS', 'State Management', 'REST Integration'],
    description: 'Certification validating responsive frontend architecture, TypeScript interfaces, custom React hooks, state management, and modern component styling.',
    drivePdfUrl: 'https://drive.google.com/file/d/1SAMPLE_REACT_CERT_DRIVE_ID/view?usp=sharing',
    driveImageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop'
  }
];
