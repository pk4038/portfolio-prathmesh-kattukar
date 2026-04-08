import { useEffect } from "react";

export const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add stagger delay to children with fade-up inside observed containers
            const el = entry.target as HTMLElement;
            el.classList.add("visible");

            // Stagger children that have .stagger-child class
            const children = el.querySelectorAll(".stagger-child");
            children.forEach((child, i) => {
              (child as HTMLElement).style.transitionDelay = `${i * 100}ms`;
              child.classList.add("visible");
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};
