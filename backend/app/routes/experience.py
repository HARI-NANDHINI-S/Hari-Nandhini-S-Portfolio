from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import json
from backend.app.database import get_db
from backend.app.models.models import Experience
from backend.app.schemas.schemas import ExperienceResponse

router = APIRouter(prefix="/api/experience", tags=["Experience"])

def transform_exp(e: Experience) -> dict:
    resp = []
    if e.key_responsibilities:
        try:
            resp = json.loads(e.key_responsibilities) if e.key_responsibilities.startswith("[") else [r.strip() for r in e.key_responsibilities.split("\n") if r.strip()]
        except Exception:
            resp = [r.strip() for r in e.key_responsibilities.split("\n") if r.strip()]

    return {
        "id": e.id,
        "role": e.role,
        "organization": e.organization,
        "period": e.period,
        "location": e.location,
        "type": e.type,
        "description": e.description,
        "key_responsibilities": resp,
        "logo_url": e.logo_url,
        "sort_order": e.sort_order,
    }

@router.get("", response_model=List[ExperienceResponse])
def get_experience(db: Session = Depends(get_db)):
    items = db.query(Experience).order_by(Experience.sort_order.asc(), Experience.id.asc()).all()
    return [transform_exp(e) for e in items]

