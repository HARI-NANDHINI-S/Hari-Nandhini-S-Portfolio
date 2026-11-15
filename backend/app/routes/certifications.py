from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import json
from backend.app.database import get_db
from backend.app.models.models import Certification
from backend.app.schemas.schemas import CertificationResponse

router = APIRouter(prefix="/api/certifications", tags=["Certifications"])

def transform_cert(c: Certification) -> dict:
    skills = []
    if c.skills_covered:
        try:
            skills = json.loads(c.skills_covered) if c.skills_covered.startswith("[") else [s.strip() for s in c.skills_covered.split(",") if s.strip()]
        except Exception:
            skills = [s.strip() for s in c.skills_covered.split(",") if s.strip()]

    return {
        "id": c.id,
        "title": c.title,
        "issuer": c.issuer,
        "issue_date": c.issue_date,
        "credential_id": c.credential_id,
        "credential_url": c.credential_url,
        "image_url": c.image_url,
        "skills_covered": skills,
        "sort_order": c.sort_order,
    }

@router.get("", response_model=List[CertificationResponse])
def get_certifications(db: Session = Depends(get_db)):
    certs = db.query(Certification).order_by(Certification.sort_order.asc(), Certification.id.asc()).all()
    return [transform_cert(c) for c in certs]

