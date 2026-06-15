import { getAdminTickets } from "@/app/actions/admin";
import TicketsClientPage from "./TicketsClientPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Support Tickets | Admin" };
export const dynamic = "force-dynamic";

export default async function AdminTicketsPage() {
  const tickets = await getAdminTickets();
  return <TicketsClientPage initialTickets={tickets} />;
}
