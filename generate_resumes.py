import os

class SimplePDF:
    def __init__(self):
        self.objects = []
        self.pages = []
        self.stream_content = []

    def _add_object(self, content):
        self.objects.append(content)
        return len(self.objects)

    def generate_resume(self, title, subtitle, sections, output_path):
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Build text stream commands
        # A4 size is roughly 595.28 x 841.89 points
        commands = []
        commands.append("0.05 0.08 0.15 rg") # dark navy background accent for header bar
        commands.append("40 760 515 55 re f")
        
        # Title text (White)
        commands.append("BT")
        commands.append("/F1 20 Tf")
        commands.append("1 1 1 rg")
        commands.append("55 790 Td")
        commands.append(f"({self._escape(title)}) Tj")
        commands.append("ET")

        # Subtitle text (Electric Cyan)
        commands.append("BT")
        commands.append("/F2 10 Tf")
        commands.append("0.22 0.85 1 rg")
        commands.append("55 772 Td")
        commands.append(f"({self._escape(subtitle)}) Tj")
        commands.append("ET")

        # Body text starts at Y = 740
        y = 735
        for heading, items in sections:
            if y < 80:
                break
            # Section header
            commands.append("0.09 0.55 1 rg") # Neon blue
            commands.append(f"40 {y-3} 515 1.5 re f")
            
            commands.append("BT")
            commands.append("/F1 12 Tf")
            commands.append("0.05 0.25 0.55 rg")
            commands.append(f"40 {y} Td")
            commands.append(f"({self._escape(heading.upper())}) Tj")
            commands.append("ET")
            y -= 16

            for item in items:
                if y < 60:
                    break
                if isinstance(item, tuple):
                    bold_prefix, normal_text = item
                    commands.append("BT")
                    commands.append("/F1 9 Tf")
                    commands.append("0.1 0.15 0.2 rg")
                    commands.append(f"45 {y} Td")
                    commands.append(f"({self._escape(bold_prefix)}) Tj")
                    commands.append("ET")

                    commands.append("BT")
                    commands.append("/F2 9 Tf")
                    commands.append("0.25 0.3 0.35 rg")
                    commands.append(f"45 {y-11} Td")
                    commands.append(f"({self._escape(normal_text)}) Tj")
                    commands.append("ET")
                    y -= 23
                else:
                    commands.append("BT")
                    commands.append("/F2 8.5 Tf")
                    commands.append("0.2 0.25 0.3 rg")
                    commands.append(f"48 {y} Td")
                    commands.append(f"({self._escape(str(item))}) Tj")
                    commands.append("ET")
                    y -= 13
            y -= 10

        stream_data = "\n".join(commands).encode("latin-1")
        stream_len = len(stream_data)

        # PDF structure
        # Obj 1: Catalog
        # Obj 2: Pages
        # Obj 3: Page
        # Obj 4: Font F1 (Helvetica-Bold)
        # Obj 5: Font F2 (Helvetica)
        # Obj 6: Contents Stream

        pdf_parts = []
        pdf_parts.append(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")

        offsets = []
        
        def write_obj(content):
            offsets.append(sum(len(p) for p in pdf_parts))
            obj_num = len(offsets)
            pdf_parts.append(f"{obj_num} 0 obj\n".encode("latin-1"))
            pdf_parts.append(content)
            pdf_parts.append(b"\nendobj\n")
            return obj_num

        write_obj(b"<< /Type /Catalog /Pages 2 0 R >>")
        write_obj(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
        write_obj(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>")
        write_obj(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
        write_obj(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
        write_obj(f"<< /Length {stream_len} >>\nstream\n".encode("latin-1") + stream_data + b"\nendstream")

        xref_pos = sum(len(p) for p in pdf_parts)
        pdf_parts.append(f"xref\n0 {len(offsets) + 1}\n0000000000 65535 f \n".encode("latin-1"))
        for off in offsets:
            pdf_parts.append(f"{off:010d} 00000 n \n".encode("latin-1"))
        
        pdf_parts.append(f"trailer\n<< /Size {len(offsets) + 1} /Root 1 0 R >>\nstartxref\n{xref_pos}\n%%EOF\n".encode("latin-1"))

        with open(output_path, "wb") as f:
            f.write(b"".join(pdf_parts))
        print(f"Generated PDF: {output_path}")

    def _escape(self, text):
        return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")

def main():
    pdf = SimplePDF()

    # 1. SDE RESUME
    sde_sections = [
        ("Contact & Profiles", [
            "Location: Coimbatore, India  |  Email: harinandhini030506@gmail.com  |  Phone: +91 9003719169",
            "GitHub: https://github.com/HARI-NANDHINI-S  |  LinkedIn: https://www.linkedin.com/in/hari-nandhini-s-76932a321/"
        ]),
        ("Education", [
            ("M.Sc. Software Systems (5-Year Integrated) -- Coimbatore Institute of Technology", "2024 - Present | CGPA: 8.85 (Semesters 1-4)"),
            ("Higher Secondary Certificate (HSC) -- G.K.D. Matriculation Higher Secondary School", "2023 - 2024 | Aggregate: 93.67%"),
            ("Secondary School Certificate (SSLC) -- G.K.D. Matriculation Higher Secondary School", "2020 - 2021 | Aggregate: 91.00%")
        ]),
        ("Technical Skills", [
            "Programming Languages: C++, Python, JavaScript, TypeScript",
            "Frontend Technologies: React, Next.js, HTML5, CSS3, Tailwind CSS",
            "Backend & APIs: FastAPI, Python REST APIs, PHP",
            "Databases & Storage: MySQL, SQLite, MongoDB, SQLAlchemy ORM",
            "Tools & Systems: Git, GitHub, VS Code, Jupyter Notebook, Linux / Bash"
        ]),
        ("Work Experience & Leadership", [
            ("Secretary -- 403 STRATS", "July 2026 - Present | Coimbatore, India"),
            "- Coordinated club operations and collaborated with team members to ensure seamless execution of technical activities.",
            ("Web Developer (Part-Time) -- Studio 3 Interactive", "March 2026 - July 2026 | Coimbatore, India"),
            "- Developed customer management systems to streamline data operations and built responsive web interfaces.",
            ("Joint Secretary -- 403 STRATS", "June 2025 - July 2026 | Coimbatore, India"),
            "- Coordinated cross-functional student teams and helped drive club technical initiatives through effective collaboration."
        ]),
        ("Featured Software Projects", [
            ("VoxNira -- Multilingual Medical AI Triage Assistant", "Stack: Python, FastAPI, Next.js, React, TypeScript, Whisper, spaCy, Scikit-learn, SQLite"),
            "- Multilingual voice-based medical assistant converting patient speech into structured clinical records with doctor verification.",
            ("Land-IQ -- Land Record Digitization & Validation", "Stack: React, TypeScript, FastAPI, MySQL, Python, Scikit-learn, OCR, NLP, GIS, Redis"),
            "- Intelligent land-record processing using OCR and machine learning to extract and cross-validate registry records.",
            ("Smart Banking -- Secure Transaction Ledger", "Stack: Python, SQLite, MySQL, Security Logic, Transaction Ledger"),
            "- Robust digital banking system with atomic transactions, lifecycle reconciliation, and fraud prevention alerts.",
            ("Detective Game -- Interactive Mystery & Deduction", "Stack: JavaScript, HTML5, CSS3, State Management, Branching Narrative"),
            "- Interactive narrative game engine evaluating evidence, suspect interrogations, and player deduction trees."
        ]),
        ("Certifications & Honors", [
            "- Infosys Springboard: Generative AI for All  |  HackerRank: Python (Basics)  |  NPTEL: Introduction to Machine Learning",
            "- 3rd Place, Pitch Pit at Melinia '26 (Coimbatore Institute of Technology)",
            "- 4th Place, HackMars Hackathon  |  Hands-on: Linux Administration & Shell Scripting Workshop"
        ])
    ]

    pdf.generate_resume(
        title="HARI NANDHINI S",
        subtitle="SOFTWARE SYSTEMS STUDENT  |  SOFTWARE DEVELOPMENT ENGINEER (SDE) ASPIRANT",
        sections=sde_sections,
        output_path="frontend/public/resumes/Hari_Nandhini_S_SDE_Resume.pdf"
    )

    # 2. DATA ANALYTICS & AI RESUME
    ai_sections = [
        ("Contact & Profiles", [
            "Location: Coimbatore, India  |  Email: harinandhini030506@gmail.com  |  Phone: +91 9003719169",
            "GitHub: https://github.com/HARI-NANDHINI-S  |  LinkedIn: https://www.linkedin.com/in/hari-nandhini-s-76932a321/"
        ]),
        ("Education", [
            ("M.Sc. Software Systems (5-Year Integrated) -- Coimbatore Institute of Technology", "2024 - Present | CGPA: 8.85 (Semesters 1-4)"),
            ("Higher Secondary Certificate (HSC) -- G.K.D. Matriculation Higher Secondary School", "2023 - 2024 | Aggregate: 93.67%"),
            ("Secondary School Certificate (SSLC) -- G.K.D. Matriculation Higher Secondary School", "2020 - 2021 | Aggregate: 91.00%")
        ]),
        ("Data & AI Technical Competencies", [
            "Data Analytics: Python, Pandas, NumPy, Data Cleaning, Preprocessing, EDA, Feature Engineering, MS Excel",
            "Machine Learning: Scikit-learn, Regression, Classification, Random Forest, SMOTE, Model Evaluation",
            "Data Visualization: Matplotlib, Seaborn, Interactive Dashboards",
            "AI & Speech NLP: Whisper Speech-to-Text, Meta MMS, spaCy Medical NER, Conversational Agents",
            "Tools & Environments: Jupyter Notebook, VS Code, Git, GitHub, SQLite, SQLAlchemy"
        ]),
        ("Experience & Leadership", [
            ("Secretary -- 403 STRATS", "July 2026 - Present | Coimbatore, India"),
            "- Directed operations for technical club, facilitating AI workshops, hackathon mentoring, and student research projects.",
            ("Web Developer (Part-Time) -- Studio 3 Interactive", "March 2026 - July 2026 | Coimbatore, India"),
            "- Developed customer data management pipelines and built data-driven dashboard interfaces for operational oversight.",
            ("Joint Secretary -- 403 STRATS", "June 2025 - July 2026 | Coimbatore, India"),
            "- Organized tech seminars, code camps, and collaborative hackathons for aspiring developers and data scientists."
        ]),
        ("Featured AI & Data Science Projects", [
            ("AgriMind -- AI-Powered Agricultural Decision Support System", "Stack: Python, Pandas, NumPy, Scikit-learn, Machine Learning, Matplotlib, Seaborn"),
            "- Analyzed soil N-P-K nutrient profiles and climate data to predict high-yield crop recommendations for farmers.",
            ("Nexara AI -- Intelligent Analytics Platform", "Stack: Python, Machine Learning, Pandas, Scikit-learn, NumPy, Matplotlib"),
            "- Automated data preparation, anomaly detection, and regression trend predictions with visual reports.",
            ("VoxNira -- Multilingual Medical AI Triage Assistant", "Stack: Python, Whisper, Meta MMS, spaCy NER, Random Forest, FastAPI, SQLite"),
            "- Voice-driven medical assistant transcribing regional speech and classifying clinical triage urgency.",
            ("Credit Card Fraud Detection & Risk Analysis", "Stack: Python, Scikit-learn, Pandas, SMOTE, Random Forest, Precision-Recall Tuning"),
            "- Handled severe class imbalance (<0.2% fraud) using SMOTE and trained robust classifiers to minimize false negatives.",
            ("Enterprise AI Voice Customer Care Agent", "Stack: Python, Speech Recognition, Conversational AI, NLP, FastAPI"),
            "- Automated voice agent delivering real-time dialogue understanding, intent recognition, and ticket routing."
        ]),
        ("Certifications & Key Milestones", [
            "- Infosys Springboard: Generative AI for All  |  NPTEL: Introduction to Machine Learning  |  HackerRank: Python",
            "- 3rd Place, Pitch Pit at Melinia '26 (CIT)  |  4th Place, HackMars Hackathon",
            "- Workshops: Linux Administration & Shell Scripting  |  Host Yourself 101: Web Hosting & Cloud Deployment"
        ])
    ]

    pdf.generate_resume(
        title="HARI NANDHINI S",
        subtitle="SOFTWARE SYSTEMS STUDENT  |  DATA SCIENCE, ANALYTICS & ARTIFICIAL INTELLIGENCE",
        sections=ai_sections,
        output_path="frontend/public/resumes/Hari_Nandhini_S_Data_AI_Resume.pdf"
    )

if __name__ == "__main__":
    main()

