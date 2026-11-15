import React from 'react';

interface IssuerLogoProps {
  issuer: string;
  className?: string;
  size?: number;
}

export const IssuerLogo: React.FC<IssuerLogoProps> = ({ issuer, className = '', size = 28 }) => {
  const norm = issuer.toLowerCase();

  // 1. Infosys Springboard
  if (norm.includes('infosys')) {
    return (
      <svg width={size * 1.5} height={size} viewBox="0 0 120 40" className={className} fill="none">
        <rect width="120" height="40" rx="8" fill="#007CC3" fillOpacity="0.15" stroke="#007CC3" strokeWidth="1" />
        <text x="12" y="24" fontFamily="'Space Grotesk', sans-serif" fontWeight="800" fontSize="14" fill="#007CC3">Infosys</text>
        <circle cx="72" cy="20" r="2" fill="#FF852E" />
        <text x="78" y="23" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="10" fill="#38D9FF">Springboard</text>
      </svg>
    );
  }

  // 2. freeCodeCamp
  if (norm.includes('freecodecamp')) {
    return (
      <svg width={size * 1.5} height={size} viewBox="0 0 120 40" className={className} fill="none">
        <rect width="120" height="40" rx="8" fill="#0A0A23" stroke="#38D9FF" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M18 20c0-4 3-7 3-7s1 3 3 5c2 2 3 4 3 6 0 4-3 7-6 7s-6-3-6-7c0-1.5.5-3 1.2-4.2C17.5 18 18 19 18 20z" fill="#006400" opacity="0.3" />
        <path d="M19 19c0-3 2.5-5.5 2.5-5.5s.8 2.2 2.5 3.8c1.6 1.6 2.5 3.2 2.5 4.7 0 3.2-2.5 5.5-5 5.5s-5-2.3-5-5.5c0-1.2.4-2.4 1-3.3C18.6 17.5 19 18.2 19 19z" fill="#FFA500" />
        <text x="34" y="24" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="10" fill="#FFFFFF">freeCodeCamp</text>
      </svg>
    );
  }

  // 3. Scaler Topics
  if (norm.includes('scaler')) {
    return (
      <svg width={size * 1.5} height={size} viewBox="0 0 110 40" className={className} fill="none">
        <rect width="110" height="40" rx="8" fill="#0E1E38" stroke="#38D9FF" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M16 14h6a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h-6v-8zm0 8h8a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h-8v-8z" fill="#38D9FF" opacity="0.8" />
        <text x="36" y="24" fontFamily="'Space Grotesk', sans-serif" fontWeight="800" fontSize="13" fill="#FFFFFF">SCALER</text>
      </svg>
    );
  }

  // 4. Simplilearn SkillUp
  if (norm.includes('simplilearn')) {
    return (
      <svg width={size * 1.5} height={size} viewBox="0 0 110 40" className={className} fill="none">
        <rect width="110" height="40" rx="8" fill="#F8991D" fillOpacity="0.15" stroke="#F8991D" strokeWidth="1" />
        <text x="10" y="24" fontFamily="'Space Grotesk', sans-serif" fontWeight="800" fontSize="12" fill="#F8991D">simpli</text>
        <text x="50" y="24" fontFamily="'Space Grotesk', sans-serif" fontWeight="800" fontSize="12" fill="#38D9FF">learn</text>
        <text x="86" y="16" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="8" fill="#FF852E">UP</text>
      </svg>
    );
  }

  // 5. NPTEL / Swayam / IIT Madras
  if (norm.includes('nptel') || norm.includes('swayam') || norm.includes('iit')) {
    return (
      <svg width={size * 1.5} height={size} viewBox="0 0 90 40" className={className} fill="none">
        <rect width="90" height="40" rx="8" fill="#901300" fillOpacity="0.15" stroke="#E65100" strokeWidth="1" />
        <text x="45" y="25" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="13" fill="#FF852E">NPTEL</text>
      </svg>
    );
  }

  // 6. Google Developer Group / Google Cloud
  if (norm.includes('google') || norm.includes('gdg')) {
    return (
      <svg width={size * 1.5} height={size} viewBox="0 0 110 40" className={className} fill="none">
        <rect width="110" height="40" rx="8" fill="#1A202C" stroke="#4285F4" strokeWidth="1" strokeOpacity="0.4" />
        <path d="M16 20l4-4 4 4-4 4z" fill="#EA4335" />
        <path d="M24 20l4-4 4 4-4 4z" fill="#34A853" />
        <text x="36" y="24" fontFamily="'Space Grotesk', sans-serif" fontWeight="800" fontSize="11" fill="#4285F4">GDG</text>
        <text x="64" y="24" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="10" fill="#FBBC05">CIT</text>
      </svg>
    );
  }

  // 7. IEEE / NITK
  if (norm.includes('ieee') || norm.includes('nitk') || norm.includes('code:red')) {
    return (
      <svg width={size * 1.5} height={size} viewBox="0 0 100 40" className={className} fill="none">
        <rect width="100" height="40" rx="8" fill="#00629B" fillOpacity="0.2" stroke="#00629B" strokeWidth="1" />
        <circle cx="20" cy="20" r="8" stroke="#38D9FF" strokeWidth="1.5" />
        <path d="M16 20h8M20 16v8" stroke="#38D9FF" strokeWidth="1.5" />
        <text x="34" y="24" fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="12" fill="#38D9FF">IEEE</text>
      </svg>
    );
  }

  // 8. Studio 3 Interactive
  if (norm.includes('studio 3') || norm.includes('studio3')) {
    return (
      <svg width={size * 1.5} height={size} viewBox="0 0 110 40" className={className} fill="none">
        <rect width="110" height="40" rx="8" fill="#D32F2F" fillOpacity="0.15" stroke="#D32F2F" strokeWidth="1" />
        <text x="12" y="24" fontFamily="'Space Grotesk', sans-serif" fontWeight="800" fontSize="11" fill="#E53935">Studio 3</text>
        <text x="64" y="24" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="10" fill="#38D9FF">Interactive</text>
      </svg>
    );
  }

  // 9. Coimbatore Institute of Technology / FOSS CIT
  if (norm.includes('cit') || norm.includes('coimbatore institute') || norm.includes('foss')) {
    return (
      <svg width={size * 1.4} height={size} viewBox="0 0 80 40" className={className} fill="none">
        <rect width="80" height="40" rx="8" fill="#0F172A" stroke="#FF852E" strokeWidth="1" strokeOpacity="0.4" />
        <circle cx="20" cy="20" r="9" stroke="#FF852E" strokeWidth="1.5" fill="#FF852E" fillOpacity="0.2" />
        <text x="35" y="24" fontFamily="'Space Grotesk', sans-serif" fontWeight="800" fontSize="12" fill="#FF852E">CIT</text>
      </svg>
    );
  }

  // 10. HackerRank
  if (norm.includes('hackerrank')) {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" className={className} fill="none">
        <rect width="40" height="40" rx="8" fill="#1BA94C" />
        <path d="M14 10v20h4v-8h4v8h4V10h-4v8h-4v-8h-4z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Fallback
  return (
    <div className={`px-2.5 py-1 rounded-lg bg-cyber-blue/15 border border-cyber-blue/30 text-cyber-cyan text-xs font-mono font-bold ${className}`}>
      {issuer}
    </div>
  );
};
