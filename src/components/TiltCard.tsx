import { useRef, useCallback, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
  const [transition, setTransition] = useState("transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)");
  const [spotlight, setSpotlight] = useState<string>("transparent");

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`);
    setTransition("transform 0.1s ease-out");
    setSpotlight(`radial-gradient(400px circle at ${x}px ${y}px, hsl(var(--primary) / 0.12), transparent 60%)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
    setTransition("transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)");
    setSpotlight("transparent");
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: `${transition}, background 0.2s ease`,
        transformStyle: "preserve-3d",
        willChange: "transform",
        background: spotlight,
      }}
      className={`tilt-card ${className}`}
    >
      {children}
    </div>
  );
};

export default TiltCard;
