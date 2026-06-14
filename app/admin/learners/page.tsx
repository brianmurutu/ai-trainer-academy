import { getLearners } from "@/app/actions/admin";
import LearnersClientPage from "./LearnersClientPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Learners | Admin" };
export const dynamic = "force-dynamic";

export default async function AdminLearnersPage() {
  const learners = await getLearners();
  return <LearnersClientPage initialLearners={learners} />;
}
