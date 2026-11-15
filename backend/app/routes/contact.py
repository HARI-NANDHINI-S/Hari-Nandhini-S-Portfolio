import os
import html
import smtplib
import socket
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from app.database import get_db
from app.models.models import ContactMessage
from app.schemas.schemas import ContactCreate

# Load environment variables
load_dotenv()

router = APIRouter(tags=["Contact"])

def attempt_smtp_email(name: str, sender_email: str, subject: str, message: str, timestamp: datetime) -> tuple[bool, str]:
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com").strip()
    smtp_port_str = os.getenv("SMTP_PORT", "587").strip()
    try:
        smtp_port = int(smtp_port_str)
    except ValueError:
        smtp_port = 587

    smtp_user = os.getenv("SMTP_USERNAME", "").strip()
    # Strip spaces from password in case user copied a 16-character Google App Password with spaces
    smtp_pass = os.getenv("SMTP_PASSWORD", "").strip().replace(" ", "")
    target_email = os.getenv("CONTACT_EMAIL", "harinandhini030506@gmail.com").strip()

    if not smtp_user or not smtp_pass:
        msg = "SMTP credentials (SMTP_USERNAME or SMTP_PASSWORD) are not configured in environment variables or .env file."
        print(f"[SMTP Notice] {msg}")
        return False, msg

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"[Portfolio Contact] {subject} - from {name}"
        msg["From"] = f"{name} via Portfolio <{smtp_user}>"
        msg["To"] = target_email
        msg["Reply-To"] = sender_email

        body_text = f"""
New Contact Form Submission from Hari Nandhini's Digital Portfolio:
----------------------------------------------------------------------
Sender Name  : {name}
Sender Email : {sender_email}
Subject      : {subject}
Timestamp    : {timestamp.strftime('%Y-%m-%d %H:%M:%S UTC')}

Message:
{message}
----------------------------------------------------------------------
This email was generated from your portfolio contact form.
Click Reply to respond directly to {sender_email}.
"""

        body_html = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }}
    .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }}
    .header {{ background: linear-gradient(135deg, #0A1424 0%, #168BFF 100%); color: #ffffff; padding: 28px 32px; }}
    .header h1 {{ margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }}
    .header p {{ margin: 6px 0 0; opacity: 0.85; font-size: 13px; font-family: monospace; }}
    .content {{ padding: 32px; }}
    .meta-box {{ background: #f1f5f9; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px; }}
    .meta-row {{ display: flex; margin-bottom: 10px; font-size: 14px; }}
    .meta-label {{ font-weight: 600; color: #64748b; width: 110px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; padding-top: 2px; }}
    .meta-val {{ color: #0f172a; font-weight: 500; word-break: break-all; }}
    .message-box {{ background: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #168BFF; border-radius: 8px; padding: 20px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #334155; }}
    .footer {{ padding: 20px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Message from Portfolio Contact Form</h1>
      <p>Submitted via Portfolio Contact Section</p>
    </div>
    <div class="content">
      <div class="meta-box">
        <div class="meta-row"><span class="meta-label">Sender Name:</span><span class="meta-val"><strong>{html.escape(name)}</strong></span></div>
        <div class="meta-row"><span class="meta-label">Sender Email:</span><span class="meta-val"><a href="mailto:{html.escape(sender_email)}">{html.escape(sender_email)}</a></span></div>
        <div class="meta-row"><span class="meta-label">Subject:</span><span class="meta-val">{html.escape(subject)}</span></div>
        <div class="meta-row"><span class="meta-label">Timestamp:</span><span class="meta-val">{timestamp.strftime('%Y-%m-%d %H:%M:%S UTC')}</span></div>
      </div>
      <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 8px;">Message Content</h3>
      <div class="message-box">{html.escape(message)}</div>
    </div>
    <div class="footer">
      You received this message because someone contacted you through your digital portfolio. Click "Reply" to respond directly to {html.escape(sender_email)}.
    </div>
  </div>
</body>
</html>
"""
        msg.attach(MIMEText(body_text, "plain"))
        msg.attach(MIMEText(body_html, "html"))

        if smtp_port == 465:
            server = smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=12)
        else:
            server = smtplib.SMTP(smtp_host, smtp_port, timeout=12)
            server.ehlo()
            server.starttls()
            server.ehlo()

        server.login(smtp_user, smtp_pass)
        server.send_message(msg)
        server.quit()
        print(f"[SMTP Success] Email dispatched successfully to {target_email} from {sender_email}")
        return True, f"Email delivered successfully to {target_email}."
    except smtplib.SMTPAuthenticationError as e:
        err = f"SMTP Authentication failed for user '{smtp_user}'. Please verify your Gmail App Password."
        print(f"[SMTP Error] {err} ({e})")
        return False, err
    except (smtplib.SMTPConnectError, socket.timeout, ConnectionRefusedError, OSError) as e:
        err = f"Could not establish connection to SMTP host {smtp_host}:{smtp_port}."
        print(f"[SMTP Error] {err} ({e})")
        return False, err
    except smtplib.SMTPRecipientsRefused as e:
        err = f"Recipient email '{target_email}' was rejected by the SMTP server."
        print(f"[SMTP Error] {err} ({e})")
        return False, err
    except smtplib.SMTPException as e:
        err = f"SMTP protocol error: {str(e)}"
        print(f"[SMTP Error] {err}")
        return False, err
    except Exception as e:
        err = f"Unexpected delivery failure: {str(e)}"
        print(f"[SMTP Error] {err}")
        return False, err

@router.get("", response_model=dict, status_code=status.HTTP_200_OK)
@router.get("/", response_model=dict, status_code=status.HTTP_200_OK)
def get_contact_status():
    smtp_user = os.getenv("SMTP_USERNAME", "").strip()
    smtp_pass = os.getenv("SMTP_PASSWORD", "").strip()
    target_email = os.getenv("CONTACT_EMAIL", "harinandhini030506@gmail.com").strip()
    return {
        "status": "online",
        "service": "portfolio-contact-api",
        "endpoint": "POST /api/contact",
        "target_email": target_email,
        "smtp_configured": bool(smtp_user and smtp_pass)
    }

@router.post("", response_model=dict, status_code=status.HTTP_200_OK)
@router.post("/", response_model=dict, status_code=status.HTTP_200_OK)
def submit_contact(payload: ContactCreate, db: Session = Depends(get_db)):
    sanitized_name = payload.name.strip()
    sanitized_subject = payload.subject.strip()
    sanitized_message = payload.message.strip()
    email = payload.email.strip().lower()

    if len(sanitized_name) < 2 or len(sanitized_name) > 100:
        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "message": "Please provide a valid name between 2 and 100 characters."
            }
        )

    if not email or "@" not in email or "." not in email:
        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "message": "Please provide a valid email address."
            }
        )

    if len(sanitized_subject) < 2 or len(sanitized_subject) > 150:
        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "message": "Please provide a subject line between 2 and 150 characters."
            }
        )

    if len(sanitized_message) < 5 or len(sanitized_message) > 5000:
        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "message": "Please provide a message between 5 and 5,000 characters."
            }
        )

    now = datetime.utcnow()

    # Attempt SMTP email transmission directly to configured target_email
    email_dispatched, dispatch_detail = attempt_smtp_email(
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
            "message": f"Thank you, {sanitized_name}! Your message has been sent successfully to Hari Nandhini (harinandhini030506@gmail.com).",
            "data": {
                "id": new_msg.id,
                "status": status_tag
            }
        }
    else:
        return {
            "success": False,
            "message": f"Email delivery could not be completed ({dispatch_detail}). Your message has been saved in the database backup.",
            "data": {
                "id": new_msg.id,
                "status": status_tag
            }
        }
