import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getDashboardData } from "@/lib/supabase/queries";
import LearnerCertificatesClient from "./LearnerCertificatesClient";
import { createHash } from "crypto";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Certificates | AI Trainer Academy",
};

export const dynamic = "force-dynamic";

export default async function LearnerCertificatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { certificates } = await getDashboardData(user.id);

  const mappedCertificates = certificates.map((c) => {
    // Generate a secure, deterministic verification signature hash
    const hashValue = `${user.id}-${c.course_id}-${c.id}`;
    const hash = "sha256-" + createHash("sha256").update(hashValue).digest("hex");

    return {
      id: c.id,
      title: c.course?.title ?? "Course Certificate",
      issuedDate: c.created_at
        ? new Date(c.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
        : "Recently",
      credentialId: `ATA-${c.course_id.slice(0, 6).toUpperCase()}`,
      instructor: c.course?.trainer_name ?? "AI Trainer Specialist",
      hash,
      color: c.course?.tag_color ?? "#6366F1",
      bg: c.course?.tag_bg ?? "#EEF2FF",
    };
  });

  return <LearnerCertificatesClient certificates={mappedCertificates} />;
}
