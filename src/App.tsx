import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Schedule from "./components/Schedule";
import Venue from "./components/Venue";
import DressCode from "./components/DressCode";
import RSVP from "./components/RSVP";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section - Wedding Invitation Style */}
        <Hero />

        {/* Countdown Timer */}
        <Countdown />

        {/* Wedding Day Schedule */}
        {/* <Schedule /> */}

        {/* Venue Information */}
        <Venue />

        {/* Dress Code */}
        {/* <DressCode /> */}

        {/* RSVP Form */}
        {/* <RSVP /> */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
