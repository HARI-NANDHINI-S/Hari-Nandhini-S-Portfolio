import { Project, Certification, Achievement, Experience, ContactSubmission } from '../types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_CERTIFICATIONS, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_EXPERIENCE 
} from '../data/portfolioData';

/**
 * Resolves the backend API base URL.
 * Priority:
 * 1. import.meta.env.VITE_API_URL (explicit Vercel/production environment variable)
 * 2. import.meta.env.VITE_BACKEND_URL (alternative standard name)
 * 3. Relative '/api' (handled by Vercel rewrites or local Vite proxy)
 */
export function getApiBase(): string {
  const envUrl = (
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_BACKEND_URL ||
    ''
  ).trim().replace(/\/+$/, '');

  if (envUrl) {
    return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
  }

  return '/api';
}

export async function fetchProjects(category?: string): Promise<Project[]> {
  try {
    const apiBase = getApiBase();
    const url = category && category !== 'All' 
      ? `${apiBase}/projects?category=${encodeURIComponent(category)}`
      : `${apiBase}/projects`;
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
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase}/certifications`, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data && data.length > 0 ? data : INITIAL_CERTIFICATIONS;
  } catch (err) {
    return INITIAL_CERTIFICATIONS;
  }
}

export async function fetchAchievements(category?: string): Promise<Achievement[]> {
  try {
    const apiBase = getApiBase();
    const url = category && category !== 'All'
      ? `${apiBase}/achievements?category=${encodeURIComponent(category)}`
      : `${apiBase}/achievements`;
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
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase}/experience`, { headers: { 'Accept': 'application/json' } });
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

  const apiBase = getApiBase();
  const endpointsToTry: string[] = [];

  // 1. Primary configured endpoint from environment or relative proxy
  endpointsToTry.push(`${apiBase}/contact`);

  // 2. If apiBase has '/api', also try root alias '/contact'
  if (apiBase.endsWith('/api') && apiBase !== '/api') {
    endpointsToTry.push(`${apiBase.replace(/\/api$/, '')}/contact`);
  }

  // 3. In development ONLY, allow local dev fallbacks (strictly avoided in production)
  if (import.meta.env.DEV) {
    endpointsToTry.push('http://127.0.0.1:8000/api/contact');
    endpointsToTry.push('http://localhost:8000/api/contact');
  }

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
        lastDetailedError = `Endpoint returned non-JSON response (HTTP ${res.status}).`;
        continue; // Try next candidate endpoint
      }

      // If response is a 404 and there are more endpoints to try, continue
      if (res.status === 404 && endpointsToTry.indexOf(endpoint) < endpointsToTry.length - 1) {
        lastDetailedError = `Endpoint ${endpoint} returned 404 Not Found.`;
        continue;
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
      lastDetailedError = err?.message || 'Network connection failed.';
      // Continue to next endpoint fallback
    }
  }

  // If all candidate endpoints failed
  const isVercelOrProd = !import.meta.env.DEV;
  const configGuidance = isVercelOrProd && apiBase === '/api'
    ? ' (Please configure the VITE_API_URL environment variable in your Vercel Project Settings pointing to your deployed Render FastAPI service).'
    : '';

  return {
    success: false,
    message: `Unable to connect to the portfolio contact service${configGuidance} Please reach out directly to Hari Nandhini at harinandhini030506@gmail.com.`
  };
}

