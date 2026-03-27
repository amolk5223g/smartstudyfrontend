import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  tiltIntensity?: number;
  glowOnHover?: boolean;
}

export default function GlassCard({ children, className = "", tiltIntensity = 10, glowOnHover = true }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / rect.height;
    const y = -(e.clientX - rect.left - rect.width / 2) / rect.width;
    setRotation({ x: x * tiltIntensity, y: y * tiltIntensity });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={isMobile ? {} : { rotateX: rotation.x, rotateY: rotation.y }}
      whileHover={isMobile ? { scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className={`glass-surface rounded-lg ${glowOnHover ? "hover:neon-glow" : ""} transition-shadow duration-300 ${isMobile ? "animate-pulse-neon" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
