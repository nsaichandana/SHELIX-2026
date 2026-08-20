import Navbar from "./components/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import EventOverview from "./sections/EventOverview.jsx";
import EventStats from "./sections/EventStats.jsx";
import InnovationDomains from "./sections/InnovationDomains.jsx";
import HackathonJourney from "./sections/HackathonJourney.jsx";
import SubmissionRequirements from "./sections/SubmissionRequirements.jsx";
import HackathonRules from "./sections/HackathonRules.jsx";
import RegistrationCTA from "./sections/RegistrationCTA.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <main>
        <Hero />
        <EventOverview />
        <EventStats />
        <InnovationDomains />
        <HackathonJourney />
        <SubmissionRequirements />
        <HackathonRules />
        <RegistrationCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
