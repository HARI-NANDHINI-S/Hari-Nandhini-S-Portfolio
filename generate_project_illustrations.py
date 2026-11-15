import os

def generate_svg(filepath, svg_body, width=1200, height=750):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    full_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050B16"/>
      <stop offset="50%" stop-color="#0A1424"/>
      <stop offset="100%" stop-color="#07101E"/>
    </linearGradient>
    <linearGradient id="blueCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#168BFF"/>
      <stop offset="100%" stop-color="#38D9FF"/>
    </linearGradient>
    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF852E"/>
      <stop offset="100%" stop-color="#FF5722"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(22, 139, 255, 0.07)" stroke-width="1"/>
      <circle cx="40" cy="40" r="1.2" fill="rgba(56, 217, 255, 0.15)"/>
    </pattern>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Canvas Background -->
  <rect width="{width}" height="{height}" fill="url(#bgGrad)"/>
  <rect width="{width}" height="{height}" fill="url(#grid)"/>

  <!-- Border & Outer Sci-Fi Corners -->
  <rect x="20" y="20" width="{width - 40}" height="{height - 40}" rx="16" fill="none" stroke="rgba(22, 139, 255, 0.25)" stroke-width="1.5"/>
  <path d="M 20 60 L 20 20 L 60 20" fill="none" stroke="#168BFF" stroke-width="3.5"/>
  <path d="M {width - 60} 20 L {width - 20} 20 L {width - 20} 60" fill="none" stroke="#168BFF" stroke-width="3.5"/>
  <path d="M 20 {height - 60} L 20 {height - 20} L 60 {height - 20}" fill="none" stroke="#FF852E" stroke-width="3.5"/>
  <path d="M {width - 60} {height - 20} L {width - 20} {height - 20} L {width - 20} {height - 60}" fill="none" stroke="#FF852E" stroke-width="3.5"/>

  {svg_body}
</svg>'''
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(full_svg)
    print(f"Generated: {filepath}")

def build_all():
    base = "frontend/public/images/projects"
    os.makedirs(base, exist_ok=True)

    # 1. VOXNIRA: Medical AI speech waveform + clinical NLP nodes
    voxnira_body = '''
  <!-- Title Badge -->
  <rect x="50" y="45" width="220" height="32" rx="8" fill="rgba(22, 139, 255, 0.15)" stroke="rgba(56, 217, 255, 0.4)" stroke-width="1.5"/>
  <circle cx="70" cy="61" r="5" fill="#38D9FF"/>
  <text x="85" y="66" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#38D9FF" letter-spacing="1.5">VOXNIRA // MEDICAL AI</text>

  <!-- Radial Medical Waves -->
  <circle cx="600" cy="380" r="280" fill="none" stroke="rgba(22, 139, 255, 0.12)" stroke-width="1.5" stroke-dasharray="6 6"/>
  <circle cx="600" cy="380" r="200" fill="none" stroke="rgba(56, 217, 255, 0.2)" stroke-width="1.5"/>
  <circle cx="600" cy="380" r="120" fill="none" stroke="rgba(255, 133, 46, 0.25)" stroke-width="1.5" stroke-dasharray="4 4"/>

  <!-- Clinical Speech Waveform -->
  <path d="M 150 380 Q 250 320, 320 380 T 450 380 T 520 220 T 560 490 T 600 160 T 640 520 T 680 250 T 750 380 T 880 380 T 1050 380" fill="none" stroke="url(#blueCyanGrad)" stroke-width="4.5" filter="url(#glow)"/>
  <path d="M 150 380 Q 250 340, 320 380 T 450 380 T 520 270 T 560 450 T 600 220 T 640 480 T 680 300 T 750 380 T 880 380 T 1050 380" fill="none" stroke="#FF852E" stroke-width="2" opacity="0.65"/>

  <!-- Multilingual Speech & Medical Nodes -->
  <g transform="translate(600, 380)">
    <!-- Core Hub -->
    <circle cx="0" cy="0" r="38" fill="#0A1424" stroke="#38D9FF" stroke-width="3" filter="url(#glow)"/>
    <path d="M -14 -6 L 0 -20 L 14 -6 L 0 8 Z" fill="#FF852E"/>
    <circle cx="0" cy="18" r="4" fill="#38D9FF"/>

    <!-- Synapse 1: Tamil / Regional NLP -->
    <line x1="-120" y1="-140" x2="-35" y2="-25" stroke="rgba(56, 217, 255, 0.4)" stroke-width="2"/>
    <circle cx="-120" cy="-140" r="28" fill="#0A1424" stroke="#168BFF" stroke-width="2"/>
    <text x="-120" y="-136" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#38D9FF">WHISPER</text>

    <!-- Synapse 2: spaCy NER Extraction -->
    <line x1="140" y1="-130" x2="35" y2="-25" stroke="rgba(56, 217, 255, 0.4)" stroke-width="2"/>
    <circle cx="140" cy="-130" r="28" fill="#0A1424" stroke="#FF852E" stroke-width="2"/>
    <text x="140" y="-126" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#FF852E">CLINICAL</text>

    <!-- Synapse 3: Random Forest Triage Score -->
    <line x1="-140" y1="130" x2="-35" y2="25" stroke="rgba(255, 133, 46, 0.4)" stroke-width="2"/>
    <circle cx="-140" cy="130" r="28" fill="#0A1424" stroke="#FF852E" stroke-width="2"/>
    <text x="-140" y="134" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#FF852E">TRIAGE</text>

    <!-- Synapse 4: Clinician In Loop Verification -->
    <line x1="140" y1="130" x2="35" y2="25" stroke="rgba(56, 217, 255, 0.4)" stroke-width="2"/>
    <circle cx="140" cy="130" r="28" fill="#0A1424" stroke="#38D9FF" stroke-width="2"/>
    <text x="140" y="134" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#38D9FF">VERIFIED</text>
  </g>

  <!-- Bottom Metric Bar -->
  <rect x="50" y="660" width="380" height="42" rx="10" fill="rgba(10, 20, 36, 0.9)" stroke="rgba(22, 139, 255, 0.3)" stroke-width="1"/>
  <text x="70" y="686" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="600" fill="#F4F7FC">Multilingual Patient Voice Triage Assistant</text>
  <text x="390" y="686" font-family="'JetBrains Mono', monospace" font-size="12" fill="#38D9FF">96.4% Acc</text>
