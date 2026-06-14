import { getTrainerBookings } from "@/app/actions/bookings";
import TrainerLearnersClient from "./TrainerLearnersClient";

export const dynamic = "force-dynamic";

export default async function TrainerLearnersPage() {
  const bookings = await getTrainerBookings();
  
  // Group bookings by learner
  const learnerMap = new Map();

  for (const b of bookings) {
    if (!learnerMap.has(b.learnerEmail)) {
      learnerMap.set(b.learnerEmail, {
        id: b.learnerEmail, // Fallback ID
        name: b.learnerName,
        email: b.learnerEmail,
        enrolledCourse: b.topic || "1-on-1 Consultation",
        sessionsCompleted: 0,
        hoursCompleted: 0,
        lastActive: b.date || "Unknown",
      });
    }

    const learner = learnerMap.get(b.learnerEmail);
    if (b.status === "completed" || b.status === "confirmed") {
      learner.sessionsCompleted += 1;
      // Duration is like "1 hour" or "1.5 hours"
      const hrs = parseFloat(b.duration) || 1;
      learner.hoursCompleted += hrs;
    }
  }

  const learners = Array.from(learnerMap.values());

  return <TrainerLearnersClient learners={learners} />;
}
