import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Trainers from "@/components/Trainers";
import Pricing from "@/components/Pricing";
import Payments from "@/components/Payments";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getTrainers } from "@/lib/supabase/queries";

export default async function Home() {
  const dbTrainers = await getTrainers();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Trainers dbTrainers={dbTrainers} />
        <Pricing />
        <Payments />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