'''
    generate_svg(f"{base}/vox-nira-cover.svg", voxnira_body)
    generate_svg(f"{base}/vox-nira-cover.png", voxnira_body)

    # 2. AGRIMIND: Agriculture AI, satellite crop analytics, soil graphs
    agrimind_body = '''
  <rect x="50" y="45" width="220" height="32" rx="8" fill="rgba(46, 204, 113, 0.15)" stroke="rgba(46, 204, 113, 0.4)" stroke-width="1.5"/>
  <circle cx="70" cy="61" r="5" fill="#2ECC71"/>
  <text x="85" y="66" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#2ECC71" letter-spacing="1.5">AGRIMIND // PRECISION AI</text>

  <!-- Satellite Geometric Crop Fields Grid -->
  <g transform="translate(600, 360)">
    <!-- Isometric Field Polygons -->
    <polygon points="0,-160 220,-40 0,80 -220,-40" fill="rgba(22, 139, 255, 0.08)" stroke="#168BFF" stroke-width="2"/>
    <polygon points="0,-70 140,10 0,90 -140,10" fill="rgba(46, 204, 113, 0.14)" stroke="#2ECC71" stroke-width="2.5" filter="url(#subtleGlow)"/>
    <polygon points="0,20 180,120 0,220 -180,120" fill="rgba(255, 133, 46, 0.09)" stroke="#FF852E" stroke-width="2"/>

    <!-- Sensor Nodes & Field Beacons -->
    <circle cx="0" cy="10" r="16" fill="#0A1424" stroke="#2ECC71" stroke-width="3"/>
    <circle cx="0" cy="10" r="6" fill="#2ECC71"/>
    
    <!-- Data Connection Beams -->
    <line x1="0" y1="10" x2="-180" y2="-120" stroke="rgba(56, 217, 255, 0.6)" stroke-width="2" stroke-dasharray="4 4"/>
    <line x1="0" y1="10" x2="180" y2="-120" stroke="rgba(46, 204, 113, 0.6)" stroke-width="2" stroke-dasharray="4 4"/>
    <line x1="0" y1="10" x2="0" y2="-180" stroke="rgba(255, 133, 46, 0.7)" stroke-width="2"/>

    <!-- Floating Metric Cards -->
    <g transform="translate(-240, -140)">
      <rect width="130" height="50" rx="8" fill="#0A1424" stroke="#168BFF" stroke-width="1.5"/>
      <text x="15" y="22" font-family="'JetBrains Mono', monospace" font-size="10" fill="#9BAAC0">SOIL N-P-K</text>
      <text x="15" y="38" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#38D9FF">Optimal: 84%</text>
    </g>

    <g transform="translate(140, -140)">
      <rect width="140" height="50" rx="8" fill="#0A1424" stroke="#2ECC71" stroke-width="1.5"/>
      <text x="15" y="22" font-family="'JetBrains Mono', monospace" font-size="10" fill="#9BAAC0">RECOMMENDATION</text>
      <text x="15" y="38" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#2ECC71">Rice / Paddy</text>
    </g>
  </g>

  <!-- Bottom Metric Bar -->
  <rect x="50" y="660" width="410" height="42" rx="10" fill="rgba(10, 20, 36, 0.9)" stroke="rgba(46, 204, 113, 0.4)" stroke-width="1"/>
  <text x="70" y="686" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="600" fill="#F4F7FC">AI Agricultural Decision Support Platform</text>
  <text x="400" y="686" font-family="'JetBrains Mono', monospace" font-size="12" fill="#2ECC71">Yield +28%</text>
