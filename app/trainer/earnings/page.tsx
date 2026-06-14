import { getTrainerBookings, TrainerBookingMapped } from "@/app/actions/bookings";
import TrainerEarningsClient from "./TrainerEarningsClient";

export const dynamic = "force-dynamic";

export default async function TrainerEarningsPage() {
  const bookings = await getTrainerBookings();
  return <TrainerEarningsClient bookings={bookings} />;
}
