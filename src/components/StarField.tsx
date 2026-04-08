import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  speed: number;
}

const STAR_COUNT = 80;
const ATTRACTION_RADIUS = 180;
const ATTRACTION_STRENGTH = 0.06;
const RETURN_STRENGTH = 0.03;

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Init stars
    starsRef.current = Array.from({ length: STAR_COUNT }, () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x, y, baseX: x, baseY: y,
        size: 1 + Math.random() * 1.5,
        opacity: 0.15 + Math.random() * 0.35,
        speed: 0.2 + Math.random() * 0.4,
      };
    });

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const getStarColor = () => {
      const style = getComputedStyle(document.documentElement);
      return style.getPropertyValue("--foreground").trim();
    };

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const hsl = getStarColor();
      const stars = starsRef.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const s of stars) {
        // Slow drift downward
        s.baseY += s.speed * 0.15;
        if (s.baseY > canvas.height + 10) {
          s.baseY = -10;
          s.baseX = Math.random() * canvas.width;
          s.x = s.baseX;
          s.y = s.baseY;
        }

        // Mouse attraction
        const dx = mx - s.x;
        const dy = my - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < ATTRACTION_RADIUS && dist > 20) {
          const force = (1 - dist / ATTRACTION_RADIUS) * ATTRACTION_STRENGTH;
          s.x += dx * force;
          s.y += dy * force;
        }

        // Return to base position
        s.x += (s.baseX - s.x) * RETURN_STRENGTH;
        s.y += (s.baseY - s.y) * RETURN_STRENGTH;

        // Draw
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${hsl} / ${s.opacity})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default StarField;
