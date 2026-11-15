/**
 * PORTFOLIO CERTIFICATIONS & ACHIEVEMENTS CONFIGURATION
 * -------------------------------------------------------------
 * Contains all genuine certificates, workshops, competitions, and marksheets.
 * Files are located in centralized assets folder:
 * - Images: frontend/public/assets/images/certificates/
 * - Documents: frontend/public/assets/documents/certificates/
 */

export interface CertificateItemConfig {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  category: 'Professional / Technical Certifications' | 'Workshops & Learning' | 'Competitions & Achievements';
  previewImage: string;
  documentUrl: string;
  fileType: 'image' | 'pdf';
  isUploaded: boolean;
  description: string;
  badgeText?: string;
  credentialUrl?: string;
  skills?: string[];
  // Backwards compatibility with ImagePlaceholderConfig
  image?: string;
  placeholderFilename?: string;
}

export interface AchievementItemConfig {
  title: string;
  issuer: string;
  position?: string;
  event?: string;
  image?: string;
  placeholderFilename?: string;
  isUploaded?: boolean;
  category: string;
  date: string;
  description: string;
}

export type ImagePlaceholderConfig = CertificateItemConfig | AchievementItemConfig;

export const GENUINE_CERTIFICATES: CertificateItemConfig[] = [
  // =========================================================================
  // 1. PROFESSIONAL / TECHNICAL CERTIFICATIONS
  // =========================================================================
  {
    id: "fcc-rwd",
    title: "Responsive Web Design Developer Certification",
    issuer: "freeCodeCamp",
    date: "July 26, 2025",
    category: "Professional / Technical Certifications",
    previewImage: "/assets/images/certificates/free-code-camp.png",
    documentUrl: "/assets/images/certificates/free-code-camp.png",
    fileType: "image",
    isUploaded: true,
    badgeText: "Developer Certification • 300 hrs",
    description: "Verified developer certification representing ~300 hours of coursework in modern responsive layouts, HTML5 semantics, CSS Grid, Flexbox, media queries, accessibility, and visual design fundamentals.",
    credentialUrl: "https://freecodecamp.org/certification/HARI_NANDHINI_S/responsive-web-design",
    skills: ["HTML5", "CSS3", "Flexbox", "CSS Grid", "Responsive Design", "Accessibility"]
  },
  {
    id: "infosys-genai",
    title: "Generative AI for All",
    issuer: "Infosys Springboard",
    date: "January 24, 2025",
    category: "Professional / Technical Certifications",
    previewImage: "/assets/images/certificates/generative-ai.png",
    documentUrl: "/assets/images/certificates/generative-ai.png",
    fileType: "image",
    isUploaded: true,
    badgeText: "Course Completion Certificate",
    description: "Official course completion certificate awarded by Infosys Springboard covering Generative AI foundations, prompt engineering, Transformer architectures, LLM capabilities, and responsible AI ethics.",
    credentialUrl: "https://verify.onwingspan.com",
    skills: ["Generative AI", "LLMs", "Prompt Engineering", "Transformers", "AI Ethics"]
  },
  {
    id: "scaler-java",
    title: "Java Course with Certification",
    issuer: "Scaler Topics",
    date: "2025",
    category: "Professional / Technical Certifications",
    previewImage: "/assets/images/certificates/java.jpg",
    documentUrl: "/assets/images/certificates/java.jpg",
    fileType: "image",
    isUploaded: true,
    badgeText: "Certificate of Excellence",
    description: "Certificate of Excellence in recognition of completing 86 video tutorials, 12 structured modules, and 9 programming challenges covering Core Java, OOP principles, collections, and algorithmic problem solving.",
    credentialUrl: "https://www.scaler.com/topics/",
    skills: ["Java", "OOP", "Data Structures", "Algorithms", "Collections Framework"]
  },
  {
    id: "simplilearn-html",
    title: "Introduction to HTML",
    issuer: "Simplilearn SkillUp",
    date: "18th January 2025",
    category: "Professional / Technical Certifications",
    previewImage: "/assets/images/certificates/html-preview.png",
    documentUrl: "/assets/documents/certificates/html-certificate.pdf",
    fileType: "pdf",
    isUploaded: true,
    badgeText: "Certificate Code: 7788583",
    description: "Verified SkillUp online course completion certificate demonstrating core competence in semantic HTML5 markup, document hierarchy, web form validation, media integration, and accessible structure.",
    credentialUrl: "https://www.simplilearn.com/skillup-free-online-courses",
    skills: ["HTML5", "Semantic Markup", "Web Standards", "Document Architecture"]
  },
  {
    id: "nptel-ml",
    title: "Introduction to Machine Learning (Tamil)",
    issuer: "NPTEL & IIT Madras",
    date: "Jul-Sep 2024",
    category: "Professional / Technical Certifications",
    previewImage: "/assets/images/certificates/nptel-preview.jpg",
    documentUrl: "/assets/documents/certificates/nptel-certificate.pdf",
    fileType: "pdf",
    isUploaded: true,
    badgeText: "Elite • Score: 66% (MoE Govt. of India)",
    description: "8-week NPTEL Online Certification (Roll No: NPTEL24CS111S153802484) funded by MoE, Govt. of India. Completed with 66% consolidated score (Assignments: 24.67/25, Proctored Exam: 40.5/75) covering supervised & unsupervised learning, regression, SVMs, and neural networks.",
    credentialUrl: "https://nptel.ac.in",
    skills: ["Machine Learning", "Supervised Learning", "Regression", "SVM", "Model Evaluation"]
  },

  // =========================================================================
  // 2. WORKSHOPS & LEARNING
  // =========================================================================
  {
    id: "gdg-cloud-study-jam",
    title: "Google Cloud Study Jams 2025",
    issuer: "GDG on Campus · CIT",
    date: "October – November 2025",
    category: "Workshops & Learning",
    previewImage: "/assets/images/certificates/google-study-jam.jpg",
    documentUrl: "/assets/images/certificates/google-study-jam.jpg",
    fileType: "image",
    isUploaded: true,
    badgeText: "Hands-on Labs Completion",
    description: "Certificate of Completion for successfully completing all required hands-on labs and architectural sessions in the Google Cloud Study Jams 2025 organized by GDG on Campus – Coimbatore Institute of Technology.",
    credentialUrl: "https://cit.edu.in",
    skills: ["Google Cloud Platform", "Cloud Architecture", "Qwiklabs", "Compute Engine"]
  },
  {
    id: "foss-linux-workshop",
    title: "4-Day Linux Workshop",
    issuer: "FOSS Club · CIT",
    date: "2025",
    category: "Workshops & Learning",
    previewImage: "/assets/images/certificates/linux-preview.png",
    documentUrl: "/assets/documents/certificates/linux-workshop.pdf",
    fileType: "pdf",
    isUploaded: true,
    badgeText: "Flagship FOSS Event",
    description: "Certificate of Participation for outstanding dedication in the 4-Day Linux Workshop, a flagship hands-on event conducted by the FOSS Club of CIT covering bash scripting, process control, server management, and system commands.",
    skills: ["Linux CLI", "Bash Scripting", "System Administration", "Process Control"]
  },

  // =========================================================================
  // 3. COMPETITIONS & ACHIEVEMENTS
  // =========================================================================
  {
    id: "code-red-nitk",
    title: "CODE:RED 2025 — MISSION:IMPOSSIBLE",
    issuer: "IEEE Computer Society & NITK IEEE Branch",
    date: "2025",
    category: "Competitions & Achievements",
    previewImage: "/assets/images/certificates/code-red-preview.png",
    documentUrl: "/assets/documents/certificates/code-red.pdf",
    fileType: "pdf",
    isUploaded: true,
    badgeText: "Team: WINNING WARRIORS",
    description: "Certificate of Participation awarded to Hari Nandhini from Coimbatore Institute of Technology (CIT) representing team WINNING WARRIORS in the national CODE:RED 2025 Mission: Impossible technical competition organized by the IEEE Computer Society NITK Student Branch.",
    skills: ["Competitive Programming", "System Problem Solving", "Team Collaboration"]
  },
  {
    id: "astranova-cit",
    title: "ASTRANOVA 2K26 — National Level Technical Symposium",
    issuer: "Dept. of Information Technology, CIT",
    date: "23rd & 24th January 2026",
    category: "Competitions & Achievements",
    previewImage: "/assets/images/certificates/astronova-preview.jpg",
    documentUrl: "/assets/documents/certificates/astronova.pdf",
    fileType: "pdf",
    isUploaded: true,
    badgeText: "Technical (All) Track",
    description: "Certificate of Participation awarded to Hari Nandhini S (CIT) for competing in the Technical (All) events track at ASTRANOVA 2K26, a National Level Technical Symposium held by the Department of Information Technology at Coimbatore Institute of Technology.",
    credentialUrl: "https://cit.edu.in",
    skills: ["Technical Presentation", "Symposium Competitions", "Emerging Tech"]
  }
];