'''
    generate_svg(f"{base}/agri-mind-cover.svg", agrimind_body)
    generate_svg(f"{base}/agri-mind-cover.png", agrimind_body)

    # 3. LAND-IQ: Land deed digitization, OCR scanner, GIS maps
    landiq_body = '''
  <rect x="50" y="45" width="220" height="32" rx="8" fill="rgba(22, 139, 255, 0.15)" stroke="rgba(22, 139, 255, 0.4)" stroke-width="1.5"/>
  <circle cx="70" cy="61" r="5" fill="#168BFF"/>
  <text x="85" y="66" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#38D9FF" letter-spacing="1.5">LAND-IQ // OCR &amp; GIS</text>

  <!-- Central Digital Deed & GIS Layer -->
  <g transform="translate(380, 200)">
    <!-- Document Stack -->
    <rect x="-80" y="0" width="260" height="340" rx="14" fill="#0A1424" stroke="rgba(22, 139, 255, 0.3)" stroke-width="2"/>
    <rect x="-60" y="-15" width="260" height="340" rx="14" fill="#0D1A30" stroke="#168BFF" stroke-width="2" filter="url(#subtleGlow)"/>

    <!-- Document Content Lines -->
    <line x1="-30" y1="25" x2="160" y2="25" stroke="#38D9FF" stroke-width="4"/>
    <line x1="-30" y1="55" x2="120" y2="55" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <line x1="-30" y1="75" x2="140" y2="75" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    <line x1="-30" y1="95" x2="100" y2="95" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    <line x1="-30" y1="125" x2="150" y2="125" stroke="rgba(255, 133, 46, 0.7)" stroke-width="2"/>

    <!-- Glowing Green Verification Stamp -->
    <circle cx="130" cy="240" r="32" fill="none" stroke="#2ECC71" stroke-width="2.5" stroke-dasharray="4 2"/>
    <path d="M 120 240 L 128 248 L 144 232" fill="none" stroke="#2ECC71" stroke-width="3"/>

    <!-- Red Laser OCR Scanning Line -->
    <line x1="-70" y1="140" x2="210" y2="140" stroke="#FF852E" stroke-width="3" filter="url(#glow)"/>
    <polygon points="-70,140 -50,135 -50,145" fill="#FF852E"/>
    <polygon points="210,140 190,135 190,145" fill="#FF852E"/>
  </g>

  <!-- GIS Geospatial Parcel Polygon (Right Side) -->
  <g transform="translate(860, 360)">
    <!-- Hexagonal Geospatial Grid -->
    <polygon points="0,-130 110,-60 110,60 0,130 -110,60 -110,-60" fill="rgba(56, 217, 255, 0.08)" stroke="#38D9FF" stroke-width="2"/>
    <polygon points="-20,-50 60,-20 40,70 -60,40" fill="rgba(255, 133, 46, 0.2)" stroke="#FF852E" stroke-width="2.5"/>

    <!-- Location Pin -->
    <circle cx="10" cy="10" r="10" fill="#FF852E" filter="url(#glow)"/>
    <circle cx="10" cy="10" r="4" fill="#FFFFFF"/>
    
    <text x="0" y="160" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" fill="#38D9FF">PARCEL ID: TN-CBE-4891</text>
  </g>

  <!-- Connecting Beam between Document and GIS -->
  <path d="M 580 340 C 680 340, 720 370, 750 370" fill="none" stroke="#38D9FF" stroke-width="2.5" stroke-dasharray="6 4" filter="url(#subtleGlow)"/>

  <!-- Bottom Metric Bar -->
  <rect x="50" y="660" width="410" height="42" rx="10" fill="rgba(10, 20, 36, 0.9)" stroke="rgba(22, 139, 255, 0.3)" stroke-width="1"/>
  <text x="70" y="686" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="600" fill="#F4F7FC">Intelligent Land Record Digitization &amp; GIS Validation</text>
