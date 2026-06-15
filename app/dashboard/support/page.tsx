import { getLearnerTickets } from "@/app/actions/tickets";
import SupportClientPage from "./SupportClientPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Tickets | AI Trainer Academy",
};
export const dynamic = "force-dynamic";

export default async function LearnerSupportPage() {
  const tickets = await getLearnerTickets();
  return <SupportClientPage initialTickets={tickets} />;
}
