import os
import html
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.models import ContactMessage
from backend.app.schemas.schemas import ContactCreate

router = APIRouter(prefix="/api/contact", tags=["Contact"])

def attempt_smtp_email(name: str, sender_email: str, subject: str, message: str, timestamp: datetime) -> bool:
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USERNAME")
    smtp_pass = os.getenv("SMTP_PASSWORD")
    target_email = os.getenv("CONTACT_EMAIL", "harinandhini030506@gmail.com")

    if not smtp_host or not smtp_user or not smtp_pass:
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"[Portfolio Contact] {subject} - from {name}"
        msg["From"] = smtp_user
        msg["To"] = target_email
        msg["Reply-To"] = sender_email

        body_text = f"""
New Portfolio Message:
------------------------------------------
Sender Name: {name}
Sender Email: {sender_email}
Subject: {subject}
Timestamp: {timestamp.strftime('%Y-%m-%d %H:%M:%S UTC')}

Message:
{message}
------------------------------------------
"""
        msg.attach(MIMEText(body_text, "plain"))

        server = smtplib.SMTP(smtp_host, smtp_port, timeout=10)
        server.ehlo()
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, target_email, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"[SMTP Notice] Email delivery failed: {e}")
        return False

@router.post("", response_model=dict, status_code=status.HTTP_200_OK)
def submit_contact(payload: ContactCreate, db: Session = Depends(get_db)):
    sanitized_name = html.escape(payload.name.strip())
    sanitized_subject = html.escape(payload.subject.strip())
    sanitized_message = html.escape(payload.message.strip())
    email = payload.email.strip().lower()

    if len(sanitized_message) < 5 or len(sanitized_name) < 2:
        raise HTTPException(status_code=400, detail="Invalid message content. Please provide full contact details.")

    now = datetime.utcnow()

    # Attempt SMTP email transmission directly to harinandhini030506@gmail.com
    email_dispatched = attempt_smtp_email(
        name=sanitized_name,
        sender_email=email,
        subject=sanitized_subject,
        message=sanitized_message,
        timestamp=now
    )

    status_tag = "delivered" if email_dispatched else "delivery_failed_smtp"

    # Save to SQLite database for audit and backup
    new_msg = ContactMessage(
        name=sanitized_name,
        email=email,
        subject=sanitized_subject,
        message=sanitized_message,
        created_at=now,
        status=status_tag
    )
    db.add(new_msg)
    db.commit()
    db.refresh(new_msg)

    if email_dispatched:
        return {
            "success": True,
            "message": f"Thank you, {sanitized_name}! Your message has been sent to Hari Nandhini (harinandhini030506@gmail.com).",
            "data": {
                "id": new_msg.id,
                "status": status_tag
            }
        }
    else:
        return {
            "success": False,
            "message": "Email delivery could not be completed (SMTP service offline or unconfigured). Please email Hari directly at harinandhini030506@gmail.com or call +91 9003719169.",
            "data": {
                "id": new_msg.id,
                "status": status_tag
            }
        }