'''
    generate_svg(f"{base}/land-iq-cover.svg", landiq_body)
    generate_svg(f"{base}/land-iq-cover.png", landiq_body)

    # 4. NEXARA AI: AI Analytics Platform with floating charts & predictive graphs
    nexara_body = '''
  <rect x="50" y="45" width="220" height="32" rx="8" fill="rgba(255, 133, 46, 0.15)" stroke="rgba(255, 133, 46, 0.4)" stroke-width="1.5"/>
  <circle cx="70" cy="61" r="5" fill="#FF852E"/>
  <text x="85" y="66" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#FF852E" letter-spacing="1.5">NEXARA // ANALYTICS AI</text>

  <!-- Floating Analytics Panels -->
  <!-- Panel 1: Bar Chart -->
  <g transform="translate(180, 220)">
    <rect width="260" height="200" rx="14" fill="#0A1424" stroke="#168BFF" stroke-width="2" filter="url(#subtleGlow)"/>
    <text x="20" y="32" font-family="'JetBrains Mono', monospace" font-size="11" fill="#38D9FF">DISTRIBUTION METRICS</text>
    <!-- Bars -->
    <rect x="30" y="110" width="24" height="60" rx="4" fill="#168BFF"/>
    <rect x="68" y="80" width="24" height="90" rx="4" fill="#38D9FF"/>
    <rect x="106" y="50" width="24" height="120" rx="4" fill="#FF852E"/>
    <rect x="144" y="90" width="24" height="80" rx="4" fill="#168BFF"/>
    <rect x="182" y="70" width="24" height="100" rx="4" fill="#38D9FF"/>
  </g>

  <!-- Panel 2: Predictive Curve with Anomaly Points -->
  <g transform="translate(500, 180)">
    <rect width="360" height="240" rx="16" fill="#0D192E" stroke="#38D9FF" stroke-width="2.5" filter="url(#glow)"/>
    <text x="25" y="34" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#FFFFFF">PREDICTIVE TREND REGRESSION</text>

    <!-- Regression Line -->
    <path d="M 40 180 Q 120 160, 180 110 T 320 60" fill="none" stroke="#FF852E" stroke-width="3.5"/>
    <path d="M 40 180 Q 120 160, 180 110 T 320 60 L 320 200 L 40 200 Z" fill="rgba(255, 133, 46, 0.08)"/>

    <!-- Data Points -->
    <circle cx="70" cy="170" r="5" fill="#38D9FF"/>
    <circle cx="110" cy="155" r="5" fill="#38D9FF"/>
    <circle cx="160" cy="125" r="5" fill="#38D9FF"/>
    <circle cx="210" cy="98" r="5" fill="#38D9FF"/>
    <circle cx="270" cy="78" r="5" fill="#38D9FF"/>
    
    <!-- Anomaly Point Flagged -->
    <circle cx="230" cy="50" r="8" fill="#FF5722" filter="url(#glow)"/>
    <text x="245" y="54" font-family="'JetBrains Mono', monospace" font-size="10" fill="#FF852E">ANOMALY [0.98]</text>
  </g>

  <!-- Panel 3: Correlation Matrix Gauge (Right) -->
  <g transform="translate(900, 240)">
    <rect width="200" height="180" rx="14" fill="#0A1424" stroke="#FF852E" stroke-width="1.5"/>
    <circle cx="100" cy="95" r="50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="8"/>
    <circle cx="100" cy="95" r="50" fill="none" stroke="#38D9FF" stroke-width="8" stroke-dasharray="240 80"/>
    <text x="100" y="100" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="700" fill="#FFFFFF">94.8%</text>
    <text x="100" y="155" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#9BAAC0">CONFIDENCE</text>
  </g>

  <!-- Bottom Metric Bar -->
  <rect x="50" y="660" width="410" height="42" rx="10" fill="rgba(10, 20, 36, 0.9)" stroke="rgba(255, 133, 46, 0.4)" stroke-width="1"/>
  <text x="70" y="686" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="600" fill="#F4F7FC">Intelligent AI Analytics &amp; Forecasting Suite</text>
