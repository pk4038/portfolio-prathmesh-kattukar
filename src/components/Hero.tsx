import { Download } from "lucide-react";
import { useState, useEffect } from "react";

const roles = ["Full-Stack Developer", "React Developer", "Next.js Developer", "UI Engineer"];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  const displayedText = roles[roleIndex].slice(0, charIndex);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 container px-6 flex flex-col items-center text-center gap-10">
        <div className="h-7 fade-up">
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            {displayedText}
          </span>
          <span className="inline-block w-[2px] h-5 bg-primary ml-0.5 animate-pulse align-middle" />
        </div>

        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 fade-up">
            Hey, I'm <span className="text-primary">Prathmesh</span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 fade-up">
            I build fast, clean, real-world web apps
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-up">
          <a
            href="#projects"
            className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition-opacity"
          >
            See My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-border text-foreground font-medium rounded-md hover:bg-secondary transition-colors"
          >
            Contact Me
          </a>
          <a
            href="/FullStack-PrathmeshKattukar.pdf"
            download
            className="px-6 py-3 border border-primary/30 text-primary font-medium rounded-md hover:bg-primary/10 transition-colors flex items-center gap-2"
          >
            <Download size={16} /> Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