// Backwards-compatible export mapping
export const portfolioImages = {
  certifications: GENUINE_CERTIFICATES.map(c => ({
    ...c,
    image: c.previewImage,
    placeholderFilename: c.documentUrl.split('/').pop() || ''
  })),
  achievements: [
    {
      title: "Pitch Pit – 3rd Place",
      event: "Melinia '26",
      position: "3rd Place",
      issuer: "Coimbatore Institute of Technology (CIT)",
      category: "Competitions",
      date: "2026",
      description: "Secured 3rd Place in the Pitch Pit competition at Melinia '26, hosted by Coimbatore Institute of Technology (CIT)."
    },
    {
      title: "HackMars – 4th Place",
      event: "HackMars Hackathon",
      position: "4th Place",
      issuer: "HackMars Organizing Body",
      category: "Hackathons",
      date: "2025",
      description: "Secured 4th Place in the HackMars Hackathon, competing against multidisciplinary developer teams."
    },
    {
      title: "Idea Sprint – 1st Runner-up",
      event: "Idea Sprint",
      position: "1st Runner-up",
      issuer: "Entrepreneurship Development Cell, CIT (EDC CIT)",
      category: "Competitions",
      date: "2025",
      description: "Awarded 1st Runner-up in the Idea Sprint competition, organized by the Entrepreneurship Development Cell, CIT (EDC CIT)."
    }
  ]
};
