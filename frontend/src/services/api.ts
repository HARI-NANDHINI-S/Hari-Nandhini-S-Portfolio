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
  const name = form.name?.trim() || '';
  const email = form.email?.trim() || '';
  const subject = form.subject?.trim() || '';
  const message = form.message?.trim() || '';

  if (!name || !email || !subject || !message) {
    return {
      success: false,
      message: 'Please fill in all contact fields (name, email, subject, and message).'
    };
  }

  // Endpoints to attempt: First relative proxy /api/contact, then direct backend port fallbacks
  const endpointsToTry = [
    `${API_BASE}/contact`,
    'http://127.0.0.1:8000/api/contact',
    'http://localhost:8000/api/contact'
  ];

  let lastDetailedError = '';

  for (const endpoint of endpointsToTry) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      // Safely read response text first to guard against HTML error pages (e.g. 404, 502, proxy timeout)
      const rawText = await res.text();
      let data: any = null;

      try {
        data = JSON.parse(rawText);
      } catch {
        // If server returns non-JSON (HTML 404/502/504 page from proxy or static host)
        lastDetailedError = `Endpoint ${endpoint} returned non-JSON response (HTTP ${res.status}).`;
        continue; // Try direct fallback endpoint
      }

      if (data && typeof data.success === 'boolean') {
        return {
          success: data.success,
          message: data.message || (data.success ? `Thank you, ${name}! Your message has been sent.` : 'Email delivery could not be completed.')
        };
      }

      if (res.ok) {
        return {
          success: true,
          message: data?.message || `Thank you, ${name}! Your message has been received.`
        };
      } else {
        return {
          success: false,
          message: data?.detail || data?.message || `HTTP ${res.status}: Failed to submit message.`
        };
      }
    } catch (err: any) {
      lastDetailedError = err?.message || 'Connection failed';
      // Continue to next endpoint fallback
    }
  }

  // If all endpoints failed or returned non-JSON
  return {
    success: false,
    message: lastDetailedError && !lastDetailedError.includes('non-JSON')
      ? lastDetailedError
      : 'Unable to reach the contact backend service. Please ensure the backend server is running on http://127.0.0.1:8000, or email Hari directly at harinandhini030506@gmail.com.'
  };
}

