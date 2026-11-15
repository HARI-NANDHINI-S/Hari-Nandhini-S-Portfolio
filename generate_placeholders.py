import os

def create_svg_placeholder(filepath, title, category, subtitle, primary_color="#168BFF", secondary_color="#FF852E", width=800, height=500):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050B16"/>
      <stop offset="50%" stop-color="#0A1424"/>
      <stop offset="100%" stop-color="#0E1D33"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="{primary_color}"/>
      <stop offset="100%" stop-color="{secondary_color}"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(22, 139, 255, 0.08)" stroke-width="1"/>
      <circle cx="40" cy="40" r="1.5" fill="rgba(56, 217, 255, 0.2)"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="{width}" height="{height}" fill="url(#bgGrad)"/>
  <rect width="{width}" height="{height}" fill="url(#grid)"/>

  <!-- Border Frame -->
  <rect x="15" y="15" width="{width - 30}" height="{height - 30}" rx="12" fill="none" stroke="rgba(22, 139, 255, 0.3)" stroke-width="1.5"/>
  <line x1="15" y1="45" x2="120" y2="15" stroke="{secondary_color}" stroke-width="2" opacity="0.6"/>

  <!-- Corner Brackets -->
  <path d="M 15 45 L 15 15 L 45 15" fill="none" stroke="{primary_color}" stroke-width="3"/>
  <path d="M {width - 45} 15 L {width - 15} 15 L {width - 15} 45" fill="none" stroke="{primary_color}" stroke-width="3"/>
  <path d="M 15 {height - 45} L 15 {height - 15} L 45 {height - 15}" fill="none" stroke="{secondary_color}" stroke-width="3"/>
  <path d="M {width - 45} {height - 15} L {width - 15} {height - 15} L {width - 15} {height - 45}" fill="none" stroke="{secondary_color}" stroke-width="3"/>

  <!-- Top Badge -->
  <rect x="35" y="32" width="130" height="24" rx="4" fill="rgba(22, 139, 255, 0.15)" stroke="rgba(56, 217, 255, 0.4)" stroke-width="1"/>
  <circle cx="47" cy="44" r="4" fill="{secondary_color}"/>
  <text x="58" y="48" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="#38D9FF" letter-spacing="1">{category.upper()}</text>

  <!-- Center Icon Graphic -->
  <g transform="translate({width // 2}, {height // 2 - 40})">
    <circle cx="0" cy="0" r="48" fill="rgba(22, 139, 255, 0.08)" stroke="rgba(56, 217, 255, 0.3)" stroke-width="1.5" stroke-dasharray="4 4"/>
    <circle cx="0" cy="0" r="32" fill="rgba(10, 20, 36, 0.8)" stroke="{primary_color}" stroke-width="2"/>
    <polygon points="0,-16 14,8 -14,8" fill="none" stroke="{secondary_color}" stroke-width="2"/>
    <circle cx="0" cy="-2" r="3" fill="#38D9FF"/>
  </g>

  <!-- Main Title -->
  <text x="{width // 2}" y="{height // 2 + 50}" text-anchor="middle" font-family="'Space Grotesk', system-ui, sans-serif" font-size="24" font-weight="700" fill="#F4F7FC" letter-spacing="0.5">{title}</text>

  <!-- Subtitle -->
  <text x="{width // 2}" y="{height // 2 + 78}" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" fill="#9BAAC0">{subtitle}</text>

  <!-- Bottom File Indicator -->
  <rect x="{width // 2 - 170}" y="{height - 55}" width="340" height="26" rx="6" fill="rgba(5, 11, 22, 0.85)" stroke="rgba(255, 133, 46, 0.3)" stroke-width="1"/>
  <text x="{width // 2}" y="{height - 38}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#FF852E">REPLACE: {os.path.basename(filepath)}</text>
