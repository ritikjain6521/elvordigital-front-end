import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://elvordigital-back-end.onrender.com"
)
  .replace(/\/api\/?$/, "")
  .replace(/\/+$/, "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderNumber } = body;

    if (!orderNumber) {
      return NextResponse.json(
        { success: false, error: "orderNumber is required" },
        { status: 400 }
      );
    }

    // 1. Fetch verified order from Render backend
    const orderRes = await fetch(
      `${BACKEND_URL}/api/orders/${encodeURIComponent(orderNumber)}`,
      { cache: "no-store" }
    );
    const orderData = await orderRes.json();

    if (!orderRes.ok || !orderData?.success || !orderData?.order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    const order = orderData.order;

    if (order.paymentStatus !== "paid") {
      return NextResponse.json(
        { success: false, error: "Order payment is not verified yet" },
        { status: 400 }
      );
    }

    if (order.emailSent) {
      return NextResponse.json({
        success: true,
        alreadySent: true,
        message: "Access email already dispatched for this order.",
      });
    }

    const customerEmail = order.customerEmail;
    const customerName = order.customerName || "Valued Customer";
    const items = order.items || [];
    const totalAmount = order.totalAmount || 0;

    if (!customerEmail) {
      return NextResponse.json(
        { success: false, error: "Customer email missing on order" },
        { status: 400 }
      );
    }

    const clientUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://elvordigital.com";

    const itemsHtml = items
      .map((item: any) => {
        const driveUrl = item.googleDriveLink?.trim() || "";
        const rawFolderUrl = item.accessFolderLink?.trim() || "";
        const folderUrl = rawFolderUrl
          ? rawFolderUrl.startsWith("/")
            ? `${clientUrl}${rawFolderUrl}`
            : rawFolderUrl
          : "";
        const rawDownloadUrl = item.downloadFileUrl?.trim() || "";
        const downloadUrl = rawDownloadUrl
          ? rawDownloadUrl.startsWith("http")
            ? rawDownloadUrl
            : `${BACKEND_URL}/${rawDownloadUrl.replace(/^\/+/, "")}`
          : "";
        const videoUrl = item.videoLink?.trim() || "";

        const buttons: string[] = [];

        if (driveUrl) {
          buttons.push(`
            <a href="${driveUrl}" target="_blank" style="display: inline-block; background-color: #8B5CF6; color: #ffffff; padding: 11px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px; margin-right: 8px; margin-bottom: 8px;">
              🚀 Open Google Drive Folder
            </a>
          `);
        }

        if (folderUrl) {
          buttons.push(`
            <a href="${folderUrl}" target="_blank" style="display: inline-block; background-color: #1e1b4b; border: 1px solid #6366F1; color: #a5b4fc; padding: 11px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px; margin-right: 8px; margin-bottom: 8px;">
              📁 Open Cloud Resource Folder
            </a>
          `);
        }

        if (videoUrl) {
          buttons.push(`
            <a href="${videoUrl}" target="_blank" style="display: inline-block; background-color: #be185d; color: #ffffff; padding: 11px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px; margin-right: 8px; margin-bottom: 8px;">
              🎬 Watch Video Lessons / Portal
            </a>
          `);
        }

        if (downloadUrl) {
          buttons.push(`
            <a href="${downloadUrl}" target="_blank" style="display: inline-block; background-color: #22D3EE; color: #000000; padding: 11px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px; margin-right: 8px; margin-bottom: 8px;">
              ⬇️ Download Master Deliverable
            </a>
          `);
        }

        if (buttons.length === 0) {
          buttons.push(`
            <a href="${clientUrl}/my-library?email=${encodeURIComponent(customerEmail)}" target="_blank" style="display: inline-block; background-color: #8B5CF6; color: #ffffff; padding: 11px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px; margin-bottom: 8px;">
              ⚡ Access in Customer Library Portal
            </a>
          `);
        }

        return `
          <div style="background-color: #17152E; border: 1px solid #332f5d; border-radius: 10px; padding: 18px; margin-bottom: 16px;">
            <h3 style="margin: 0 0 6px 0; color: #ffffff; font-size: 16px;">${item.productName}</h3>
            <p style="margin: 0 0 12px 0; color: #A7A3BC; font-size: 13px;">Format: ${item.format || "Digital Master"} • Price: ₹${item.price}</p>
            <div style="margin-top: 10px;">
              ${buttons.join("")}
            </div>
          </div>
        `;
      })
      .join("");

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #090816; color: #ffffff; padding: 30px; border-radius: 12px; max-width: 650px; margin: 0 auto; border: 1px solid #252249;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #8B5CF6; font-size: 26px; margin: 0;">🎉 Access Granted!</h1>
          <p style="color: #22D3EE; font-size: 14px; font-weight: bold; margin-top: 6px;">Order #${orderNumber} Confirmed</p>
        </div>

        <p style="color: #e2e8f0; font-size: 15px;">Hello <strong>${customerName}</strong>,</p>
        <p style="color: #A7A3BC; font-size: 14px; line-height: 1.6;">
          Your purchase has been verified and processed successfully. Your instant digital asset access and delivery links are ready below:
        </p>

        <div style="margin: 24px 0;">
          ${itemsHtml}
        </div>

        <div style="background-color: #121026; padding: 16px; border-radius: 8px; border: 1px solid #2c2754; font-size: 13px; color: #A7A3BC; margin-top: 24px;">
          <strong style="color: #ffffff;">Order Summary:</strong><br/>
          Order ID: <span style="font-family: monospace; color: #22D3EE;">${orderNumber}</span><br/>
          Amount Paid: ₹${totalAmount} (via Verified Gateway)<br/>
          License: Verified Commercial Creator & Lifetime Access
        </div>

        <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 30px;">
          Need assistance? Contact our VIP Help Desk at <a href="mailto:support@elvordigital.com" style="color: #8B5CF6;">support@elvordigital.com</a><br/>
          © 2026 ElvorDigital Marketplace Inc.
        </p>
      </div>
    `;

    const host = process.env.SMTP_HOST || "smtp.hostinger.com";
    const port = Number(process.env.SMTP_PORT || 587);
    const secure = port === 465;
    const user = process.env.SMTP_USER || "info@elvordigital.com";
    const pass = process.env.SMTP_PASS || "Ritikjain@1234";

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

    const info = await transporter.sendMail({
      from: `"ElvorDigital" <${user}>`,
      replyTo: process.env.REPLY_TO || "support@elvordigital.com",
      to: customerEmail,
      subject: `🎉 Access Granted: Your Order #${orderNumber} (${items[0]?.productName || "Digital Assets"})`,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      method: "vercel-order-smtp",
      to: customerEmail,
      messageId: info.messageId,
      response: info.response,
    });
  } catch (err: any) {
    console.error("[Send Order Email] Error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to dispatch order email" },
      { status: 500 }
    );
  }
}
