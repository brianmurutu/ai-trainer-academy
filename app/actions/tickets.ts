"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendNewTicketNotificationEmail } from "@/lib/email";
import { revalidatePath } from "next/cache";

export type SupportTicket = {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  status: "open" | "resolved" | "closed";
  created_at: string;
  updated_at: string;
};

// Guard — require authenticated user
async function requireUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized: You must be logged in to manage support tickets.");
  }
  return user;
}

/**
 * Create a new support ticket and send email notification to the administrator.
 */
export async function createSupportTicket(
  subject: string,
  message: string
): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    const user = await requireUser();
    
    if (!subject?.trim() || !message?.trim()) {
      return { success: false, message: "", error: "Subject and message are required." };
    }

    const supabase = await createClient();
    const { data: ticket, error: insertError } = await supabase
      .from("support_tickets")
      .insert({
        user_id: user.id,
        subject: subject.trim(),
        message: message.trim(),
        status: "open",
      })
      .select()
      .single();

    if (insertError) {
      console.error("[createSupportTicket] DB Insert Error:", insertError);
      return { success: false, message: "", error: insertError.message };
    }

    // Send notification email to admin using service role permissions
    try {
      const learnerName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Learner";
      const learnerEmail = user.email || "";

      await sendNewTicketNotificationEmail({
        learnerName,
        learnerEmail,
        ticketSubject: ticket.subject,
        ticketMessage: ticket.message,
        ticketId: ticket.id,
      });
    } catch (emailErr) {
      console.error("[createSupportTicket] Admin email notification failed:", emailErr);
      // Don't fail the user request if the admin notification email fails
    }

    revalidatePath("/dashboard/support");
    return { success: true, message: "Support ticket raised successfully!" };
  } catch (err: any) {
    console.error("[createSupportTicket] Error:", err);
    return { success: false, message: "", error: err.message || "Failed to create support ticket." };
  }
}

/**
 * Fetch all support tickets raised by the current authenticated learner.
 */
export async function getLearnerTickets(): Promise<SupportTicket[]> {
  try {
    const user = await requireUser();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("support_tickets")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[getLearnerTickets] DB Fetch Error:", error);
      return [];
    }

    return (data || []) as SupportTicket[];
  } catch (err) {
    console.error("[getLearnerTickets] Error:", err);
    return [];
  }
}
