"use server";

import { sendContactMessage } from "@/lib/email";

export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      return { error: "Please fill in all fields" };
    }

    await sendContactMessage({
      name,
      email,
      subject,
      message,
    });

    return { success: true };
  } catch (err: any) {
    console.error("Contact form submit error:", err);
    return { error: err.message || "Something went wrong. Please try again." };
  }
}
