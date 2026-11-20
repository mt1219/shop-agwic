"use server";

import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { Resend } from "resend";

export async function submitContact(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!email || !email.includes("@") || message.length < 2) {
    redirect("/contact?error=1");
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    await supabase.from("contact_submissions").insert({
      name: name || null,
      email,
      subject: subject || null,
      message,
    });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);
    try {
      await resend.emails.send({
        from: "AGWIC Contact <contact@shopagwic.com>",
        to: [
          process.env.CONTACT_NOTIFY_EMAIL ?? "your-personal-email@example.com",
        ],
        replyTo: email,
        subject: `New contact: ${subject || "No subject"}`,
        html: `
          <p><strong>From:</strong> ${name || "Anonymous"} (${email})</p>
          <p><strong>Subject:</strong> ${subject || "None"}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });
    } catch (e) {
      console.error("[contact] resend error:", e);
    }
  }

  redirect("/contact?submitted=1");
}
