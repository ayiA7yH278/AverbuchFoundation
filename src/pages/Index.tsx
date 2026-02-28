import { useEffect } from "react";
import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import Philosophy from "@/components/Philosophy";
import Inquiry from "@/components/Inquiry";
import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";
import abstractMid from "@/assets/abstract-mid.jpg";
import abstractBottom from "@/assets/abstract-bottom.jpg";

const Index = () => {
  useEffect(() => {
    // Handle hash navigation (e.g., when coming from Legal page)
    if (window.location.hash === "#inquire") {
      setTimeout(() => {
        const inquireSection = document.getElementById("inquire");
        if (inquireSection) {
          inquireSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />
      <Capabilities />
      <ParallaxImage src={abstractMid} alt="Abstract geometric forms" height="50vh" overlayOpacity={0.45} />
      <Philosophy />
      <ParallaxImage src={abstractBottom} alt="Abstract marble texture" height="40vh" overlayOpacity={0.5} />
      <Inquiry />
      <Footer />
    </div>
  );
};

export default Index;
