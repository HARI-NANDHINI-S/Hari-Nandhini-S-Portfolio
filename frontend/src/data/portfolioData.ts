import { Project, Certification, Achievement, Experience } from '../types';

export const PERSONAL_INFO = {
  name: "Hari Nandhini S",
  title: "Software Developer | AI & Data Enthusiast",
  headline: "Building intelligent solutions through software, data and AI.",
  bio: "I'm a Software Systems student at Coimbatore Institute of Technology interested in developing practical applications, exploring intelligent technologies and transforming ideas into functional solutions.",
  email: "harinandhini030506@gmail.com",
  phone: "+91 9003719169",
  location: "Coimbatore, India",
  github: "https://github.com/HARI-NANDHINI-S",
  linkedin: "https://www.linkedin.com/in/hari-nandhini-s-76932a321/",
  portfolioUrl: "https://hari-nandhini-s.github.io/",
  devpost: "https://devpost.com/harinandhini2740",
  resumes: {
    sde: "/assets/documents/resumes/sde-resume.pdf",
    dataAi: "/assets/documents/resumes/data-resume.pdf"
  }
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: "CivicVision AI — Intelligent Civic Issue Detection & Resolution",
    slug: "civicvision-ai",
    category: "Artificial Intelligence",
    short_description: "An AI-powered municipal infrastructure management platform that uses computer vision to detect public infrastructure issues, compute priority, and automate department dispatch.",
    full_description: "CivicVision AI empowers citizens and municipal administrators by applying deep learning (YOLOv8/v11 & OpenCV) to detect 6 public infrastructure defect classes (Potholes, Garbage Accumulation, Waterlogging, Broken Streetlights, Open Manholes, and Road Damage) from uploaded photos. It computes an explainable 0–100 priority score factoring in AI confidence, defect bounding box area ratio, and defect aging, deduplicates nearby reports via Haversine distance calculations (50m radius, 72h window), and tracks resolution history on interactive Leaflet maps.",
    problem_statement: "Municipal authorities face extreme backlogs in identifying civil defects, triaging urgency, eliminating duplicate complaints, and routing issues to the proper engineering departments.",
    solution: "Engineered an end-to-end computer vision and civic governance platform integrating YOLOv8 defect detection, explainable multi-factor priority scoring, Haversine spatial deduplication, and role-based officer/admin dashboards.",
    technologies: ["React 18", "Vite", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "YOLOv8", "OpenCV", "Leaflet", "SQLAlchemy", "SQLite", "PostgreSQL", "JWT"],
    key_features: [
      "AI computer vision defect detection across 6 classes with bounding box overlays & confidence metrics",
      "Explainable 0–100 priority scoring engine factoring category risk, confidence, area ratio & aging",
      "Haversine spatial-temporal deduplication engine (50m radius, 72-hour window)",
      "Automated department routing matrix (Roads & PWD, Sanitation, Electrical, Drainage, Sewerage)",
      "Interactive Leaflet public defect map with category-coded markers and resolution timeline tracking",
      "Role-Based Access Control (RBAC) with tailored portals for Citizens, Admins, and Department Officers"
    ],
    my_contribution: "Designed the computer vision defect detection pipeline, implemented the explainable multi-factor priority scoring algorithm, and built the interactive Leaflet mapping interface.",
    github_url: "https://github.com/HARI-NANDHINI-S/City_Care",
    image_url: "/assets/images/projects/civicvision-cover.png",
    screenshots: ["/assets/images/projects/civicvision-cover.png"],
    featured: true,
    sort_order: 1
  },
  {
    id: 2,
    title: "NetSlice — AI-Assisted 5G/6G Network Slicing & Resource Allocation",
    slug: "netslice",
    category: "Software Development",
    short_description: "An AI-assisted 5G/6G network slicing and resource allocation platform exploring traffic management, physical telemetry, and dynamic token-bucket rate shaping.",
    full_description: "NetSlice simulates and monitors network slicing across URLLC (Ultra-Reliable Low-Latency Communication), eMBB (Enhanced Mobile Broadband), and mMTC (Massive Machine-Type Communication). The platform captures real physical network telemetry, measures round-trip time (RTT) latency, shapes traffic via token-bucket algorithms, benchmarks Random Forest allocations against static baselines, and visualizes real-time metrics through a high-performance React dashboard.",
    problem_statement: "Modern cellular networks require dynamic bandwidth allocation and continuous QoS compliance across heterogeneous traffic classes with competing latency and throughput demands.",
    solution: "Developed an integrated telemetry and allocation testbed utilizing FastAPI, socket-level physical interface monitoring, token-bucket rate shaping, and Scikit-learn predictive bandwidth distribution.",
    technologies: ["Python", "FastAPI", "React 19", "Vite", "SQLite", "Scikit-learn", "Docker", "Socket Programming", "Recharts"],
    key_features: [
      "URLLC, eMBB, and mMTC traffic simulation paired with real physical interface telemetry",
      "Token-bucket rate shaping engine enforcing dynamic bandwidth limits",
      "Machine learning allocation benchmarking comparing Random Forest predictions against static baselines",
      "Real-time physical telemetry console monitoring RTT latency, packet loss & QoS violation events",
      "Context-aware AI network assistance and socket-level packet routing simulation"
    ],
    my_contribution: "Contributed physical network telemetry integration, machine learning model benchmarking scripts, and real-time dashboard telemetry visualization.",
    github_url: "https://github.com/HARI-NANDHINI-S/NetSlice",
    image_url: "/assets/images/projects/netslice-cover.png",
    screenshots: ["/assets/images/projects/netslice-cover.png"],
    featured: true,
    sort_order: 2
  },
  {
    id: 3,
    title: "AgriMind — AI-Powered Agricultural Decision Support Platform",
    slug: "agrimind",
    category: "Machine Learning",
    short_description: "An AI-assisted agricultural decision-support platform combining crop recommendations, plant disease image detection, yield forecasting, and market intelligence.",
    full_description: "AgriMind unifies precision agriculture by analyzing soil nutrient chemistry (N, P, K & pH levels), historical climate records, and regional rainfall to recommend optimal crop varieties, diagnose crop disease symptoms through image classification, predict harvest yields, and track market pricing trends to protect smallholder farm profitability.",
    problem_statement: "Farmers face crop failures and margin degradation caused by unpredictable climate shifts, suboptimal crop-soil matching, and opaque agricultural market pricing.",
    solution: "Built a machine learning decision engine utilizing Scikit-learn and Pandas for soil-climate matching, paired with a FastAPI microservice backend and responsive React analytics portal.",
    technologies: ["Python", "FastAPI", "React", "TypeScript", "Scikit-learn", "Pandas", "NumPy", "Tailwind CSS"],
    key_features: [
      "Precision crop recommendation evaluating soil nutrient chemistry (N, P, K, pH) and rainfall conditions",
      "Plant disease image analysis and crop health diagnostics",
      "Farm & field lifecycle management with multi-season crop history tracking",
      "Predictive harvest yield estimations and market price trend forecasting",
      "Farm financial tracking covering operational expenses, revenues, and risk assessment"
    ],
    my_contribution: "Engineered soil-climate data preprocessing pipelines, trained supervised crop classification models, and developed agricultural analytics dashboards.",
    github_url: "https://github.com/HARI-NANDHINI-S/agri-mind",
    image_url: "/assets/images/projects/agri-mind-cover.png",
    screenshots: ["/assets/images/projects/agri-mind-cover.png"],
    featured: true,
    sort_order: 3
  },
  {
    id: 4,
    title: "Land-IQ — Intelligent Land Record Digitization & Validation",
    slug: "land-iq",
    category: "Software Development",
    short_description: "An intelligent land-record processing system using PaddleOCR and GIS spatial validation to digitize, extract, and verify deed information.",
    full_description: "Land-IQ modernizes property registry governance by transforming legacy deed scans into verified digital entities. The system employs a dedicated self-hosted PaddleOCR extraction microservice, extraction confidence scoring, duplicate deed anomaly detection, and spatial GIS polygon boundary cross-validation using Supabase PostgreSQL.",
    problem_statement: "Manual verification of physical land deeds and survey documents suffers from severe bureaucratic delays, high error rates, and vulnerability to duplicate deed fraud.",
    solution: "Architected a dual-service architecture: a Python FastAPI OCR extraction engine powered by PaddleOCR coupled with a React 19 frontend and Supabase PostgreSQL backend with Row-Level Security and GIS validation.",
    technologies: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "FastAPI", "Python", "PaddleOCR", "Supabase", "PostgreSQL", "GIS", "TanStack Query"],
    key_features: [
      "Dedicated Python PaddleOCR extraction microservice for legacy Tamil Nadu land records (Patta, Chitta, TSLR)",
      "Confidence-aware attribute extraction scoring flagging degraded or low-contrast scans",
      "Duplicate registry detection and ownership anomaly flagging",
      "Spatial GIS boundary cross-validation for land parcel polygons",
      "Human-in-the-loop audit portal with field-level review and document inspection"
    ],
    my_contribution: "Engineered FastAPI backend endpoints, OCR text extraction filtering routines, and Supabase database schemas with spatial verification RPCs.",
    github_url: "https://github.com/HARI-NANDHINI-S/LAND-IQ",
    image_url: "/assets/images/projects/land-iq-cover.png",
    screenshots: ["/assets/images/projects/land-iq-cover.png"],
    featured: true,
    sort_order: 4
  },
  {
    id: 5,
    title: "Sathurangam — C-Based Console Chess Engine",
    slug: "sathurangam",
    category: "Software Development",
    short_description: "A terminal-based chess engine developed in C featuring complete piece movement rules, check and checkmate detection, and timed kingdom turns.",
    full_description: "Developed in close collaboration with Dhanya Shree, Sathurangam is a modular, high-performance chess engine implemented entirely in C. It renders an 8x8 ASCII chessboard directly in the terminal, validates all legal piece movements (Pawn, Rook, Knight, Bishop, Queen, King), enforces turn-based White vs Black kingdom commander rules, tracks timed move constraints, and detects check and checkmate states.",
    problem_statement: "Implementing complete chess game logic in procedural C requires robust 2D board state tracking, complex piece trajectory validation, and recursive check/checkmate condition detection without high-level OOP abstractions.",
    solution: "Designed a clean modular C architecture separating game state, move validation algorithms, terminal ASCII board rendering, and timed turn management.",
    technologies: ["C Programming", "Data Structures", "Game Algorithms", "Terminal UI", "Modular Architecture"],
    key_features: [
      "Complete 8x8 ASCII board representation with legal piece movement validation for all piece types",
      "Dynamic check and checkmate condition detection with game state evaluation",
      "Turn-based White vs Black kingdom commander system with customizable player names",
      "Timed turn constraints and console user interface formatting",
      "Collaborative systems programming project co-authored with Dhanya Shree"
    ],
    my_contribution: "Co-architected the chess engine, implemented piece move validation rules, checkmate state validation, and terminal UI formatting.",
    github_url: "https://github.com/M-DhanyaShree/Chess-game",
    image_url: "/assets/images/projects/sathurangam-cover.png",
    screenshots: ["/assets/images/projects/sathurangam-cover.png"],
    featured: false,
    sort_order: 5
  },
  {
    id: 6,
    title: "Detective's Evidence Board — Graph Colouring Mystery Game",
    slug: "detective-game",
    category: "Software Development",
    short_description: "A mystery deduction game demonstrating Backtracking Graph Colouring and classic DAA algorithms through an interactive Evidence Board.",
    full_description: "Created as a demonstration of Design and Analysis of Algorithms (DAA), Detective Game models a museum artifact theft investigation as a graph coloring problem. Suspects represent graph vertices, museum locations represent colors, and timeline overlaps represent adjacency edges. Players collect physical evidence, interview suspects, and assign locations on an Evidence Board without violating adjacency constraints using a real Backtracking Graph Colouring algorithm.",
    problem_statement: "Educational algorithmic demonstrations often lack engaging visual applications that clearly illustrate NP-complete graph problems and constraint-satisfaction backtracking.",
    solution: "Built a dual-interface game (Python Pygame desktop engine + web interface) showcasing Backtracking Graph Colouring alongside implementations of Dijkstra, Kruskal, Knapsack, Binary Search, and Merge Sort.",
    technologies: ["Python", "Pygame", "Graph Theory", "Backtracking", "Algorithms", "JavaScript", "HTML5", "CSS3"],
    key_features: [
      "Real Backtracking Graph Colouring algorithm powering the central suspect-location Evidence Board",
      "Graph modeling: Suspects as vertices, museum locations as k-colors, timeline conflicts as adjacency constraints",
      "Complete DAA algorithm suite: Backtracking, Dijkstra's Shortest Path, Kruskal's MST, Knapsack, Binary Search",
      "Interactive clue discovery, suspect interrogation dialogs, and game state verification",
      "Dual client support with Python Pygame desktop engine and interactive web interface"
    ],
    my_contribution: "Designed the graph coloring algorithm implementation, suspect-location constraint rules, and interactive Evidence Board UI.",
    github_url: "https://github.com/HARI-NANDHINI-S/Detective-Game",
    image_url: "/assets/images/projects/detective-game-cover.png",
    screenshots: ["/assets/images/projects/detective-game-cover.png"],
    featured: false,
    sort_order: 6
  },
  {
    id: 7,
    title: "Smart Banking — AI-Driven Banking Automation & Virtual Assistance",
    slug: "smart-banking",
    category: "Software Development",
    short_description: "An AI-powered fintech platform streamlining banking services through virtual assistance, OCR form processing, and smart queue token management.",
    full_description: "Smart Banking (NexaBank AI) automates core branch banking operations to reduce counter congestion and expedite customer service. The platform incorporates an AI virtual assistant for customer query routing, OCR-based document digitization for paper forms, a real-time smart queue token system with live wait estimations, and branch analytics dashboards.",
    problem_statement: "Physical bank branches experience severe counter congestion, long customer queues, and slow manual processing of paper banking forms.",
    solution: "Engineered a hybrid architecture pairing responsive HTML5/Bootstrap 5 frontends with PHP REST API services and Python FastAPI AI microservices for OCR and conversational assistance.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "PHP", "FastAPI", "Python", "Supabase", "Chart.js"],
    key_features: [
      "NexaBank AI virtual assistant delivering automated customer query resolution and financial guidance",
      "OCR-based banking document processing extracting account details from scanned deposit and KYC forms",
      "Smart branch queue and token management system with live wait-time tracking",
      "Customer grievance and complaint tracking lifecycle with priority categorization",
      "Administrative management dashboards with branch KPIs and Chart.js analytics"
    ],
    my_contribution: "Built PHP REST API endpoints, FastAPI AI service integration, smart form processing, and administrative dashboards.",
    github_url: "https://github.com/HARI-NANDHINI-S/Smart-Banking",
    image_url: "/assets/images/projects/smart-banking-cover.png",
    screenshots: ["/assets/images/projects/smart-banking-cover.png"],
    featured: false,
    sort_order: 7
  },
  {
    id: 8,
    title: "VoxNira – Human Triage Multilingual Medical Assistant",
    slug: "voxnira",
    category: "Artificial Intelligence",
    short_description: "A multilingual voice-based medical assistant converting regional-language patient speech into structured clinical information and triage routing.",
    full_description: "VoxNira addresses healthcare accessibility by bridging language barriers for regional patients. It integrates Whisper and Meta MMS speech models for dialectal audio input, extracts clinical symptoms through medical spaCy NLP, and computes explainable triage urgency using Random Forest classifiers with clinician-in-the-loop decision support. In synthetic scenario evaluation, the system achieved 85% triage accuracy and 100% emergency sensitivity across 360 synthetic scenarios. (Note: Designed strictly as decision support, not a replacement for medical professionals).",
    problem_statement: "In multilingual healthcare systems, patients communicating in regional dialects often encounter miscommunication and triage delays, leading to critical bottlenecks in preliminary assessment.",
    solution: "Constructed an end-to-end voice AI pipeline that transcribes dialectal speech, isolates symptoms via domain-specific NLP, and produces calibrated urgency scores that doctors can quickly verify.",
    technologies: ["FastAPI", "Next.js", "React", "TypeScript", "Whisper", "Meta MMS", "spaCy", "Scikit-learn", "Random Forest", "SQLite", "SQLAlchemy"],
    key_features: [
      "Multilingual speech recognition with Whisper and Meta MMS for regional dialect input",
      "Clinical Named Entity Recognition (NER) powered by spaCy for symptom extraction",
      "Explainable Random Forest triage classification with confidence scoring",
      "Human-in-the-loop doctor verification dashboard (clinical decision support)",
      "Synthetic benchmark: 85% triage accuracy & 100% emergency sensitivity evaluated on 360 synthetic scenarios"
    ],
    my_contribution: "Designed the speech-to-text pipeline, engineered clinical entity extraction, and implemented the confidence-scored triage classifier.",
    github_url: "https://github.com/lithishkanna/Grannus",
    image_url: "/assets/images/projects/vox-nira-cover.png",
    screenshots: ["/assets/images/projects/vox-nira-cover.png"],
    featured: false,
    sort_order: 8
  }
];

