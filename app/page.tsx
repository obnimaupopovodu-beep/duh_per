import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Advantages from "@/components/sections/Advantages";
import BookingForm from "@/components/sections/BookingForm";
import Contacts from "@/components/sections/Contacts";
import Hero from "@/components/sections/Hero";
import Reviews from "@/components/sections/Reviews";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="page-shell">
        <Hero />
        <About />
        <Services />
        <Advantages />
        <Reviews />
        <section
          id="booking"
          className="booking-band scroll-mt-28 border-t border-border/70 px-5 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Contacts />
            <BookingForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
