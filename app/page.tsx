import { AmbientBackground } from "@/components/ambient-background";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProcessSection } from "@/components/process-section";
import { ProjectsSection } from "@/components/projects-section";
import { ServicesSection } from "@/components/services-section";
import { StatsBar } from "@/components/stats-bar";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function HomePage() {
  return (
    <>
      <AmbientBackground />
      <Header />
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
