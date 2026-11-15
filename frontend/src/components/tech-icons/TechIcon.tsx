import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = '', size = 24 }) => {
  const norm = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  switch (norm) {
    case 'python':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <path fill="#3776AB" d="M63.7 3.5c-30.8 0-28.9 13.4-28.9 13.4l.03 13.9h29.4v4.2H23.5S3.5 32.7 3.5 63.8c0 31.1 17.4 30.1 17.4 30.1h10.4v-14.6s-.6-17.4 17.1-17.4h29.2s16.5.3 16.5-16.1V16.9s2.4-13.4-30.4-13.4zm-16.5 9.3c3.5 0 6.3 2.8 6.3 6.3s-2.8 6.3-6.3 6.3-6.3-2.8-6.3-6.3 2.8-6.3 6.3-6.3z" />
          <path fill="#FFD43B" d="M64.3 124.5c30.8 0 28.9-13.4 28.9-13.4l-.03-13.9H63.8V93h40.7s20 2.3 20-28.8c0-31.1-17.4-30.1-17.4-30.1H116.7v14.6s.6 17.4-17.1 17.4H70.4s-16.5-.3-16.5 16.1v28.9s-2.4 13.4 30.4 13.4zm16.5-9.3c-3.5 0-6.3-2.8-6.3-6.3s2.8-6.3 6.3-6.3 6.3 2.8 6.3 6.3-2.8 6.3-6.3 6.3z" />
        </svg>
      );

    case 'c':
    case 'cpp':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <path fill="#00599C" d="M117.5 73.1L67.6 102c-2.3 1.3-5 1.3-7.3 0L10.5 73.1c-2.3-1.3-3.7-3.7-3.7-6.4V9.3C6.8 6.6 8.2 4.2 10.5 2.9L60.3 0c2.3-1.3 5-1.3 7.3 0l49.9 28.9c2.3 1.3 3.7 3.7 3.7 6.4v57.4c0 2.7-1.4 5.1-3.7 6.4z" />
          <path fill="#004482" d="M64 128l53.5-30.9c2.3-1.3 3.7-3.7 3.7-6.4V33.3L64 128z" />
          <text x="64" y="76" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="44" fill="#FFFFFF" text-anchor="middle">C++</text>
        </svg>
      );

    case 'java':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <path fill="#5382A1" d="M47.5 90.7c5.6.8 11.7 1.1 17.6 1.1 14.8 0 25.1-2.1 25.1-2.1s-3.2 2.6-10 4.2c-8.3 2.1-21.3 2.6-31.6 1.1-10.8-1.6-5.5-4-5.5-4s2.7.5 5.5.7l-1.1-.9z"/>
          <path fill="#5382A1" d="M43.2 79.2c-1.3-2.6 3.6-4.6 8.3-6.1 6.7-2.2 15-3.3 23.1-1.7 9.3 1.8 19.4 6.1 19.4 6.1s-3.2 1.8-10.9 2.8c-9.7 1.2-21.8.7-32-1.7-3.6-.8-7.1-.6-7.9.6z"/>
          <path fill="#5382A1" d="M82.3 103.7c11.6-2.9 17.7-8.5 17.7-8.5s-4.9 3.7-15.9 6c-12.5 2.6-32.2 2.8-46.6-.6-5.5-1.3-9.6-2.9-9.6-2.9s3.2 2.8 12.6 4.6c13.8 2.6 32 3.3 41.8 1.4z"/>
          <path fill="#5382A1" d="M95.3 85.8c.9-1-1.8-2.9-7-4.6-6.9-2.2-18.4-3.7-31.3-3.2-15.5.6-27.1 3.8-27.1 3.8s3.9-1.7 13.9-3c12.4-1.7 29.2-1.5 40.7 1.7 7.5 2.1 11.7 4.3 10.8 5.3z"/>
          <path fill="#5382A1" d="M60.4 117.8c-18.7-.3-33.8-4.4-33.8-4.4s3.7 2.1 14.5 3.3c15.2 1.7 34.6 1.4 46.8-.7 13.2-2.3 19.1-6.6 19.1-6.6s-5.3 4.2-18.6 6.3c-9.5 1.5-19.8 2.1-28 2.1z"/>
          <path fill="#E76F00" d="M72.9 42.1c4.2 4.8 2 11.7-2.4 16.9-6.2 7.4-15.1 11.5-15.1 11.5s4.2-3.2 7.5-7.2c4.5-5.5 5-10.8 1.6-14.5-3.9-4.3-12.6-4.5-18.1-1.4 0 0 2.7-2.8 8.9-4.4 8.2-2.2 14.4 3.7 17.6 7.6z"/>
          <path fill="#EA2D2E" d="M57.4 18.9c3.2 3.6 1.5 8.9-1.8 12.9-4.8 5.6-11.5 8.8-11.5 8.8s3.2-2.5 5.7-5.5c3.4-4.2 3.8-8.3 1.2-11.1-3-3.2-9.6-3.4-13.8-1 0 0 2-2.1 6.8-3.4 6.2-1.6 11 2.8 13.4 5.9z"/>
          <path fill="#EA2D2E" d="M83.4 63.6c-1.3-1.4-2.8-1.8-2.8-1.8s1.6.4 2.8 1.4c3.4 2.7 3.5 6.7 1 10.7-3.1 5-9 9.3-9 9.3s6.3-3.8 8.7-7.9c2.3-3.9 1.9-8.4-.7-11.7z"/>
        </svg>
      );

    case 'javascript':
    case 'js':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <path fill="#F7DF1E" d="M0 0h128v128H0z" />
          <path fill="#000000" d="M67.3 100c0 9-5.3 14.1-13.6 14.1-7.8 0-12.4-4.5-14.7-9.4l9.3-5.7c1.3 2.6 3.1 4.7 5.7 4.7 2.8 0 4.5-1.4 4.5-5.5V56.7h10.9l-2.1 43.3zm29.3-1.7c3.2 5.5 7.6 9 14.3 9 6.2 0 10.2-3.1 10.2-7.5 0-5.2-4.1-7.1-11.2-10.2-10.2-4.3-16.7-9.7-16.7-20.9 0-10.4 8-18.4 20.6-18.4 8.9 0 15.2 3.6 19.3 11l-8.7 5.6c-2.1-3.8-4.9-5.7-9.9-5.7-4.6 0-7.8 2.8-7.8 6.4 0 4.4 3.2 6.3 9.7 9.1 11.4 4.9 18.2 10 18.2 21.8 0 12.5-9.8 19.3-22.9 19.3-13 0-21.3-6.5-25-14.4l10-6.1z" />
        </svg>
      );

    case 'react':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <ellipse cx="64" cy="64" rx="14" ry="56" fill="none" stroke="#61DAFB" stroke-width="7" transform="rotate(30 64 64)" />
          <ellipse cx="64" cy="64" rx="14" ry="56" fill="none" stroke="#61DAFB" stroke-width="7" transform="rotate(90 64 64)" />
          <ellipse cx="64" cy="64" rx="14" ry="56" fill="none" stroke="#61DAFB" stroke-width="7" transform="rotate(150 64 64)" />
          <circle cx="64" cy="64" r="11" fill="#61DAFB" />
        </svg>
      );

    case 'typescript':
    case 'ts':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#3178C6" />
          <path fill="#FFFFFF" d="M24 44h40v12H49v48H35V56H24zm54 0h34v12H96v10h18v11H96v15h18v12H78z" />
        </svg>
      );

    case 'redis':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <path fill="#DC382D" d="M14 42l50-24 50 24v44l-50 24-50-24z" />
          <path fill="#A3241A" d="M64 18l50 24v44l-50 24z" />
          <path fill="#FFFFFF" d="M42 54h44v8H42zm0 14h34v8H42z" />
        </svg>
      );

    case 'html':
    case 'html5':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <path fill="#E34F26" d="M19.1 114.7L8.4 0h111.2l-10.7 114.7-44.9 13.3z" />
          <path fill="#EF652A" d="M64 116.7l37.2-10.7 8.9-95.2H64z" />
          <path fill="#ECECEC" d="M64 48.7H47.4l-1.1-12.7H64V23.6H33.8l3.4 37.8H64zm0 39.4l-.1.1-16.7-4.5-1.1-12H33.7l2.1 23.9 28.2 7.8V88.1z" />
          <path fill="#FFFFFF" d="M64 48.7h16.6l-1.6 17.5L64 70.7V48.7zm0-25.1h30.2l-1.1 12.4H64v-12.4zm0 64.5l16.7-4.5 2.3-25.9H95.4l-3.3 37.8-28.1 7.8V88.1z" />
        </svg>
      );

    case 'css':
    case 'css3':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <path fill="#1572B6" d="M19.1 114.7L8.4 0h111.2l-10.7 114.7-44.9 13.3z" />
          <path fill="#33A9DC" d="M64 116.7l37.2-10.7 8.9-95.2H64z" />
          <path fill="#ECECEC" d="M64 51.5H48.7l-1.1-12.7H64V26.4H33.8l3.4 37.8H64zm0 43.8l-.1.1-16.7-4.5-1.1-12.5H33.7l2.1 24.4 28.2 7.8V95.3z" />
          <path fill="#FFFFFF" d="M64 51.5h16.6l-1.6 17.5L64 73.5V51.5zm0-25.1h30.2l-1.1 12.4H64v-12.4zm0 68.9l16.7-4.5 2.3-25.9H95.4l-3.3 37.8-28.1 7.8V95.3z" />
        </svg>
      );

    case 'fastapi':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="60" fill="#009688" />
          <path fill="#FFFFFF" d="M60.6 22L36 67h25.4L57.2 106 88 57.5H62.9z" />
        </svg>
      );

    case 'php':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <ellipse cx="64" cy="64" rx="60" ry="34" fill="#777BB4" />
          <text x="64" y="73" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="34" fill="#FFFFFF" text-anchor="middle">php</text>
        </svg>
      );

    case 'mysql':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#00758F" />
          <path fill="#F29111" d="M42 45c-8 6-12 18-12 28 0 20 16 32 34 32s34-12 34-32c0-10-4-22-12-28-5 12-14 18-22 18s-17-6-22-18z" />
          <text x="64" y="74" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="22" fill="#FFFFFF" text-anchor="middle">MySQL</text>
        </svg>
      );

    case 'mongodb':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <path fill="#47A248" d="M64 4c-5 25-34 46-34 76 0 24 16 44 34 48 18-4 34-24 34-48 0-30-29-51-34-76z" />
          <path fill="#499D4A" d="M64 4v124c18-4 34-24 34-48 0-30-29-51-34-76z" />
          <path fill="#FFFFFF" d="M64 68c-1-5-2-10-3-15v48c1 3 2 6 3 8 1-2 2-5 3-8V53c-1 5-2 10-3 15z" opacity="0.3" />
        </svg>
      );

    case 'sqlite':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#003B57" />
          <path fill="#00ADEF" d="M30 38c0-10 15-18 34-18s34 8 34 18-15 18-34 18-34-8-34-18z" />
          <path fill="#29B6F6" d="M30 64c0 10 15 18 34 18s34-8 34-18V48c0 10-15 18-34 18s-34-8-34-18v16z" />
          <path fill="#0288D1" d="M30 90c0 10 15 18 34 18s34-8 34-18V74c0 10-15 18-34 18s-34-8-34-18v16z" />
        </svg>
      );

    case 'git':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <path fill="#F05032" d="M124.6 57.2L70.8 3.4c-4.5-4.5-11.8-4.5-16.3 0L38.2 19.7l20.6 20.6c4.8-1.6 10.4-.5 14.2 3.3 3.8 3.8 4.9 9.4 3.3 14.2l19.9 19.9c4.8-1.6 10.4-.5 14.2 3.3 5.4 5.4 5.4 14.1 0 19.5s-14.1 5.4-19.5 0c-4.1-4.1-5.1-10.1-3-15l-18.6-18.6v33.4c1.8 1.1 3.4 2.6 4.6 4.5 3.9 5.8 2.8 13.6-2.5 18.2-5.4 4.6-13.4 4-18.2-1.4-4.8-5.4-4.2-13.4 1.2-18.2 2-1.7 4.5-2.7 7.1-3V59.4c-2.6-.3-5.1-1.3-7.1-3-4.1-3.5-5.3-9.1-3.6-13.8L28.1 22.8 3.4 47.5c-4.5 4.5-4.5 11.8 0 16.3l53.8 53.8c4.5 4.5 11.8 4.5 16.3 0l51.1-51.1c4.5-4.5 4.5-11.8 0-16.3z" />
        </svg>
      );

    case 'github':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <path fill="#181717" d="M64 0C28.7 0 0 28.7 0 64c0 28.3 18.3 52.3 43.8 60.8 3.2.6 4.4-1.4 4.4-3.1v-11.9c-17.7 3.8-21.4-8.5-21.4-8.5-2.9-7.4-7.1-9.3-7.1-9.3-5.8-3.9.4-3.9.4-3.9 6.4.4 9.7 6.6 9.7 6.6 5.7 9.8 14.9 7 18.5 5.3.6-4.1 2.2-7 4-8.6-14.1-1.6-29-7.1-29-31.5 0-7 2.5-12.7 6.6-17.1-.7-1.6-2.9-8.1.6-16.9 0 0 5.4-1.7 17.6 6.6 5.1-1.4 10.6-2.1 16-2.2 5.4.1 10.9.8 16 2.2 12.2-8.3 17.6-6.6 17.6-6.6 3.5 8.8 1.3 15.3.6 16.9 4.1 4.4 6.6 10.1 6.6 17.1 0 24.5-14.9 29.8-29.1 31.4 2.3 2 4.3 5.9 4.3 11.9v17.7c0 1.7 1.2 3.7 4.4 3.1 25.5-8.5 43.8-32.5 43.8-60.8 0-35.3-28.7-64-64-64z" />
        </svg>
      );

    case 'pandas':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#150458" />
          <rect x="25" y="25" width="22" height="42" fill="#E70488" rx="4" />
          <rect x="53" y="45" width="22" height="58" fill="#FFD43B" rx="4" />
          <rect x="81" y="25" width="22" height="68" fill="#00C0F3" rx="4" />
        </svg>
      );

    case 'numpy':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#013243" />
          <path fill="#4DABCF" d="M64 20l40 23v46L64 112 24 89V43z" />
          <path fill="#013243" d="M64 26l34 20v40L64 106 30 86V46z" opacity="0.3" />
          <text x="64" y="74" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle">NP</text>
        </svg>
      );

    case 'scikitlearn':
    case 'sklearn':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="58" fill="#F89939" />
          <circle cx="48" cy="64" r="32" fill="#3499CD" />
          <text x="74" y="70" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="900" fill="#FFFFFF">SK</text>
        </svg>
      );

    case 'tensorflow':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <path fill="#FF6F00" d="M64 0L14 29v70l50 29 50-29V29z" />
          <path fill="#FFA000" d="M64 0l50 29v70l-50 29z" />
          <path fill="#FFFFFF" d="M44 38h40v12H68v50H56V50H44z" />
        </svg>
      );

    case 'matplotlib':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="58" fill="#11557C" />
          <path d="M 24 85 Q 44 25, 64 64 T 104 45" fill="none" stroke="#FFA726" stroke-width="6" />
          <path d="M 24 64 Q 44 85, 64 45 T 104 75" fill="none" stroke="#26A69A" stroke-width="5" />
        </svg>
      );

    case 'seaborn':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#4C72B0" />
          <circle cx="40" cy="40" r="14" fill="#C44E52" />
          <circle cx="70" cy="55" r="14" fill="#55A868" />
          <circle cx="95" cy="80" r="14" fill="#8172B2" />
          <circle cx="50" cy="90" r="14" fill="#CCB974" />
        </svg>
      );

    case 'vscode':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <path fill="#0065A9" d="M92.7 125.7l29-14.1c3.9-1.9 6.3-5.8 6.3-10.1V26.5c0-4.3-2.4-8.2-6.3-10.1l-29-14.1c-4.4-2.1-9.6-1.4-13.3 1.8L35.2 43.1 14.8 27.6c-3.1-2.4-7.5-2-10.2.9-2.7 2.9-2.7 7.4 0 10.3l18 13.8L4.6 66.4c-2.7 2.9-2.7 7.4 0 10.3 2.7 2.9 7.1 3.3 10.2.9l20.4-15.5 44.2 42c3.7 3.2 8.9 3.9 13.3 1.6z" />
          <path fill="#007ACC" d="M92.7 125.7l29-14.1c3.9-1.9 6.3-5.8 6.3-10.1V26.5c0-4.3-2.4-8.2-6.3-10.1l-29-14.1c-2.5-1.2-5.3-1.4-7.9-.6l-4.5 3.9 19.3 18.5V104l-19.3 18.5 4.5 3.9c2.6.8 5.4.6 7.9-.7z" />
          <path fill="#1F9CF0" d="M99.6 103.9V24.1L51.8 64l47.8 39.9z" />
        </svg>
      );

    case 'jupyternotebook':
    case 'jupyter':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <path fill="#F37626" d="M64 12c-28 0-51 9-51 20s23 20 51 20 51-9 51-20-23-20-51-20z" opacity="0.8" />
          <path fill="#F37626" d="M64 76c-28 0-51 9-51 20s23 20 51 20 51-9 51-20-23-20-51-20z" opacity="0.8" />
          <circle cx="30" cy="64" r="8" fill="#4E4E4E" />
          <circle cx="98" cy="64" r="8" fill="#4E4E4E" />
          <circle cx="64" cy="64" r="9" fill="#F37626" />
        </svg>
      );

    case 'nextjs':
    case 'next':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="60" fill="#000000" />
          <path fill="#FFFFFF" d="M42 36h12v56H42zm32 0h12v28L57 88h-5L84 48V36z" />
          <path fill="url(#nextG)" d="M74 64l18 28h12L86 64z" />
          <defs>
            <linearGradient id="nextG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'supabase':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#1C1C1C" />
          <path fill="#3ECF8E" d="M72 16L24 76h36l-8 36 48-60H64z" />
        </svg>
      );

    case 'restapis':
    case 'api':
    case 'rest':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#0E2238" stroke="#168BFF" strokeWidth="4" />
          <text x="64" y="54" fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="24" fill="#38D9FF" textAnchor="middle">REST</text>
          <text x="64" y="88" fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="24" fill="#FF852E" textAnchor="middle">API</text>
        </svg>
      );

    case 'msexcel':
    case 'excel':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#107C41" />
          <path fill="#FFFFFF" d="M38 35l22 30-22 30h16l14-20 14 20h16L76 65l22-30H82L68 55 54 35z" />
        </svg>
      );

    default:
      // High-tech fallback icon
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="24" fill="#0A1424" stroke="#168BFF" stroke-width="4" />
          <circle cx="64" cy="64" r="30" fill="none" stroke="#38D9FF" stroke-width="4" stroke-dasharray="6 4" />
          <circle cx="64" cy="64" r="8" fill="#FF852E" />
        </svg>
      );
  }
};