</svg>'''
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Created placeholder: {filepath}")

def main():
    base = "frontend/public/images"

    # Profile placeholders
    create_svg_placeholder(f"{base}/profile/hari-nandhini-avatar.svg", "HARI NANDHINI S", "PROFILE", "Software Developer & AI/ML Specialist", "#168BFF", "#FF852E", 600, 600)
    create_svg_placeholder(f"{base}/profile/hari-nandhini-avatar.png", "HARI NANDHINI S", "PROFILE", "Upload Profile Photograph", "#168BFF", "#FF852E", 600, 600)

    # Project placeholders
    projects = [
        ("vox-nira-cover.png", "VOXNIRA", "AI / HEALTHCARE", "Multilingual Voice Triage Assistant", "#168BFF", "#38D9FF"),
        ("agri-mind-cover.png", "AGRIMIND", "MACHINE LEARNING", "Agricultural Decision Support System", "#FF852E", "#38D9FF"),
        ("land-iq-cover.png", "LAND-IQ", "FULL STACK / GIS", "Land Record Digitization & Validation", "#168BFF", "#FF852E"),
        ("nexara-ai-cover.png", "NEXARA AI", "DATA ANALYTICS", "Automated Analytics & Prediction Suite", "#38D9FF", "#FF852E"),
        ("detective-game-cover.png", "DETECTIVE GAME", "WEB LOGIC / GAME", "Interactive Clue & Deduction Engine", "#FF852E", "#168BFF"),
        ("smart-banking-cover.png", "SMART BANKING", "SOFTWARE ENGINEERING", "Secure Transaction Ledger & Accounts", "#168BFF", "#38D9FF"),
        ("ai-voice-agent-cover.png", "AI VOICE AGENT", "CONVERSATIONAL AI", "Enterprise Customer Care System", "#38D9FF", "#FF852E"),
        ("fraud-detection-cover.png", "FRAUD DETECTION", "MACHINE LEARNING", "Imbalanced Transaction Risk Classifier", "#FF852E", "#168BFF"),
    ]
    for filename, title, cat, sub, c1, c2 in projects:
        create_svg_placeholder(f"{base}/projects/{filename}", title, cat, sub, c1, c2)

    # Certifications
    certs = [
        ("infosys-generative-ai.png", "INFOSYS SPRINGBOARD", "CERTIFICATE", "Generative AI for All", "#168BFF", "#38D9FF"),
        ("hackerrank-python.png", "HACKERRANK", "CERTIFICATE", "Python (Basics) Problem Solving", "#38D9FF", "#FF852E"),
        ("nptel-machine-learning.png", "NPTEL", "CERTIFICATE", "Introduction to Machine Learning", "#FF852E", "#168BFF"),
    ]
    for filename, title, cat, sub, c1, c2 in certs:
        create_svg_placeholder(f"{base}/certifications/{filename}", title, cat, sub, c1, c2, 800, 560)

    # Achievements
    achievements = [
        ("melinia-pitch-pit.png", "MELINIA '26 - 3RD PLACE", "ACHIEVEMENT", "Pitch Pit at Coimbatore Institute of Tech", "#FF852E", "#38D9FF"),
        ("hackmars-hackathon.png", "HACKMARS HACKATHON", "ACHIEVEMENT", "4th Place Finalist Award", "#168BFF", "#FF852E"),
        ("linux-workshop.png", "LINUX ADMINISTRATION", "WORKSHOP", "Hands-on Kernel & Shell Scripting", "#38D9FF", "#168BFF"),
        ("host-yourself-workshop.png", "HOST YOURSELF 101", "WORKSHOP", "Web Hosting & Cloud Deployment", "#FF852E", "#38D9FF"),
    ]
    for filename, title, cat, sub, c1, c2 in achievements:
        create_svg_placeholder(f"{base}/achievements/{filename}", title, cat, sub, c1, c2, 800, 500)

    # Experience logos
    exp = [
        ("403-strats-logo.png", "403 STRATS", "ORGANIZATION", "Computing & Technical Club", "#168BFF", "#FF852E", 400, 400),
        ("studio3-logo.png", "STUDIO 3 INTERACTIVE", "ORGANIZATION", "Digital Solutions & Web Dev", "#FF852E", "#38D9FF", 400, 400),
    ]
    for filename, title, cat, sub, c1, c2, w, h in exp:
        create_svg_placeholder(f"{base}/experience/{filename}", title, cat, sub, c1, c2, w, h)

    # Education logos
    edu = [
        ("cit-logo.png", "COIMBATORE INSTITUTE OF TECHNOLOGY", "INSTITUTION", "M.Sc. Software Systems", "#168BFF", "#38D9FF", 400, 400),
        ("gkd-logo.png", "G.K.D. MATRICULATION HSS", "INSTITUTION", "HSC (93.67%) & SSLC (91%)", "#FF852E", "#168BFF", 400, 400),
    ]
    for filename, title, cat, sub, c1, c2, w, h in edu:
        create_svg_placeholder(f"{base}/education/{filename}", title, cat, sub, c1, c2, w, h)

if __name__ == "__main__":
    main()