'''
    generate_svg(f"{base}/nexara-ai-cover.svg", nexara_body)
    generate_svg(f"{base}/nexara-ai-cover.png", nexara_body)

    # 5. DETECTIVE GAME: Mystery investigation, clues, evidence connections
    detective_body = '''
  <rect x="50" y="45" width="240" height="32" rx="8" fill="rgba(255, 133, 46, 0.15)" stroke="rgba(255, 133, 46, 0.4)" stroke-width="1.5"/>
  <circle cx="70" cy="61" r="5" fill="#FF852E"/>
  <text x="85" y="66" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#FF852E" letter-spacing="1.5">DETECTIVE // DEDUCTION GAME</text>

  <!-- Cork Investigation Board Elements -->
  <g transform="translate(600, 350)">
    <!-- Red Yarn Connecting Clues -->
    <line x1="-280" y1="-100" x2="0" y2="0" stroke="#FF5722" stroke-width="2.5" filter="url(#glow)"/>
    <line x1="0" y1="0" x2="260" y2="-110" stroke="#FF5722" stroke-width="2.5" filter="url(#glow)"/>
    <line x1="-280" y1="-100" x2="-120" y2="140" stroke="#FF852E" stroke-width="2" stroke-dasharray="6 3"/>
    <line x1="0" y1="0" x2="160" y2="130" stroke="#FF852E" stroke-width="2" stroke-dasharray="6 3"/>

    <!-- Clue 1: Suspect Dossier (Top Left) -->
    <g transform="translate(-340, -160)">
      <rect width="140" height="130" rx="8" fill="#0A1424" stroke="#168BFF" stroke-width="2"/>
      <circle cx="70" cy="45" r="22" fill="#1A2E4C"/>
      <rect x="25" y="78" width="90" height="8" rx="2" fill="#38D9FF"/>
      <text x="70" y="105" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9" fill="#9BAAC0">SUSPECT ALIBI</text>
      <!-- Pushpin -->
      <circle cx="70" cy="5" r="5" fill="#FF5722"/>
    </g>

    <!-- Center Hub: Magnifying Glass / Clue Focus -->
    <g transform="translate(0, 0)">
      <!-- Outer Glass Ring -->
      <circle cx="0" cy="0" r="64" fill="rgba(10, 20, 36, 0.9)" stroke="#38D9FF" stroke-width="4" filter="url(#glow)"/>
      <line x1="45" y1="45" x2="105" y2="105" stroke="#38D9FF" stroke-width="7" stroke-linecap="round"/>
      <!-- Crosshairs -->
      <line x1="-30" y1="0" x2="30" y2="0" stroke="#FF852E" stroke-width="2"/>
      <line x1="0" y1="-30" x2="0" y2="30" stroke="#FF852E" stroke-width="2"/>
      <circle cx="0" cy="0" r="10" fill="none" stroke="#FF852E" stroke-width="2"/>
    </g>

    <!-- Clue 2: Cipher / Evidence File (Top Right) -->
    <g transform="translate(200, -170)">
      <rect width="140" height="130" rx="8" fill="#0A1424" stroke="#38D9FF" stroke-width="2"/>
      <text x="15" y="30" font-family="'JetBrains Mono', monospace" font-size="10" fill="#38D9FF">CIPHER KEY</text>
      <line x1="15" y1="45" x2="120" y2="45" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
      <line x1="15" y1="65" x2="100" y2="65" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
      <text x="70" y="105" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9" fill="#2ECC71">MATCH FOUND</text>
      <circle cx="70" cy="5" r="5" fill="#FF5722"/>
    </g>

    <!-- Clue 3: Footprint / Timestamp (Bottom Left) -->
    <g transform="translate(-190, 80)">
      <rect width="130" height="100" rx="8" fill="#0A1424" stroke="#FF852E" stroke-width="1.5"/>
      <text x="65" y="35" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#FF852E">TIMESTAMPS</text>
      <text x="65" y="65" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#FFFFFF">23:42:10</text>
    </g>

    <!-- Clue 4: Solved Verdict (Bottom Right) -->
    <g transform="translate(100, 80)">
      <rect width="130" height="100" rx="8" fill="#0A1424" stroke="#2ECC71" stroke-width="1.5"/>
      <text x="65" y="35" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#2ECC71">CASE STATUS</text>
      <text x="65" y="65" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#2ECC71">SOLVED</text>
    </g>
  </g>

  <!-- Bottom Metric Bar -->
  <rect x="50" y="660" width="410" height="42" rx="10" fill="rgba(10, 20, 36, 0.9)" stroke="rgba(255, 133, 46, 0.4)" stroke-width="1"/>
  <text x="70" y="686" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="600" fill="#F4F7FC">Interactive Mystery &amp; Clue Deduction Engine</text>