export const INITIAL_EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "Secretary",
    organization: "403 STRATS",
    period: "July 2026 – Present",
    location: "Coimbatore, India",
    type: "Leadership",
    description: "Coordinated club operations, collaborating with team members to ensure seamless planning and execution of technical activities, workshops, and student mentorship.",
    key_responsibilities: [
      "Directing club initiatives and leading strategic student project showcases",
      "Coordinating with faculty and technical teams for seamless event operations",
      "Mentoring junior peers in computing fundamentals and collaborative development"
    ],
    logo_url: "/assets/images/logos/403-strats-logo.png",
    sort_order: 1
  },
  {
    id: 2,
    role: "Web Developer (Part-Time)",
    organization: "Studio 3 Interactive",
    period: "March 2026 – July 2026",
    location: "Coimbatore, India",
    type: "Work Experience",
    description: "Developed customer management systems to streamline data handling and operations, built responsive web interfaces and collaborated with the development team to implement and maintain features based on business requirements.",
    key_responsibilities: [
      "Developed scalable customer data management systems streamlining business workflows",
      "Built responsive, accessible web interfaces adhering to high UI/UX standards",
      "Collaborated with senior engineers to implement and test features against production criteria"
    ],
    logo_url: "/assets/images/logos/studio3-logo.png",
    sort_order: 2
  },
  {
    id: 3,
    role: "Joint Secretary",
    organization: "403 STRATS",
    period: "June 2025 – July 2026",
    location: "Coimbatore, India",
    type: "Leadership",
    description: "Coordinated teams, supported decision-making and helped drive club initiatives through effective collaboration and community engagement.",
    key_responsibilities: [
      "Assisted in managing club sessions, hackathons, and technical bootcamps",
      "Supported operational decision-making across multidisciplinary student teams",
      "Facilitated peer-to-peer technical knowledge sharing sessions"
    ],
    logo_url: "/assets/images/logos/403-strats-logo.png",
    sort_order: 3
  }
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    title: "Generative AI for All",
    issuer: "Infosys Springboard",
    issue_date: "2024",
    credential_id: "INFOSYS-GENAI-2024",
    credential_url: "https://infyspringboard.onwingspan.com",
    image_url: "/assets/images/certificates/generative-ai.png",
    skills_covered: ["Generative AI", "Large Language Models", "Prompt Engineering", "AI Ethics", "Transformer Architecture"],
    sort_order: 1
  },
  {
    id: 2,
    title: "Python (Basics)",
    issuer: "HackerRank",
    issue_date: "2024",
    credential_id: "HACKERRANK-PY-BASIC",
    credential_url: "https://www.hackerrank.com/certificates",
    image_url: "/assets/images/certificates/hackerrank-python.png",
    skills_covered: ["Python Syntax", "Data Structures", "Control Flow", "Object-Oriented Programming", "Functional Concepts"],
    sort_order: 2
  },
  {
    id: 3,
    title: "Introduction to Machine Learning",
    issuer: "NPTEL",
    issue_date: "2024",
    credential_id: "NPTEL-ML-2024",
    credential_url: "https://nptel.ac.in",
    image_url: "/assets/images/certificates/nptel-preview.jpg",
    skills_covered: ["Supervised Learning", "Unsupervised Learning", "Linear Regression", "Decision Trees", "SVM", "Model Evaluation"],
    sort_order: 3
  },
  {
    id: 4,
    title: "Introduction to HTML",
    issuer: "Simplilearn SkillUp",
    issue_date: "2024",
    credential_id: "SIMPLILEARN-HTML-2024",
    credential_url: "https://www.simplilearn.com/skillup-free-online-courses",
    image_url: "/assets/images/certificates/html-preview.png",
    skills_covered: ["HTML5", "Semantic Web Layout", "Forms & Input Types", "Document Structure", "Web Accessibility"],
    sort_order: 4
  },
  {
    id: 5,
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    image_url: "/assets/images/certificates/free-code-camp.png",
    skills_covered: ["Responsive Layouts", "Flexbox", "CSS Grid", "Media Queries", "Visual Design", "Accessibility"],
    sort_order: 5
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: "3rd Place — Pitch Pit",
    category: "Competitions",
    event_name: "Melinia '26",
    organizer: "Coimbatore Institute of Technology (CIT)",
    date: "2026",
    rank_or_award: "3rd Place (Bronze)",
    description: "Secured 3rd place in the Pitch Pit competition at Melinia '26, hosted by Coimbatore Institute of Technology (CIT).",
    image_url: "/assets/images/achievements/melinia-pitch-pit.png",
    sort_order: 1
  },
  {
    id: 2,
    title: "4th Place — HackMars Hackathon",
    category: "Hackathons",
    event_name: "HackMars Hackathon",
    organizer: "HackMars Organizing Body",
    date: "2025",
    rank_or_award: "4th Place Finalist",
    description: "Secured 4th place in the HackMars Hackathon, developing an innovative prototype under competitive hackathon conditions.",
    image_url: "/assets/images/achievements/hackmars-hackathon.png",
    sort_order: 2
  },
  {
    id: 3,
    title: "1st Runner-up — Idea Sprint",
    category: "Competitions",
    event_name: "Idea Sprint",
    organizer: "Entrepreneurship Development Cell, CIT (EDC CIT)",
    date: "2025",
    rank_or_award: "1st Runner-up",
    description: "Awarded 1st Runner-up in the Idea Sprint competition organized by the Entrepreneurship Development Cell, CIT (EDC CIT).",
    image_url: "/assets/images/achievements/idea-sprint.png",
    sort_order: 3
  }
];

