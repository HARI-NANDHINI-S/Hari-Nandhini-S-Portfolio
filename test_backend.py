from backend.app.database import SessionLocal
from backend.app.models.models import Project, Certification, Achievement, Experience, ContactMessage
from backend.app.routes import contact, projects, certifications, achievements, experience
from backend.app.schemas.schemas import ContactCreate

def run_tests():
    db = SessionLocal()
    print("Testing direct route functions & database models...")

    # 1. Projects
    all_projects = projects.get_projects(category=None, db=db)
    print(f" Projects: Retrieved {len(all_projects)} items.")
    assert len(all_projects) >= 8, f"Expected >= 8 projects, got {len(all_projects)}"
    first_p = all_projects[0]
    print(f"   First project: {first_p['title']} [{first_p['category']}]")

    # 2. Project by slug
    vox = projects.get_project_by_slug("voxnira", db=db)
    print(f"   Slug lookup voxnira: {vox['title']}")
    assert vox["slug"] == "voxnira"

    # 3. Certifications
    all_certs = certifications.get_certifications(db=db)
    print(f" Certifications: Retrieved {len(all_certs)} items.")
    assert len(all_certs) >= 5, f"Expected >= 5 certifications, got {len(all_certs)}"

    # 4. Achievements
    all_achieve = achievements.get_achievements(category=None, db=db)
    print(f" Achievements: Retrieved {len(all_achieve)} items.")
    assert len(all_achieve) == 3, f"Expected 3 achievements, got {len(all_achieve)}"

    # 5. Experience
    all_exp = experience.get_experience(db=db)
    print(f" Experience: Retrieved {len(all_exp)} items.")
    assert len(all_exp) >= 3

    # 6. Contact message submission
    test_submission = ContactCreate(
        name="CIT Tech Lead",
        email="techlead@cit.edu.in",
        subject="Internship & Project Discussion",
        message="Hello Hari Nandhini, we reviewed your Land-IQ and VoxNira projects. We would love to discuss an internship role!"
    )
    res = contact.submit_contact(test_submission, db=db)
    print(" Contact Submission Result:", res["message"])
    assert "data" in res and "id" in res["data"]

    # 7. Check DB persistence
    stored = db.query(ContactMessage).filter(ContactMessage.email == "techlead@cit.edu.in").first()
    assert stored is not None
    print(f" Database Persistence Confirmed: Message ID {stored.id} saved in SQLite with status '{stored.status}'!")

    db.close()
    print("\n ALL BACKEND SYSTEM AND DATABASE TESTS PASSED WITH 100% SUCCESS!")

if __name__ == "__main__":
    run_tests()