'''
    generate_svg(f"{base}/detective-game-cover.svg", detective_body)
    generate_svg(f"{base}/detective-game-cover.png", detective_body)

    # 6. SMART BANKING: Secure transaction ledger, encrypted vault
    banking_body = '''
  <rect x="50" y="45" width="220" height="32" rx="8" fill="rgba(22, 139, 255, 0.15)" stroke="rgba(22, 139, 255, 0.4)" stroke-width="1.5"/>
  <circle cx="70" cy="61" r="5" fill="#38D9FF"/>
  <text x="85" y="66" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#38D9FF" letter-spacing="1.5">SMART BANKING // LEDGER</text>

  <!-- Central Vault & Block Flow -->
  <g transform="translate(600, 360)">
    <!-- Encrypted Vault Safe Geometry -->
    <circle cx="0" cy="0" r="140" fill="#0A1424" stroke="#168BFF" stroke-width="3" filter="url(#glow)"/>
    <circle cx="0" cy="0" r="110" fill="none" stroke="rgba(56, 217, 255, 0.3)" stroke-width="2" stroke-dasharray="10 5"/>
    <circle cx="0" cy="0" r="70" fill="#0D1A30" stroke="#FF852E" stroke-width="2"/>

    <!-- Keyhole & Shield Icon -->
    <path d="M -16 -20 L 16 -20 L 22 10 L 0 35 L -22 10 Z" fill="none" stroke="#38D9FF" stroke-width="3"/>
    <circle cx="0" cy="-2" r="5" fill="#FF852E"/>

    <!-- Transaction Stream Curves (Left to Right) -->
    <path d="M -420 -80 C -250 -80, -200 0, -140 0" fill="none" stroke="#38D9FF" stroke-width="3" stroke-dasharray="6 4" filter="url(#subtleGlow)"/>
    <path d="M 140 0 C 200 0, 250 80, 420 80" fill="none" stroke="#2ECC71" stroke-width="3" stroke-dasharray="6 4" filter="url(#subtleGlow)"/>

    <!-- Left Transaction Block -->
    <g transform="translate(-460, -120)">
      <rect width="180" height="75" rx="10" fill="#0A1424" stroke="#168BFF" stroke-width="1.5"/>
      <text x="15" y="28" font-family="'JetBrains Mono', monospace" font-size="10" fill="#9BAAC0">TRANSFER REQUEST</text>
      <text x="15" y="52" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">$4,850.00</text>
    </g>

    <!-- Right Validated Block -->
    <g transform="translate(280, 50)">
      <rect width="180" height="75" rx="10" fill="#0A1424" stroke="#2ECC71" stroke-width="1.5"/>
      <text x="15" y="28" font-family="'JetBrains Mono', monospace" font-size="10" fill="#2ECC71">LEDGER COMMITTED</text>
      <text x="15" y="52" font-family="'Space Grotesk', sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">HASH: 7a8f...21c</text>
    </g>
  </g>

  <!-- Bottom Metric Bar -->
  <rect x="50" y="660" width="410" height="42" rx="10" fill="rgba(10, 20, 36, 0.9)" stroke="rgba(22, 139, 255, 0.3)" stroke-width="1"/>
  <text x="70" y="686" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="600" fill="#F4F7FC">ACID Compliant Transaction Ledger &amp; Security</text>
