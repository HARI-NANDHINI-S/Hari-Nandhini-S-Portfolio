from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from backend.app.database import Base

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), nullable=False)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String(50), default="received")

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    slug = Column(String(150), unique=True, index=True)
    category = Column(String(100), nullable=False)
    short_description = Column(Text, nullable=False)
    full_description = Column(Text, nullable=False)
    problem_statement = Column(Text, nullable=True)
    solution = Column(Text, nullable=True)
    technologies = Column(Text, nullable=False)  # JSON or comma-separated
    key_features = Column(Text, nullable=False)   # JSON or comma-separated
    my_contribution = Column(Text, nullable=True)
    github_url = Column(String(255), nullable=True)
    live_url = Column(String(255), nullable=True)
    image_url = Column(String(255), nullable=False)
    screenshots = Column(Text, nullable=True)     # JSON array string
    featured = Column(Boolean, default=False)
    sort_order = Column(Integer, default=0)

class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    issuer = Column(String(150), nullable=False)
    issue_date = Column(String(100), nullable=True)
    credential_id = Column(String(150), nullable=True)
    credential_url = Column(String(255), nullable=True)
    image_url = Column(String(255), nullable=False)
    skills_covered = Column(Text, nullable=True)
    sort_order = Column(Integer, default=0)

class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    category = Column(String(100), nullable=False)
    event_name = Column(String(200), nullable=False)
    organizer = Column(String(200), nullable=False)
    date = Column(String(100), nullable=False)
    rank_or_award = Column(String(100), nullable=True)
    description = Column(Text, nullable=False)
    image_url = Column(String(255), nullable=True)
    sort_order = Column(Integer, default=0)

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    role = Column(String(150), nullable=False)
    organization = Column(String(150), nullable=False)
    period = Column(String(100), nullable=False)
    location = Column(String(100), default="Coimbatore, India")
    type = Column(String(100), nullable=False)  # "Leadership", "Experience", etc.
    description = Column(Text, nullable=False)
    key_responsibilities = Column(Text, nullable=True)  # JSON array string
    logo_url = Column(String(255), nullable=True)
    sort_order = Column(Integer, default=0)

