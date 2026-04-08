import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const hovered = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      const el = e.target as HTMLElement;
      const isInteractive = el.closest("a, button, .tilt-card, [role='button'], input, textarea, select");
      hovered.current = !!isInteractive;
    };

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (dotRef.current) {
        const size = hovered.current ? 40 : 12;
        const opacity = hovered.current ? 0.25 : 0.6;
        dotRef.current.style.transform = `translate(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px)`;
        dotRef.current.style.width = `${size}px`;
        dotRef.current.style.height = `${size}px`;
        dotRef.current.style.opacity = `${opacity}`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-primary mix-blend-screen"
      style={{
        width: 12,
        height: 12,
        opacity: 0.6,
        transition: "width 0.25s ease, height 0.25s ease, opacity 0.25s ease",
        boxShadow: "0 0 12px 4px hsl(var(--primary) / 0.4)",
      }}
    />
  );
};

export default CustomCursor;
