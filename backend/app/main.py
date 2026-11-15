import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env"))
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import engine, Base, SessionLocal
from app.models.models import Project
from app.routes import contact, projects, certifications, achievements, experience
from app.seed import seed_database

# Create tables
Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure database is seeded
    db = SessionLocal()
    count = db.query(Project).count()
    db.close()
    if count == 0:
        seed_database()
    yield

app = FastAPI(
    title="Hari Nandhini S — Portfolio API",
    description="Production REST API powering Hari Nandhini's digital portfolio, projects, contact system, and verified credentials.",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "https://hari-nandhini-s.github.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"(http://(localhost|127\.0\.0\.1)(:\d+)?|https://.*\.vercel\.app|https://.*\.onrender\.com|https://.*\.github\.io)",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(contact.router, prefix="/api/contact")
app.include_router(contact.router, prefix="/contact")
app.include_router(projects.router)
app.include_router(certifications.router)
app.include_router(achievements.router)
app.include_router(experience.router)

@app.get("/")
def root():
    return {
        "status": "online",
        "owner": "Hari Nandhini S",
        "role": "Software Developer & AI/ML Enthusiast",
        "documentation": "/docs",
        "endpoints": [
            "/api/projects",
            "/api/certifications",
            "/api/achievements",
            "/api/experience",
            "/api/contact",
            "/health"
        ]
    }

@app.get("/health")
@app.get("/api/health")
def health_check():
    resend_key = os.getenv("RESEND_API_KEY", "").strip()
    resend_from = os.getenv("RESEND_FROM_EMAIL", "").strip()
    return {
        "status": "healthy",
        "service": "portfolio-backend",
        "email_provider": "resend",
        "email_configured": bool(resend_key and resend_from),
        "target_email": os.getenv("CONTACT_EMAIL", "harinandhini030506@gmail.com")
    }