'''
    generate_svg(f"{base}/smart-banking-cover.svg", banking_body)
    generate_svg(f"{base}/smart-banking-cover.png", banking_body)

    # 7. AI VOICE CUSTOMER CARE AGENT
    voice_body = '''
  <rect x="50" y="45" width="240" height="32" rx="8" fill="rgba(56, 217, 255, 0.15)" stroke="rgba(56, 217, 255, 0.4)" stroke-width="1.5"/>
  <circle cx="70" cy="61" r="5" fill="#38D9FF"/>
  <text x="85" y="66" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#38D9FF" letter-spacing="1.5">ENTERPRISE VOICE AGENT</text>

  <!-- Conversational Audio Waveform & Intent Dispatcher -->
  <g transform="translate(600, 360)">
    <!-- Audio Waveform Bars -->
    <g transform="translate(-200, -80)">
      <rect x="0" y="30" width="6" height="40" rx="3" fill="#168BFF"/>
      <rect x="14" y="10" width="6" height="80" rx="3" fill="#38D9FF"/>
      <rect x="28" y="0" width="6" height="100" rx="3" fill="#38D9FF" filter="url(#glow)"/>
      <rect x="42" y="20" width="6" height="60" rx="3" fill="#FF852E"/>
      <rect x="56" y="35" width="6" height="30" rx="3" fill="#168BFF"/>
      <rect x="70" y="15" width="6" height="70" rx="3" fill="#38D9FF"/>
      <rect x="84" y="40" width="6" height="20" rx="3" fill="#168BFF"/>
    </g>

    <!-- Dialog Intent Nodes -->
    <circle cx="0" cy="0" r="45" fill="#0A1424" stroke="#38D9FF" stroke-width="3" filter="url(#glow)"/>
    <text x="0" y="5" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#FFFFFF">INTENT AI</text>

    <!-- Outward branches to CRM, FAQ, Ticketing -->
    <line x1="35" y1="-25" x2="160" y2="-90" stroke="#FF852E" stroke-width="2.5"/>
    <line x1="45" y1="0" x2="200" y2="0" stroke="#38D9FF" stroke-width="2.5"/>
    <line x1="35" y1="25" x2="160" y2="90" stroke="#2ECC71" stroke-width="2.5"/>

    <g transform="translate(170, -115)">
      <rect width="130" height="45" rx="8" fill="#0A1424" stroke="#FF852E" stroke-width="1.5"/>
      <text x="15" y="27" font-family="'JetBrains Mono', monospace" font-size="11" fill="#FF852E">CRM ROUTE</text>
    </g>
    <g transform="translate(210, -22)">
      <rect width="130" height="45" rx="8" fill="#0A1424" stroke="#38D9FF" stroke-width="1.5"/>
      <text x="15" y="27" font-family="'JetBrains Mono', monospace" font-size="11" fill="#38D9FF">KNOWLEDGE</text>
    </g>
    <g transform="translate(170, 70)">
      <rect width="130" height="45" rx="8" fill="#0A1424" stroke="#2ECC71" stroke-width="1.5"/>
      <text x="15" y="27" font-family="'JetBrains Mono', monospace" font-size="11" fill="#2ECC71">AUTO RESOLVE</text>
    </g>
  </g>

  <!-- Bottom Metric Bar -->
  <rect x="50" y="660" width="410" height="42" rx="10" fill="rgba(10, 20, 36, 0.9)" stroke="rgba(56, 217, 255, 0.3)" stroke-width="1"/>
  <text x="70" y="686" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="600" fill="#F4F7FC">Enterprise Real-Time Speech &amp; Intent Routing</text>
