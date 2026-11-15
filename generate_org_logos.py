import os

def create_svg(path, content, width=400, height=400):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">
{content}
</svg>''')
    print(f"Generated logo: {path}")

def main():
    exp_dir = "frontend/public/images/experience"
    edu_dir = "frontend/public/images/education"

    # 1. 403 STRATS: "403 Forbidden Strategists" - CIT Technical Club
    strats_svg = '''
  <defs>
    <linearGradient id="stratsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#168BFF"/>
      <stop offset="50%" stop-color="#38D9FF"/>
      <stop offset="100%" stop-color="#FF852E"/>
    </linearGradient>
    <filter id="stratsGlow">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="400" height="400" rx="40" fill="#050B16"/>
  <!-- Cyber Hexagonal Shield -->
  <polygon points="200,35 340,115 340,285 200,365 60,285 60,115" fill="#0A1424" stroke="url(#stratsGrad)" stroke-width="5" filter="url(#stratsGlow)"/>
  
  <!-- Terminal Prompt Slash -->
  <text x="200" y="195" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="76" font-weight="900" fill="#F4F7FC" letter-spacing="-2">403</text>
  
  <rect x="110" y="225" width="180" height="30" rx="6" fill="#168BFF"/>
  <text x="200" y="246" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="800" fill="#FFFFFF" letter-spacing="3">STRATS</text>
  
  <text x="200" y="285" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#38D9FF" letter-spacing="1">FORBIDDEN STRATEGISTS</text>
  <text x="200" y="325" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10" font-weight="600" fill="#9BAAC0">CIT COIMBATORE</text>
'''
    create_svg(f"{exp_dir}/403-strats-logo.svg", strats_svg)
    create_svg(f"{exp_dir}/403-strats-logo.png", strats_svg)

    # 2. STUDIO 3 INTERACTIVE: Digital Agency in Coimbatore
    studio3_svg = '''
  <defs>
    <linearGradient id="s3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF852E"/>
      <stop offset="100%" stop-color="#38D9FF"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="40" fill="#0A1424"/>
  <rect x="25" y="25" width="350" height="350" rx="30" fill="none" stroke="rgba(255, 133, 46, 0.4)" stroke-width="3"/>

  <!-- Geometric Modern '3' Logo Monogram -->
  <g transform="translate(200, 170)">
    <circle cx="0" cy="0" r="75" fill="none" stroke="url(#s3Grad)" stroke-width="8"/>
    <!-- Central S3 stylized glyph -->
    <path d="M -30 -35 L 30 -35 L 30 -5 L -5 -5 L 30 15 L 30 35 L -30 35" fill="none" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <text x="200" y="285" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" font-weight="800" fill="#F4F7FC" letter-spacing="2">STUDIO 3</text>
  <text x="200" y="315" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" fill="#38D9FF" letter-spacing="4">INTERACTIVE</text>
'''
    create_svg(f"{exp_dir}/studio3-logo.svg", studio3_svg)
    create_svg(f"{exp_dir}/studio3-logo.png", studio3_svg)

    # 3. CIT (COIMBATORE INSTITUTE OF TECHNOLOGY) Crest Emblem
    cit_svg = '''
  <defs>
    <linearGradient id="citGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#168BFF"/>
      <stop offset="100%" stop-color="#0052CC"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="40" fill="#050B16"/>
  
  <!-- Outer Seal Ring -->
  <circle cx="200" cy="200" r="165" fill="#0A1424" stroke="#168BFF" stroke-width="4"/>
  <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(56, 217, 255, 0.4)" stroke-width="1.5" stroke-dasharray="8 4"/>

  <!-- Cogwheel Gear (Engineering) -->
  <g transform="translate(200, 175)">
    <circle cx="0" cy="0" r="55" fill="#0D1E3A" stroke="#38D9FF" stroke-width="3"/>
    <!-- Gear teeth -->
    <rect x="-8" y="-70" width="16" height="20" fill="#38D9FF" rx="3"/>
    <rect x="-8" y="50" width="16" height="20" fill="#38D9FF" rx="3"/>
    <rect x="-70" y="-8" width="20" height="16" fill="#38D9FF" rx="3"/>
    <rect x="50" y="-8" width="20" height="16" fill="#38D9FF" rx="3"/>
    <!-- Lamp of Knowledge / Flame -->
    <path d="M 0 -25 C -15 -5, -20 15, 0 30 C 20 15, 15 -5, 0 -25 Z" fill="#FF852E"/>
    <circle cx="0" cy="5" r="7" fill="#FFF275"/>
  </g>

  <!-- CIT Typography Banner -->
  <rect x="80" y="260" width="240" height="34" rx="8" fill="#168BFF"/>
  <text x="200" y="284" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" letter-spacing="4">C I T</text>

  <text x="200" y="325" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="700" fill="#F4F7FC">COIMBATORE INSTITUTE</text>
  <text x="200" y="342" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="600" fill="#9BAAC0">OF TECHNOLOGY • ESTD 1956</text>
'''
    create_svg(f"{edu_dir}/cit-logo.svg", cit_svg)
    create_svg(f"{edu_dir}/cit-logo.png", cit_svg)

    # 4. G.K.D. MATRICULATION HIGHER SECONDARY SCHOOL
    gkd_svg = '''
  <defs>
    <linearGradient id="gkdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF852E"/>
      <stop offset="100%" stop-color="#E65100"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="40" fill="#050B16"/>
  <circle cx="200" cy="200" r="165" fill="#0A1424" stroke="#FF852E" stroke-width="4"/>
  <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(255, 133, 46, 0.3)" stroke-width="1.5" stroke-dasharray="6 4"/>

  <!-- Academic Shield & Open Book -->
  <g transform="translate(200, 165)">
    <polygon points="0,-60 55,-35 45,35 0,65 -45,35 -55,-35" fill="#0D1A30" stroke="#FF852E" stroke-width="3"/>
    <!-- Open Book -->
    <path d="M -30 5 Q 0 -10, 0 15 Q 0 -10, 30 5 L 30 25 Q 0 10, 0 35 Q 0 10, -30 25 Z" fill="#FFFFFF"/>
    <!-- Academic Torch -->
    <circle cx="0" cy="-20" r="6" fill="#38D9FF"/>
  </g>

  <!-- Banner & Institution Name -->
  <rect x="75" y="258" width="250" height="32" rx="8" fill="#FF852E"/>
  <text x="200" y="280" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="800" fill="#FFFFFF" letter-spacing="2">G.K.D. MATRIC HSS</text>
  <text x="200" y="320" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="600" fill="#F4F7FC">PERIANAICKENPALAYAM</text>
  <text x="200" y="338" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" fill="#9BAAC0">COIMBATORE</text>
'''
    create_svg(f"{edu_dir}/gkd-logo.svg", gkd_svg)
    create_svg(f"{edu_dir}/gkd-logo.png", gkd_svg)

    print("All organization and institutional logos created!")

if __name__ == "__main__":
    main()

