export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  full_description: string;
  problem_statement?: string;
  solution?: string;
  technologies: string[];
  key_features: string[];
  my_contribution?: string;
  github_url?: string | null;
  live_url?: string | null;
  image_url: string;
  screenshots?: string[];
  featured: boolean;
  sort_order: number;
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  issue_date?: string;
  credential_id?: string;
  credential_url?: string;
  image_url: string;
  skills_covered?: string[];
  sort_order: number;
}

export interface Achievement {
  id: number;
  title: string;
  category: 'Competitions' | 'Hackathons' | 'Technical Events' | 'Workshops' | 'Leadership Activities' | string;
  event_name: string;
  organizer: string;
  date: string;
  rank_or_award?: string;
  description: string;
  image_url?: string;
  sort_order: number;
}

export interface Experience {
  id: number;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: string;
  description: string;
  key_responsibilities?: string[];
  logo_url?: string;
  sort_order: number;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

