import os
import sys
from unittest.mock import patch, MagicMock

# Ensure backend folder is on sys.path
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "backend"))

from app.database import SessionLocal
from app.models.models import Project, Certification, Achievement, Experience, ContactMessage
from app.routes import contact, projects, certifications, achievements, experience
from app.schemas.schemas import ContactCreate
from app.main import health_check

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

    # 6. Health & Contact Status Check
    health = health_check()
    print(" Health check status:", health)
    assert health["status"] == "healthy"
    assert health["email_provider"] == "resend"

    c_status = contact.get_contact_status()
    print(" Contact endpoint diagnostic status:", c_status)
    assert c_status["status"] == "online"
    assert c_status["email_provider"] == "resend"

    # 7. Contact message submission - Unconfigured Provider Test
    test_submission_unconfigured = ContactCreate(
        name="CIT Tech Lead",
        email="techlead@cit.edu.in",
        subject="Internship & Project Discussion",
        message="Hello Hari Nandhini, we reviewed your Land-IQ and VoxNira projects. We would love to discuss an internship role!"
    )
    res_unconfigured = contact.submit_contact(test_submission_unconfigured, db=db)
    print(" Contact Submission (Unconfigured Provider):", res_unconfigured["message"])
    assert res_unconfigured["success"] is False
    assert res_unconfigured["data"]["status"] == "delivery_failed_provider"

    # Check DB persistence for unconfigured test
    stored_unconfigured = db.query(ContactMessage).filter(ContactMessage.id == res_unconfigured["data"]["id"]).first()
    assert stored_unconfigured is not None
    assert stored_unconfigured.status == "delivery_failed_provider"
    print(f" Database Persistence Confirmed: Message ID {stored_unconfigured.id} saved in SQLite with status '{stored_unconfigured.status}'!")

    # 8. Contact message submission - Successful Provider Acceptance Test
    mock_response = MagicMock()
    mock_response.__enter__.return_value = mock_response
    mock_response.getcode.return_value = 200
    mock_response.read.return_value = b'{"id": "resend_test_msg_987654321"}'

    with patch.dict(os.environ, {"RESEND_API_KEY": "re_mock_test_key_12345", "RESEND_FROM_EMAIL": "onboarding@resend.dev"}):
        with patch("urllib.request.urlopen", return_value=mock_response):
            test_submission_success = ContactCreate(
                name="Google Recruiter",
                email="recruiter@google.com",
                subject="Senior Software Engineer Role",
                message="We are impressed with your portfolio and would like to invite you for an interview."
            )
            res_success = contact.submit_contact(test_submission_success, db=db)
            print(" Contact Submission (Provider Success):", res_success["message"])
            assert res_success["success"] is True
            assert res_success["data"]["status"] == "delivered"

            stored_success = db.query(ContactMessage).filter(ContactMessage.id == res_success["data"]["id"]).first()
            assert stored_success is not None
            assert stored_success.status == "delivered"
            print(f" Provider Acceptance Confirmed: Message ID {stored_success.id} saved in SQLite with status '{stored_success.status}'!")

    db.close()
    print("\n ALL BACKEND SYSTEM AND DATABASE TESTS PASSED WITH 100% SUCCESS!")

if __name__ == "__main__":
    run_tests()
