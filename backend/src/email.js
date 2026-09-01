const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
require("dotenv").config();

let transporter = null;

// Ensure logs directory exists for safety audit backup
const LOGS_DIR = path.join(__dirname, "..", "logs");
if (!fs.existsSync(LOGS_DIR)) {
  try {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  } catch (e) {}
}

function saveLocalLeadBackup(inquiry, status, reason = "") {
  try {
    const logPath = path.join(LOGS_DIR, "leads_backup.log");
    const entry = `[${new Date().toISOString()}] STATUS: ${status} | NAME: ${inquiry.name} | EMAIL: ${inquiry.email} | PHONE: ${inquiry.phone || "N/A"} | SERVICE: ${inquiry.service} | REASON: ${reason}\n`;
    fs.appendFileSync(logPath, entry, "utf-8");
  } catch (e) {
    console.error("Local backup write error:", e.message);
  }
}

function getTransporter() {
  const user = (process.env.SMTP_USER || "").trim();
  const rawPass = (process.env.SMTP_PASS || "").trim();
  const pass = rawPass.replace(/\s+/g, ""); // Auto-clean Google App Password spaces

  if (!user || !pass) {
    console.warn("⚠️ SMTP Notice: SMTP_USER or SMTP_PASS is missing in environment variables.");
    return null;
  }

  // Direct SSL port 465 with 5s fast timeout to prevent hanging on blocked firewalls
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: (process.env.SMTP_PORT || "465") === "465" || (process.env.SMTP_HOST || "").includes("gmail") || user.endsWith("@gmail.com"),
    connectionTimeout: 6000, // 6s connection timeout
    greetingTimeout: 5000,   // 5s greeting timeout
    socketTimeout: 8000,     // 8s socket timeout
    auth: {
      user: user,
      pass: pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

async function sendLeadNotification(inquiry) {
  const receiverEmail = process.env.NOTIFICATION_RECEIVER_EMAIL || "temp83725@gmail.com";
  const mailer = getTransporter();

  console.log(`\n📬 New Lead Received from: ${inquiry.name} (${inquiry.email})`);
  console.log(`🎯 Target Notification Receiver: ${receiverEmail}`);

  if (!mailer) {
    console.log("ℹ️ [Nodemailer Notice]: SMTP_USER or SMTP_PASS not set in backend/.env.");
    console.log(`   (Lead successfully stored in Neon PostgreSQL Database & logged to /logs/leads_backup.log)`);
    saveLocalLeadBackup(inquiry, "EMAIL_SKIPPED", "SMTP credentials pending in .env");
    return { success: true, delivered: false, reason: "SMTP credentials pending in .env" };
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #14171A; color: #F3F4F6; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #1E2227; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden; }
          .header { background: #14171A; padding: 24px 32px; border-bottom: 1px solid rgba(212,154,106,0.3); }
          .logo { font-size: 20px; font-weight: 700; color: #D49A6A; letter-spacing: 1px; }
          .sublogo { font-size: 10px; color: #8E98A5; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px; }
          .body-content { padding: 32px; }
          .title { font-size: 22px; color: #F3F4F6; margin-bottom: 20px; font-weight: 600; }
          .field-group { background: #14171A; border-radius: 14px; padding: 18px; margin-bottom: 14px; border: 1px solid rgba(255,255,255,0.06); }
          .label { font-size: 10px; color: #D49A6A; text-transform: uppercase; letter-spacing: 1.5px; font-weight: bold; margin-bottom: 4px; }
          .value { font-size: 15px; color: #F3F4F6; word-break: break-word; }
          .message-box { background: #16191D; border-left: 3px solid #D49A6A; padding: 16px; border-radius: 8px; font-style: italic; color: #D1D5DB; margin-top: 8px; }
          .btn-container { text-align: center; margin-top: 28px; }
          .btn { background: #D49A6A; color: #14171A; padding: 14px 28px; border-radius: 12px; font-weight: bold; font-size: 13px; text-decoration: none; display: inline-block; }
          .footer { padding: 20px 32px; text-align: center; font-size: 11px; color: #8E98A5; border-top: 1px solid rgba(255,255,255,0.08); }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">RENDER RITUALS</div>
            <div class="sublogo">Studio Lead Notification Center</div>
          </div>
          <div class="body-content">
            <div class="title">✨ New Client Project Inquiry Received</div>
            
            <div class="field-group">
              <div class="label">Client Full Name</div>
              <div class="value">${inquiry.name}</div>
            </div>

            <div class="field-group">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${inquiry.email}" style="color: #D49A6A; text-decoration: none;">${inquiry.email}</a></div>
            </div>

            <div class="field-group">
              <div class="label">Phone / WhatsApp</div>
              <div class="value">${inquiry.phone || "Not specified"}</div>
            </div>

            <div class="field-group">
              <div class="label">Requested Service / Scope</div>
              <div class="value">${inquiry.service || "General Spatial Inquiry"}</div>
            </div>

            <div class="field-group">
              <div class="label">Client Message & Brief</div>
              <div class="message-box">“${inquiry.message}”</div>
            </div>

            <div class="btn-container">
              <a href="mailto:${inquiry.email}?subject=Regarding Your Project with Render Rituals Studio" class="btn">
                Reply to ${inquiry.name}
              </a>
            </div>
          </div>
          <div class="footer">
            Received via Render Rituals Homepage Portal · Sent to ${receiverEmail}
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await mailer.sendMail({
      from: `"Render Rituals Leads" <${process.env.SMTP_USER}>`,
      to: receiverEmail,
      subject: `🔥 New Lead: ${inquiry.name} · ${inquiry.service || "Render Rituals"}`,
      html: htmlContent,
    });

    console.log(`📧 Nodemailer sent email successfully! MessageId: ${info.messageId}`);
    saveLocalLeadBackup(inquiry, "EMAIL_DELIVERED", `MessageId: ${info.messageId}`);
    return { success: true, delivered: true, messageId: info.messageId };
  } catch (err) {
    console.error("❌ Nodemailer send error:", err.message);
    saveLocalLeadBackup(inquiry, "EMAIL_FAILED", err.message);
    return { success: false, delivered: false, error: err.message };
  }
}

async function sendPasswordResetOtpEmail(recipientEmail, otp) {
  const mailer = getTransporter();

  console.log(`\n🔑 Password Reset OTP requested for: ${recipientEmail}`);

  if (!mailer) {
    console.log("ℹ️ [Nodemailer Notice]: SMTP_USER or SMTP_PASS not set in backend/.env.");
    return { success: false, error: "Email service not configured. Check SMTP credentials in .env." };
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #14171A; color: #F3F4F6; margin: 0; padding: 24px; }
          .container { max-width: 540px; margin: 0 auto; background: #1E2227; border-radius: 24px; border: 1px solid rgba(212,154,106,0.25); overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
          .header { background: #14171A; padding: 28px 32px; border-bottom: 1px solid rgba(255,255,255,0.08); text-align: center; }
          .logo { font-size: 22px; font-weight: 800; color: #D49A6A; letter-spacing: 2px; }
          .sublogo { font-size: 10px; color: #8E98A5; text-transform: uppercase; letter-spacing: 3px; margin-top: 6px; }
          .body-content { padding: 36px 32px; text-align: center; }
          .title { font-size: 20px; color: #F3F4F6; margin-bottom: 12px; font-weight: 600; }
          .desc { font-size: 13px; color: #9CA3AF; line-height: 1.6; margin-bottom: 28px; }
          .otp-card { background: #14171A; border: 2px dashed #D49A6A; border-radius: 16px; padding: 20px; margin: 0 auto 28px auto; max-width: 320px; }
          .otp-label { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #8E98A5; margin-bottom: 8px; font-weight: 600; }
          .otp-code { font-size: 34px; font-weight: 800; color: #D49A6A; letter-spacing: 8px; font-family: monospace; }
          .warning { font-size: 12px; color: #E5A97C; background: rgba(212,154,106,0.1); border-radius: 10px; padding: 12px; margin-bottom: 24px; }
          .footer { padding: 20px 32px; text-align: center; font-size: 11px; color: #6B7280; border-top: 1px solid rgba(255,255,255,0.08); }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">RENDER RITUALS</div>
            <div class="sublogo">Studio Security Center</div>
          </div>
          <div class="body-content">
            <div class="title">🔐 Admin Passcode Reset Request</div>
            <p class="desc">We received a request to reset the master admin passcode for your Render Rituals studio dashboard. Use the one-time verification code below:</p>
            
            <div class="otp-card">
              <div class="otp-label">One-Time Verification Code</div>
              <div class="otp-code">${otp}</div>
            </div>

            <div class="warning">
              ⏱️ This code is valid for <strong>10 minutes</strong>. Do not share this code with anyone.
            </div>

            <p style="font-size: 12px; color: #6B7280;">If you did not request this code, you can safely ignore this email. Your current passcode remains unchanged.</p>
          </div>
          <div class="footer">
            Render Rituals Architecture & 3D Spatial Design · Security Service
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await mailer.sendMail({
      from: `"Render Rituals Security" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: `🔐 ${otp} is your Render Rituals Admin Reset Code`,
      html: htmlContent,
    });

    console.log(`📧 OTP email sent successfully! MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("❌ Failed to send OTP email:", err.message);
    return { success: false, error: err.message };
  }
}

module.exports = { sendLeadNotification, sendPasswordResetOtpEmail };
