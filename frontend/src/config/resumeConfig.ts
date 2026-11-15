/**
 * RESUME CONFIGURATION
 * -------------------------------------------------------------
 * Genuine PDF resumes for Software Development and Data Analytics & AI.
 * Located in centralized assets folder: frontend/public/assets/documents/resumes/
 */

export interface ResumeOption {
  label: string;
  filename: string;
  path: string;
  isAvailable: boolean;
  comingSoonMessage: string;
  description: string;
  tracks: string[];
}

export const resumeFiles: Record<'softwareDevelopment' | 'dataAI', ResumeOption> = {
  softwareDevelopment: {
    label: "Software Development Resume",
    filename: "Hari_Nandhini_S_SDE_Resume.pdf",
    path: "/assets/documents/resumes/sde-resume.pdf",
    isAvailable: true,
    comingSoonMessage: "SDE Resume downloading...",
    description: "Curated for Software Engineer, Full-Stack Developer, and Systems Engineering roles. Highlights scalable web architectures, database schemas, object-oriented design, and production workflows.",
    tracks: [
      "CIT M.Sc. Software Systems (CGPA: 8.85 / 10)",
      "Python, C++, Java proficiency",
      "React & FastAPI REST architectures",
      "VoxNira / Granus & Land-IQ full-stack systems projects",
      "Part-time Web Developer @ Studio 3 Interactive"
    ]
  },
  dataAI: {
    label: "Data Analytics & AI Resume",
    filename: "Hari_Nandhini_S_Data_AI_Resume.pdf",
    path: "/assets/documents/resumes/data-resume.pdf",
    isAvailable: true,
    comingSoonMessage: "Data & AI Resume downloading...",
    description: "Curated for Data Analyst, Machine Learning Intern, and AI Engineer positions. Emphasizes statistical data preprocessing, feature engineering, predictive modeling, and speech intelligence.",
    tracks: [
      "Python, Pandas, NumPy, Scikit-learn & EDA pipelines",
      "AgriMind & Nexara AI predictive analytics platforms",
      "Speech-to-text triage NLP via Whisper & Meta MMS",
      "Imbalanced learning & fraud risk classification",
      "Infosys Springboard Generative AI & NPTEL ML certified"
    ]
  }
};
