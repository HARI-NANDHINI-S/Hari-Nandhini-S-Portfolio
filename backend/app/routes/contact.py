import os
import html
import json
import urllib.request
import urllib.error
from datetime import datetime
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from app.database import get_db
from app.models.models import ContactMessage
from app.schemas.schemas import ContactCreate

# Load environment variables
load_dotenv()

router = APIRouter(tags=["Contact"])

def send_resend_email(name: str, sender_email: str, subject: str, message: str, timestamp: datetime) -> tuple[bool, str]:
    """
    Dispatches contact form submission via Resend HTTPS REST API.
    Uses HTTPS port 443 (fully allowed on Render Free tier without SMTP firewall restrictions).
    """
    api_key = os.getenv("RESEND_API_KEY", "").strip()
    from_email = os.getenv("RESEND_FROM_EMAIL", "").strip() or "onboarding@resend.dev"
    target_email = os.getenv("CONTACT_EMAIL", "harinandhini030506@gmail.com").strip()

    if not api_key:
        msg = "RESEND_API_KEY is not configured in backend environment variables."
        print(f"[Resend Notice] {msg}")
        return False, msg

    # Format from address cleanly (e.g. "Portfolio Contact <onboarding@resend.dev>")
    if "<" not in from_email:
        formatted_from = f"Portfolio Contact <{from_email}>"
    else:
        formatted_from = from_email

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

    body_html = f"""<!DOCTYPE html>
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
      You received this message because someone contacted you through your digital portfolio. Click &quot;Reply&quot; to respond directly to {html.escape(sender_email)}.
    </div>
  </div>
</body>
</html>"""

    payload = {
        "from": formatted_from,
        "to": [target_email],
        "reply_to": sender_email,
        "subject": f"[Portfolio Contact] {subject} - from {name}",
        "html": body_html,
        "text": body_text
    }

    req = urllib.request.Request(
        "https://api.resend.com/emails",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": "HariNandhini-Portfolio/1.0"
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=12) as response:
            status_code = response.getcode()
            resp_body = response.read().decode("utf-8")
            data = json.loads(resp_body) if resp_body else {}
            if status_code in (200, 201) and "id" in data:
                print(f"[Resend Success] Email accepted by Resend (ID: {data['id']}) for {target_email} from {sender_email}")
                return True, f"Email delivered successfully to {target_email}."
            else:
                return False, f"Resend API returned status {status_code}."
    except urllib.error.HTTPError as e:
        err_msg = ""
        try:
            err_data = json.loads(e.read().decode("utf-8"))
            err_msg = err_data.get("message", str(e))
        except Exception:
            err_msg = str(e)
        print(f"[Resend Error] HTTP {e.code}: {err_msg}")
        return False, f"Resend API error ({e.code}): {err_msg}"
    except urllib.error.URLError as e:
        print(f"[Resend Error] Network error: {e.reason}")
        return False, f"Could not connect to Resend API ({e.reason})."
    except Exception as e:
        print(f"[Resend Error] Unexpected failure: {str(e)}")
        return False, f"Unexpected delivery failure: {str(e)}"

@router.get("", response_model=dict, status_code=status.HTTP_200_OK)
@router.get("/", response_model=dict, status_code=status.HTTP_200_OK)
def get_contact_status():
    resend_key = os.getenv("RESEND_API_KEY", "").strip()
    resend_from = os.getenv("RESEND_FROM_EMAIL", "").strip()
    target_email = os.getenv("CONTACT_EMAIL", "harinandhini030506@gmail.com").strip()
    return {
        "status": "online",
        "service": "portfolio-contact-api",
        "endpoint": "POST /api/contact",
        "email_provider": "resend",
        "email_configured": bool(resend_key and resend_from),
        "target_email": target_email
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

    # Attempt email transmission via Resend HTTPS API
    email_dispatched, dispatch_detail = send_resend_email(
        name=sanitized_name,
        sender_email=email,
        subject=sanitized_subject,
        message=sanitized_message,
        timestamp=now
    )

    status_tag = "delivered" if email_dispatched else "delivery_failed_provider"

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
