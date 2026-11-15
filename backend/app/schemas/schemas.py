from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

# Contact Schemas
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=2, max_length=200)
    message: str = Field(..., min_length=5, max_length=3000)

class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime
    status: str

    class Config:
        from_attributes = True

# Project Schemas
class ProjectResponse(BaseModel):
    id: int
    title: str
    slug: str
    category: str
    short_description: str
    full_description: str
    problem_statement: Optional[str] = None
    solution: Optional[str] = None
    technologies: List[str]
    key_features: List[str]
    my_contribution: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: str
    screenshots: Optional[List[str]] = []
    featured: bool
    sort_order: int

# Certification Schemas
class CertificationResponse(BaseModel):
    id: int
    title: str
    issuer: str
    issue_date: Optional[str] = None
    credential_id: Optional[str] = None
    credential_url: Optional[str] = None
    image_url: str
    skills_covered: Optional[List[str]] = []
    sort_order: int

# Achievement Schemas
class AchievementResponse(BaseModel):
    id: int
    title: str
    category: str
    event_name: str
    organizer: str
    date: str
    rank_or_award: Optional[str] = None
    description: str
    image_url: Optional[str] = None
    sort_order: int

# Experience Schemas
class ExperienceResponse(BaseModel):
    id: int
    role: str
    organization: str
    period: str
    location: str
    type: str
    description: str
    key_responsibilities: Optional[List[str]] = []
    logo_url: Optional[str] = None
    sort_order: int

