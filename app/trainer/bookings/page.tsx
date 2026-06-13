import { getTrainerBookings } from "@/app/actions/bookings";
import TrainerBookingsClient from "./TrainerBookingsClient";

export const dynamic = "force-dynamic";

export default async function TrainerBookingsPage() {
  const bookings = await getTrainerBookings();
  return <TrainerBookingsClient initialBookings={bookings} />;
}