export const EDUCATION_DATA = [
  {
    id: 1,
    degree: "M.Sc. Software Systems – 5-Year Integrated Programme",
    institution: "Coimbatore Institute of Technology (CIT)",
    period: "2024 – Present",
    scoreLabel: "CGPA (Semesters 1–4)",
    score: "8.85 / 10.0",
    description: "Advanced computing curriculum covering Data Structures & Algorithms, Object-Oriented Software Engineering, Database Systems, Machine Learning Pipelines, Full-Stack Architecture, and Systems Programming.",
    logo: "/assets/images/education/cit-logo.png",
    isCurrent: true,
    stage: "Milestone 03 • Higher Education"
  },
  {
    id: 2,
    degree: "Higher Secondary Certificate (HSC)",
    institution: "G.K.D. Matriculation Higher Secondary School",
    period: "2023 – 2024",
    scoreLabel: "Percentage",
    score: "93.67%",
    description: "Rigorous focus on Mathematics, Physics, Chemistry, and Computer Science foundations, achieving academic distinction and building core analytical acumen.",
    logo: "/assets/images/education/gkd-logo.png",
    isCurrent: false,
    stage: "Milestone 02 • Senior Secondary"
  },
  {
    id: 3,
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "G.K.D. Matriculation Higher Secondary School",
    period: "2021 – 2022",
    scoreLabel: "Percentage",
    score: "91%",
    description: "Built strong foundational discipline in mathematics, core sciences, and logical problem-solving with consistent academic excellence.",
    logo: "/assets/images/education/gkd-logo.png",
    isCurrent: false,
    stage: "Milestone 01 • Secondary Foundation"
  }
];

