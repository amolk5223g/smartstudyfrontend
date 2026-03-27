import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import ProgressRing from "@/components/ProgressRing";
import Sidebar from "@/components/Sidebar";
import QuizPage from "@/pages/QuizPage";
import { useIsMobile } from "@/hooks/use-mobile";
import DigitalIDCard from "@/components/DigitalIDCard";
import AetherisCoin from "@/components/AetherisCoin";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { BookOpen, Play, FileText, Star, Trophy, Medal, User, School, Hash, Layers, Edit2, GraduationCap, CheckCircle2, Zap, Coins } from "lucide-react";

const SUBJECTS = [
  { id: 1, title: "Mathematics", progress: 72, materials: 12, color: "from-blue-500 to-cyan-400", division: "A" },
  { id: 2, title: "Physics", progress: 45, materials: 8, color: "from-purple-500 to-pink-500", division: "B" },
  { id: 3, title: "Computer Science", progress: 88, materials: 15, color: "from-green-400 to-emerald-500", division: "A" },
  { id: 4, title: "Chemistry", progress: 33, materials: 6, color: "from-orange-400 to-red-500", division: "C" },
  { id: 5, title: "English Literature", progress: 60, materials: 10, color: "from-indigo-500 to-purple-600", division: "B" },
  { id: 6, title: "Biology", progress: 91, materials: 14, color: "from-teal-400 to-cyan-500", division: "A" },
];

const LEADERBOARD = [
  { rank: 1, name: "Sarah Chen", score: 2840, avatar: "SC" },
  { rank: 2, name: "Alex Kumar", score: 2710, avatar: "AK" },
  { rank: 3, name: "Maria Santos", score: 2650, avatar: "MS" },
  { rank: 4, name: "James Park", score: 2520, avatar: "JP" },
  { rank: 5, name: "You", score: 2490, avatar: "YO" },
];

const RECOMMENDED = [
  { title: "Review: Quadratic Equations", subject: "Mathematics", type: "video", tokens: 50 },
  { title: "Practice: Thermodynamics", subject: "Physics", type: "pdf", tokens: 30 },
  { title: "Quiz Retry: Organic Chemistry", subject: "Chemistry", type: "quiz", tokens: 100 },
];

const PERFORMANCE_DATA = [
  { subject: 'Logic', A: 120, fullMark: 150 },
  { subject: 'Memory', A: 98, fullMark: 150 },
  { subject: 'Creativity', A: 86, fullMark: 150 },
  { subject: 'Consistency', A: 99, fullMark: 150 },
  { subject: 'Speed', A: 85, fullMark: 150 },
];

interface StudentDashboardProps {
  onLogout: () => void;
}

