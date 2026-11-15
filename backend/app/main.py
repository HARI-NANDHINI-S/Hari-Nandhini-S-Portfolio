from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from backend.app.database import engine, Base, SessionLocal
from backend.app.models.models import Project
from backend.app.routes import contact, projects, certifications, achievements, experience
from backend.app.seed import seed_database
import os

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
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://hari-nandhini-s.github.io",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(contact.router)
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
            "/api/contact"
        ]
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "portfolio-backend"}
