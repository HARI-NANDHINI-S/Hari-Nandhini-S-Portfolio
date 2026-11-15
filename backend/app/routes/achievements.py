from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from backend.app.database import get_db
from backend.app.models.models import Achievement
from backend.app.schemas.schemas import AchievementResponse

router = APIRouter(prefix="/api/achievements", tags=["Achievements"])

@router.get("", response_model=List[AchievementResponse])
def get_achievements(category: str = None, db: Session = Depends(get_db)):
    query = db.query(Achievement).order_by(Achievement.sort_order.asc(), Achievement.id.asc())
    if category and category.lower() != "all":
        query = query.filter(Achievement.category.ilike(f"%{category}%"))
    return query.all()