export default function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const isMobile = useIsMobile();

  const containerClass = isMobile ? "pb-20 px-4 pt-4" : "ml-64 p-8";

  const rankStyle = (rank: number) => {
    if (rank === 1) return "gold-glow border-2";
    if (rank === 2) return "silver-glow border-2";
    if (rank === 3) return "bronze-glow border-2";
    return "border border-border";
  };

  const [studentInfo, setStudentInfo] = useState({
    name: "Alex Johnson",
    division: "A",
    class: "TYCS",
    collegeId: "INST-2024-089",
    tokens: 450,
    consistency: 94,
    skin: "default" as const
  });

  const [isScanning, setIsScanning] = useState(false);
  const [hasAttended, setHasAttended] = useState(false);

  const handleAttendance = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasAttended(true);
    }, 2000);
  };

  const filteredSubjects = SUBJECTS.filter(s => s.division === studentInfo.division);

  return (
    <div className="min-h-screen">
      <Sidebar role="student" activeTab={activeTab} onTabChange={setActiveTab} onLogout={onLogout} />

      <main className={containerClass}>
        {activeTab === "dashboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold mb-1 neon-gradient-text">
                  Welcome, {studentInfo.name} | {studentInfo.division} - {studentInfo.class}
                </h2>
                <p className="text-muted-foreground text-sm tracking-wide">Your personalized institutional learning feed</p>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold">
                    {i === 3 ? "+12" : "SJ"}
                  </div>
                ))}
                <span className="ml-4 text-xs text-muted-foreground self-center">Online now</span>
              </div>
            </div>

            {/* Institutional Pulse & Tokens */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              <GlassCard className="lg:col-span-2 p-6 flex flex-col md:flex-row items-center gap-8 border-neon-blue/20 bg-neon-blue/5">
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg flex items-center gap-2 mb-2">
                    <Zap className="text-neon-blue animate-pulse" size={20} />
                    Aetheris Ledger
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">Real-time institutional consistency tracking</p>
                  
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-3xl font-bold font-display neon-gradient-text">{studentInfo.consistency}%</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Consistency Score</p>
                    </div>
                    <div className="h-12 w-[1px] bg-border" />
                    <div>
                      <button 
                         onClick={handleAttendance}
                         disabled={hasAttended || isScanning}
                         className={`px-6 py-2.5 rounded-lg font-display text-xs font-bold tracking-widest uppercase transition-all ${
                            hasAttended 
                              ? "bg-neon-green/10 text-neon-green border border-neon-green/20"
                              : "neon-gradient text-white neon-glow hover:scale-105 disabled:opacity-50"
                         }`}
                      >
                         {isScanning ? "Scanning..." : hasAttended ? "Marked Present" : "Pulse Scan"}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-48 h-48 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={PERFORMANCE_DATA}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                      <Radar
                        name="Alex"
                        dataKey="A"
                        stroke="hsl(var(--neon-blue))"
                        fill="hsl(var(--neon-blue))"
                        fillOpacity={0.4}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>

              <GlassCard className="p-6 flex flex-col items-center justify-center text-center border-neon-gold/20 bg-neon-gold/5">
                 <AetherisCoin className="-my-4" />
                 <h3 className="font-display font-bold text-xl neon-gradient-text mt-2">{studentInfo.tokens} Æ</h3>
                 <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Insight Tokens Earned</p>
                 <button className="mt-4 text-[10px] font-bold text-neon-blue uppercase tracking-widest hover:text-white transition-colors">
                    Visit Token Vault →
                 </button>
              </GlassCard>
            </div>

            {/* Subject Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {filteredSubjects.map((subject, i) => (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <GlassCard className="p-5 cursor-pointer group">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${subject.color} flex items-center justify-center`}>
                        <BookOpen className="text-primary-foreground" size={18} />
                      </div>
                      <ProgressRing percentage={subject.progress} size={52} strokeWidth={4} />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-1">{subject.title}</h3>
                    <p className="text-muted-foreground text-xs flex items-center gap-1">
                      <FileText size={12} /> {subject.materials} materials
                    </p>
                    <motion.div
                      className="mt-3 flex items-center gap-1 text-neon-blue text-xs font-display opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 4 }}
                    >
                      <Play size={12} /> Continue Learning
                    </motion.div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Recommended Section */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <Star className="text-neon-gold" size={18} />
                Recommended Review
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {RECOMMENDED.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <GlassCard className="p-4 cursor-pointer">
                      <p className="text-xs text-neon-purple font-display uppercase tracking-wider mb-1">{item.subject}</p>
                      <p className="text-foreground text-sm font-medium">{item.title}</p>
                      <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground uppercase">
                        {item.type}
                      </span>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "quiz" && <QuizPage />}

        {activeTab === "leaderboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <Trophy className="text-neon-gold" /> Leaderboard
            </h2>
            <div className="max-w-lg space-y-3">
              {LEADERBOARD.map((entry, i) => (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className={`p-4 flex items-center gap-4 ${rankStyle(entry.rank)}`} glowOnHover={false}>
                    <span className="font-display font-bold text-lg w-8 text-center text-muted-foreground">
                      {entry.rank <= 3 ? <Medal size={20} className={entry.rank === 1 ? "text-neon-gold" : entry.rank === 2 ? "text-muted-foreground" : "text-orange-400"} /> : `#${entry.rank}`}
                    </span>
                    <div className="w-9 h-9 rounded-full neon-gradient flex items-center justify-center text-primary-foreground font-display text-xs font-bold">
                      {entry.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-display font-medium text-sm text-foreground">{entry.name}</p>
                    </div>
                    <span className="font-display font-bold neon-gradient-text">{entry.score.toLocaleString()}</span>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "profile" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-display text-2xl font-bold mb-6 neon-gradient-text">Institutional Profile</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <DigitalIDCard 
                  name={studentInfo.name} 
                  collegeId={studentInfo.collegeId} 
                  division={studentInfo.division}
                  skin={studentInfo.skin}
                />
                <p className="text-xs text-center text-muted-foreground italic px-4">
                  Tap card to flip and view verification QR
                </p>

                <div className="p-4 rounded-xl border border-border bg-secondary/30">
                   <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Unlocked Skins</h4>
                   <div className="grid grid-cols-3 gap-2">
                      {["default", "diamond", "obsidian"].map((s) => (
                         <button 
                            key={s}
                            onClick={() => setStudentInfo({...studentInfo, skin: s as any})}
                            className={`h-12 rounded-lg border-2 transition-all ${
                               studentInfo.skin === s 
                                 ? "border-neon-blue bg-neon-blue/10" 
                                 : "border-transparent bg-secondary hover:border-border"
                            }`}
                         >
                            <div className={`w-full h-full rounded-md ${
                               s === "default" ? "neon-gradient" : 
                               s === "diamond" ? "bg-gradient-to-br from-cyan-200 to-blue-400" : 
                               "bg-slate-900"
                            }`} />
                         </button>
                      ))}
                   </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <GlassCard className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-display font-semibold text-lg flex items-center gap-2">
                      <Edit2 size={18} className="text-neon-blue" />
                      Edit Profile Details
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-display text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                          <User size={14} /> Full Name
                        </label>
                        <input 
                          type="text" 
                          defaultValue={studentInfo.name}
                          className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:border-neon-blue transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-display text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                          <Hash size={14} /> College ID
                        </label>
                        <input 
                          type="text" 
                          defaultValue={studentInfo.collegeId}
                          className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:border-neon-blue transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-display text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                          <Layers size={14} /> Division
                        </label>
                        <select className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:border-neon-blue transition-all">
                          <option selected={studentInfo.division === "A"}>A</option>
                          <option selected={studentInfo.division === "B"}>B</option>
                          <option selected={studentInfo.division === "C"}>C</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-display text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                          <School size={14} /> Class / Year
                        </label>
                        <input 
                          type="text" 
                          defaultValue={studentInfo.class}
                          className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:border-neon-blue transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-display text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                          <GraduationCap size={14} /> Batch
                        </label>
                        <input 
                          type="text" 
                          defaultValue="2021-2024"
                          className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:border-neon-blue transition-all"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button className="px-6 py-3 rounded-lg neon-gradient text-white font-display font-semibold text-sm neon-glow hover:scale-105 transition-transform">
                        Update Institutional Records
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
