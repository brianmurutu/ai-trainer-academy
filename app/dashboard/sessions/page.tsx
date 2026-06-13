import { getLearnerSessions } from "@/app/actions/bookings";
import LearnerSessionsClient from "./LearnerSessionsClient";

export const dynamic = "force-dynamic";

export default async function LearnerSessionsPage() {
  const sessions = await getLearnerSessions();
  return <LearnerSessionsClient initialSessions={sessions} />;
}
