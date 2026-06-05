"use server";

import { sendBusinessQuoteRequest } from "@/lib/email";

export async function submitQuoteRequest(formData: {
  contactName: string;
  contactEmail: string;
  companyName: string;
  teamSize: string;
  needs: string;
}) {
  try {
    const { contactName, contactEmail, companyName, teamSize, needs } = formData;

    if (!contactName || !contactEmail || !companyName || !teamSize || !needs) {
      return { error: "Please fill in all fields" };
    }

    await sendBusinessQuoteRequest({
      contactName,
      contactEmail,
      companyName,
      teamSize,
      needs,
    });

    return { success: true };
  } catch (err: any) {
    console.error("Quote request action error:", err);
    return { error: err.message || "Something went wrong. Please try again." };
  }
}
