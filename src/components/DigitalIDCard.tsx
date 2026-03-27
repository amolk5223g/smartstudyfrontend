import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, QrCode, MapPin, Hash, User } from "lucide-react";

interface DigitalIDCardProps {
  name: string;
  collegeId: string;
  division: string;
  className?: string;
  skin?: "default" | "diamond" | "obsidian";
}

export default function DigitalIDCard({ name, collegeId, division, className = "", skin = "default" }: DigitalIDCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const skinStyles = {
    default: "border-neon-blue/30 neon-glow",
    diamond: "border-cyan-200/50 shadow-[0_0_30px_rgba(165,243,252,0.4)] bg-gradient-to-br from-white/10 to-cyan-500/10",
    obsidian: "border-slate-800/80 shadow-[0_0_30px_rgba(0,0,0,0.8)] bg-slate-950/90",
  }[skin];

  const barStyles = {
    default: "neon-gradient",
    diamond: "bg-gradient-to-r from-cyan-300 via-white to-blue-400",
    obsidian: "bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900",
  }[skin];

  return (
    <div 
      className={`perspective-1000 w-full max-w-[320px] h-[200px] cursor-pointer ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className={`absolute inset-0 backface-hidden glass-surface-strong rounded-2xl border overflow-hidden transition-all duration-500 ${skinStyles}`}>
          <div className={`absolute top-0 left-0 w-full h-1 ${barStyles}`} />
          <div className="p-5 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`font-display font-bold text-lg tracking-tight ${skin === "obsidian" ? "text-purple-400" : "neon-gradient-text"}`}>INSTITUTIONAL ID</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Aetheris Digital Identity</p>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center neon-glow ${barStyles}`}>
                <GraduationCap className="text-white" size={20} />
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 rounded-full border-2 border-neon-blue/50 p-1">
                <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center text-neon-blue">
                  <User size={28} />
                </div>
              </div>
              <div>
                <p className="font-display font-bold text-base text-foreground">{name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                    STUDENT
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center gap-1.5">
                <Hash size={12} className="text-neon-blue" />
                <span className="text-[10px] text-muted-foreground uppercase font-medium">ID:</span>
                <span className="text-[10px] font-bold text-foreground">{collegeId}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-neon-purple" />
                <span className="text-[10px] text-muted-foreground uppercase font-medium">DIV:</span>
                <span className="text-[10px] font-bold text-foreground">{division}</span>
              </div>
            </div>
          </div>
          
          {/* Holographic light effect */}
          <motion.div 
            className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 pointer-events-none"
            animate={{ left: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 backface-hidden glass-surface-strong rounded-2xl border border-neon-purple/30 overflow-hidden neon-glow"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple to-neon-pink" />
          <div className="p-5 h-full flex flex-col items-center justify-center text-center">
            <div className="bg-white p-2 rounded-lg mb-3">
              <QrCode size={80} className="text-slate-900" />
            </div>
            <p className="text-[10px] text-muted-foreground max-w-[200px]">
              Scan to verify credentials via Aetheris Institutional Protocol
            </p>
            <div className="mt-4 flex gap-3">
               <div className="w-6 h-6 rounded bg-neon-blue/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse-neon" />
               </div>
               <span className="text-[10px] text-neon-blue font-bold tracking-widest uppercase py-1">Secure Active</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