export const SKILL_CATEGORIES = [
  {
    id: "software",
    name: "Software Development",
    icon: "Code2",
    groups: [
      {
        name: "Programming",
        skills: ["Python", "C++", "Java"]
      },
      {
        name: "Frontend",
        skills: ["HTML", "CSS", "React"]
      },
      {
        name: "Backend",
        skills: ["FastAPI", "REST APIs"]
      },
      {
        name: "Databases",
        skills: ["MySQL", "MongoDB"]
      }
    ]
  },
  {
    id: "analytics",
    name: "Data Analytics",
    icon: "BarChart3",
    groups: [
      {
        name: "Analytics Core",
        skills: ["Python", "Pandas", "NumPy", "Data Cleaning", "Data Preprocessing", "Exploratory Data Analysis", "Feature Engineering", "MS Excel"]
      }
    ]
  },
  {
    id: "ml",
    name: "Machine Learning",
    icon: "BrainCircuit",
    groups: [
      {
        name: "ML Frameworks & Concepts",
        skills: ["Scikit-learn", "Regression", "Classification", "Predictive Analytics"]
      }
    ]
  },
  {
    id: "visualization",
    name: "Visualization",
    icon: "PieChart",
    groups: [
      {
        name: "Plotting & Insights",
        skills: ["Matplotlib", "Seaborn"]
      }
    ]
  },
  {
    id: "tools",
    name: "Developer Tools",
    icon: "Terminal",
    groups: [
      {
        name: "Environment & Version Control",
        skills: ["Jupyter Notebook", "Git", "GitHub", "VS Code"]
      }
    ]
  }
];
