from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import json
from backend.app.database import get_db
from backend.app.models.models import Project
from backend.app.schemas.schemas import ProjectResponse

router = APIRouter(prefix="/api/projects", tags=["Projects"])

def transform_project(p: Project) -> dict:
    try:
        techs = json.loads(p.technologies) if p.technologies.startswith("[") else [t.strip() for t in p.technologies.split(",") if t.strip()]
    except Exception:
        techs = [t.strip() for t in p.technologies.split(",") if t.strip()]

    try:
        features = json.loads(p.key_features) if p.key_features.startswith("[") else [f.strip() for f in p.key_features.split("\n") if f.strip()]
    except Exception:
        features = [f.strip() for f in p.key_features.split("\n") if f.strip()]

    screenshots = []
    if p.screenshots:
        try:
            screenshots = json.loads(p.screenshots) if p.screenshots.startswith("[") else [s.strip() for s in p.screenshots.split(",") if s.strip()]
        except Exception:
            screenshots = []

    return {
        "id": p.id,
        "title": p.title,
        "slug": p.slug,
        "category": p.category,
        "short_description": p.short_description,
        "full_description": p.full_description,
        "problem_statement": p.problem_statement,
        "solution": p.solution,
        "technologies": techs,
        "key_features": features,
        "my_contribution": p.my_contribution,
        "github_url": p.github_url,
        "live_url": p.live_url,
        "image_url": p.image_url,
        "screenshots": screenshots,
        "featured": p.featured,
        "sort_order": p.sort_order,
    }

@router.get("", response_model=List[ProjectResponse])
def get_projects(category: str = None, db: Session = Depends(get_db)):
    query = db.query(Project).order_by(Project.sort_order.asc(), Project.id.asc())
    if category and category.lower() != "all":
        query = query.filter(Project.category.ilike(f"%{category}%"))
    projects = query.all()
    return [transform_project(p) for p in projects]

@router.get("/{slug}", response_model=ProjectResponse)
def get_project_by_slug(slug: str, db: Session = Depends(get_db)):
    p = db.query(Project).filter(Project.slug == slug).first()
    if not p:
        raise HTTPException(status_code=404, detail="Project not found")
    return transform_project(p)

