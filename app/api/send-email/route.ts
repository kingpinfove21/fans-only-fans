import { NextResponse } from "next/server";
import Mailgun from "mailgun.js";
import FormData from "form-data";

export async function POST(request: Request) {
  try {
    const { to, subject, html } = await request.json();

    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY!,
    });

    const result = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: process.env.MAILGUN_FROM_EMAIL!,
      to: [to],
      subject: subject,
      html: html,
    });

    return NextResponse.json({ success: true, id: result.id });
  } catch (error: unknown) {
    console.error("Mailgun error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown Mailgun error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}