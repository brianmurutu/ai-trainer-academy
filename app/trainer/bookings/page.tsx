import { getTrainerBookings } from "@/app/actions/bookings";
import TrainerBookingsClient from "./TrainerBookingsClient";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function TrainerBookingsPage() {
  const bookings = await getTrainerBookings();
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let googleCalendarConnected = false;
  if (user) {
    const { data: trainer } = await supabase
      .from("trainers")
      .select("google_calendar_connected")
      .eq("user_id", user.id)
      .maybeSingle();
      
    googleCalendarConnected = !!trainer?.google_calendar_connected;
  }

  return (
    <TrainerBookingsClient 
      initialBookings={bookings} 
      googleCalendarConnected={googleCalendarConnected} 
    />
  );
}
