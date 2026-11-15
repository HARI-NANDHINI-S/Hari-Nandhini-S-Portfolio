import { Project, Certification, Achievement, Experience, ContactSubmission } from '../types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_CERTIFICATIONS, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_EXPERIENCE 
} from '../data/portfolioData';

const API_BASE = '/api';

export async function fetchProjects(category?: string): Promise<Project[]> {
  try {
    const url = category && category !== 'All' 
      ? `${API_BASE}/projects?category=${encodeURIComponent(category)}`
      : `${API_BASE}/projects`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data && data.length > 0 ? data : INITIAL_PROJECTS;
  } catch (err) {
    // Graceful fallback to verified static data
    if (category && category !== 'All') {
      return INITIAL_PROJECTS.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }
    return INITIAL_PROJECTS;
  }
}

export async function fetchCertifications(): Promise<Certification[]> {
  try {
    const res = await fetch(`${API_BASE}/certifications`, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data && data.length > 0 ? data : INITIAL_CERTIFICATIONS;
  } catch (err) {
    return INITIAL_CERTIFICATIONS;
  }
}

export async function fetchAchievements(category?: string): Promise<Achievement[]> {
  try {
    const url = category && category !== 'All'
      ? `${API_BASE}/achievements?category=${encodeURIComponent(category)}`
      : `${API_BASE}/achievements`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data && data.length > 0 ? data : INITIAL_ACHIEVEMENTS;
  } catch (err) {
    if (category && category !== 'All') {
      return INITIAL_ACHIEVEMENTS.filter(a => a.category.toLowerCase().includes(category.toLowerCase()));
    }
    return INITIAL_ACHIEVEMENTS;
  }
}

export async function fetchExperience(): Promise<Experience[]> {
  try {
    const res = await fetch(`${API_BASE}/experience`, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data && data.length > 0 ? data : INITIAL_EXPERIENCE;
  } catch (err) {
    return INITIAL_EXPERIENCE;
  }
}

export async function submitContact(form: ContactSubmission): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || 'Failed to submit contact message');
    }
    return {
      success: data.success ?? true,
      message: data.message || `Thank you ${form.name}! Your message has been received.`
    };
  } catch (err: any) {
    // If backend is unreachable, we provide clear honest communication
    return {
      success: false,
      message: err.message || 'Unable to connect to backend service. Please reach out via direct email at harinandhini030506@gmail.com!'
    };
  }
}

