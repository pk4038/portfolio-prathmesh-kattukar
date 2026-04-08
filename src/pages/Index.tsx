import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StarField from "@/components/StarField";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <ScrollProgress />
      <Navbar />
      <StarField />
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Contact />
      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border">
        © 2026 Prathmesh Kattukar
      </footer>
    </main>
  );
};

export default Index;
