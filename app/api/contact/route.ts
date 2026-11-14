import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { buildEnquiryHtml, buildEnquiryText } from "@/lib/email";

// Server-side contact endpoint. The Resend API key never reaches the browser.
export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().min(1).max(5000),
  company: z.string().optional().default(""), // honeypot — must stay empty
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check your name, email and message and try again." },
      { status: 400 },
    );
  }

  const { name, email, phone, message, company } = parsed.data;

  // A real visitor leaves the honeypot empty; quietly accept so bots don't retry.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const fromName = process.env.CONTACT_FROM_NAME || "Pius & Noble LP";

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { error: "The contact email service is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `${fromName} <${from}>`,
      to: [to],
      replyTo: email,
      subject: `Website enquiry — ${name}`,
      html: buildEnquiryHtml({ name, email, phone, message }),
      text: buildEnquiryText({ name, email, phone, message }),
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        { error: "We couldn't send your message just now." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your message just now." },
      { status: 500 },
    );
  }
}
