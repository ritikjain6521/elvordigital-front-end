import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      secret,
      to,
      subject,
      html,
      fromName,
      fromEmail,
      replyTo,
      smtpConfig,
    } = body;

    const expectedSecret =
      process.env.EMAIL_RELAY_SECRET || "elvordigital_smtp_relay_2026";
    if (secret !== expectedSecret) {
      return NextResponse.json(
        { success: false, error: "Unauthorized relay request" },
        { status: 401 }
      );
    }

    if (!to || !subject || !html) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: to, subject, html" },
        { status: 400 }
      );
    }

    const host = smtpConfig?.host || process.env.SMTP_HOST || "smtp.hostinger.com";
    const port = Number(smtpConfig?.port || process.env.SMTP_PORT || 587);
    const secure = port === 465;
    const user = smtpConfig?.user || process.env.SMTP_USER || "info@elvordigital.com";
    const pass = smtpConfig?.pass || process.env.SMTP_PASS || "";

    if (!user || !pass) {
      return NextResponse.json(
        { success: false, error: "SMTP credentials missing" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    const resolvedFromName = fromName || process.env.FROM_NAME || "ElvorDigital";
    const resolvedFromEmail =
      fromEmail || process.env.FROM_EMAIL || user || "info@elvordigital.com";
    const resolvedReplyTo =
      replyTo || process.env.REPLY_TO || "support@elvordigital.com";

    const info = await transporter.sendMail({
      from: `"${resolvedFromName}" <${resolvedFromEmail}>`,
      replyTo: resolvedReplyTo,
      to,
      subject,
      html,
    });

    return NextResponse.json({
      success: true,
      method: "vercel-smtp-relay",
      messageId: info.messageId,
      response: info.response,
    });
  } catch (err: any) {
    console.error("[Vercel SMTP Relay] Error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "SMTP relay failed" },
      { status: 500 }
    );
  }
}
