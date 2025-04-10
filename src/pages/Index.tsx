
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Speakers from "@/components/Speakers";
import Schedule from "@/components/Schedule";
import Venue from "@/components/Venue";
import Register from "@/components/Register";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Hero />
      <About />
      <Speakers />
      <Schedule />
      <Venue />
      <Register />
      <Footer />
    </div>
  );
};

export default Index;
