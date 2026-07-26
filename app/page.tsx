import { AmbientBackground } from "@/components/effects/AmbientBackground";
import { AboutSection } from "@/components/sections/AboutSection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <StatsBar />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <AboutSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