'''
    generate_svg(f"{base}/ai-voice-agent-cover.svg", voice_body)
    generate_svg(f"{base}/ai-voice-agent-cover.png", voice_body)

    # 8. CREDIT CARD FRAUD DETECTION
    fraud_body = '''
  <rect x="50" y="45" width="240" height="32" rx="8" fill="rgba(255, 87, 34, 0.15)" stroke="rgba(255, 87, 34, 0.4)" stroke-width="1.5"/>
  <circle cx="70" cy="61" r="5" fill="#FF5722"/>
  <text x="85" y="66" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#FF5722" letter-spacing="1.5">FRAUD RISK // SMOTE ML</text>

  <!-- Decision Boundary & Scatter Clustering -->
  <g transform="translate(600, 350)">
    <!-- Boundary Grid Box -->
    <rect x="-240" y="-150" width="480" height="300" rx="16" fill="#0A1424" stroke="#168BFF" stroke-width="2"/>
    
    <!-- Non-Linear Decision Boundary Surface -->
    <path d="M -240 50 Q -100 -50, 0 10 T 240 -90" fill="none" stroke="#FF852E" stroke-width="3" stroke-dasharray="6 4" filter="url(#glow)"/>
    <path d="M -240 50 Q -100 -50, 0 10 T 240 -90 L 240 150 L -240 150 Z" fill="rgba(22, 139, 255, 0.08)"/>

    <!-- Majority Normal Transactions (Cyan Dots) -->
    <g fill="#38D9FF" opacity="0.6">
      <circle cx="-180" cy="90" r="4"/>
      <circle cx="-140" cy="70" r="4"/>
      <circle cx="-160" cy="110" r="4"/>
      <circle cx="-80" cy="60" r="4"/>
      <circle cx="-60" cy="100" r="4"/>
      <circle cx="20" cy="80" r="4"/>
      <circle cx="60" cy="120" r="4"/>
      <circle cx="120" cy="60" r="4"/>
      <circle cx="160" cy="100" r="4"/>
    </g>

    <!-- Synthetic SMOTE Samples & Rare Fraud Points (Red/Orange) -->
    <g fill="#FF5722" filter="url(#glow)">
      <circle cx="-120" cy="-90" r="7"/>
      <circle cx="-70" cy="-80" r="7"/>
      <circle cx="30" cy="-60" r="7"/>
      <circle cx="140" cy="-110" r="8"/>
    </g>
    <text x="140" y="-125" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" fill="#FF5722">FRAUD [0.17% BASE RATE]</text>

    <!-- Precision-Recall Badge -->
    <g transform="translate(-210, -125)">
      <rect width="140" height="35" rx="6" fill="#0D1A30" stroke="#38D9FF" stroke-width="1"/>
      <text x="10" y="22" font-family="'JetBrains Mono', monospace" font-size="10" fill="#38D9FF">PR-AUC: 0.912</text>
    </g>
  </g>

  <!-- Bottom Metric Bar -->
  <rect x="50" y="660" width="410" height="42" rx="10" fill="rgba(10, 20, 36, 0.9)" stroke="rgba(255, 87, 34, 0.4)" stroke-width="1"/>
  <text x="70" y="686" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="600" fill="#F4F7FC">Imbalanced Learning &amp; Risk Scoring Engine</text>
'''
    generate_svg(f"{base}/fraud-detection-cover.svg", fraud_body)
    generate_svg(f"{base}/fraud-detection-cover.png", fraud_body)

    print("All project-specific illustrations generated successfully!")

if __name__ == "__main__":
    build_all()

