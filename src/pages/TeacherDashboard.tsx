import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Users, BookOpen, Brain, TrendingUp, Upload, Plus, FileText, School, Hash, Layers, Edit2, User, UserCheck, QrCode } from "lucide-react";

const STATS = [
  { label: "Total Students", value: "142", icon: Users, color: "from-blue-500 to-cyan-400" },
  { label: "Active Subjects", value: "6", icon: BookOpen, color: "from-purple-500 to-pink-500" },
  { label: "Quizzes Created", value: "24", icon: Brain, color: "from-green-400 to-emerald-500" },
  { label: "Avg. Score", value: "73%", icon: TrendingUp, color: "from-orange-400 to-red-500" },
];

const PERF_DATA = [
  { week: "W1", score: 65 }, { week: "W2", score: 72 }, { week: "W3", score: 68 },
  { week: "W4", score: 78 }, { week: "W5", score: 82 }, { week: "W6", score: 76 },
  { week: "W7", score: 85 }, { week: "W8", score: 88 },
];

const SUBJECT_SCORES = [
  { subject: "Math", avg: 78 }, { subject: "Physics", avg: 65 }, { subject: "CS", avg: 85 },
  { subject: "Chem", avg: 58 }, { subject: "English", avg: 72 }, { subject: "Bio", avg: 80 },
];

interface TeacherDashboardProps {
  onLogout: () => void;
}

export default function TeacherDashboard({ onLogout }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dragActive, setDragActive] = useState(false);
  const [isAttendanceActive, setIsAttendanceActive] = useState(false);
  const [teacherInfo] = useState({
    name: "Dr. Sarah Jenkins",
    department: "Computer Science",
    employeeId: "EMP-CS-2022-04",
  });
  const isMobile = useIsMobile();
  const containerClass = isMobile ? "pb-20 px-4 pt-4" : "ml-64 p-8";

  return (
    <div className="min-h-screen">
      <Sidebar role="teacher" activeTab={activeTab} onTabChange={setActiveTab} onLogout={onLogout} />

      <main className={containerClass}>
        {activeTab === "dashboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl font-bold mb-1 neon-gradient-text">Teacher Studio</h2>
            <p className="text-muted-foreground text-sm mb-8">Manage your courses and track student progress</p>

            {/* Stats & Quick Actions */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="flex-1 grid grid-cols-2 gap-4">
                {STATS.map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                    <GlassCard className="p-5">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                        <stat.icon className="text-primary-foreground" size={16} />
                      </div>
                      <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-muted-foreground text-xs">{stat.label}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              <GlassCard className="lg:w-80 p-6 flex flex-col justify-between border-neon-purple/20 bg-neon-purple/5">
                <div>
                  <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse-neon" />
                    Pulse Attendance
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Generate a secure session QR for students</p>
                </div>
                
                <div className="my-4 flex items-center justify-center">
                  {isAttendanceActive ? (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative p-3 bg-white rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                    >
                      <QrCode size={120} className="text-slate-950" />
                      <div className="absolute inset-0 border-2 border-neon-purple/50 rounded-xl animate-pulse" />
                    </motion.div>
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-secondary/50 border border-border border-dashed flex items-center justify-center text-muted-foreground">
                      <QrCode size={40} className="opacity-20" />
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setIsAttendanceActive(!isAttendanceActive)}
                  className={`w-full py-3 rounded-lg font-display text-xs font-bold tracking-widest uppercase transition-all ${
                    isAttendanceActive 
                      ? "bg-destructive/20 border border-destructive/50 text-destructive hover:bg-destructive/30" 
                      : "neon-gradient text-white neon-glow hover:scale-105"
                  }`}
                >
                  {isAttendanceActive ? "End Session" : "Start Pulse Session"}
                </button>
              </GlassCard>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard className="p-6" glowOnHover={false}>
                <h3 className="font-display font-semibold mb-4 text-foreground">Performance Trend</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={PERF_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" />
                    <XAxis dataKey="week" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                    <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "hsl(217, 33%, 12%)", border: "1px solid hsl(217, 33%, 20%)", borderRadius: "8px", color: "hsl(213, 31%, 91%)" }} />
                    <Line type="monotone" dataKey="score" stroke="url(#lineGrad)" strokeWidth={3} dot={{ fill: "hsl(238, 84%, 67%)", r: 4 }} />
                    <defs>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
                        <stop offset="100%" stopColor="hsl(271, 81%, 56%)" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </GlassCard>

              <GlassCard className="p-6" glowOnHover={false}>
                <h3 className="font-display font-semibold mb-4 text-foreground">Subject Averages</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={SUBJECT_SCORES}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" />
                    <XAxis dataKey="subject" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                    <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "hsl(217, 33%, 12%)", border: "1px solid hsl(217, 33%, 20%)", borderRadius: "8px", color: "hsl(213, 31%, 91%)" }} />
                    <Bar dataKey="avg" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(238, 84%, 67%)" />
                        <stop offset="100%" stopColor="hsl(271, 81%, 56%)" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>
            </div>
          </motion.div>
        )}

        {activeTab === "manage" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl font-bold mb-6 neon-gradient-text">Course Management</h2>

            {/* Institutional Targeting */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-display text-muted-foreground uppercase tracking-widest flex items-center gap-2 px-1">
                  <School size={14} className="text-neon-purple" /> Target Class
                </label>
                <select className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple transition-all appearance-none cursor-pointer">
                  <option value="">Select Year / Class</option>
                  <option value="FYCS">FYCS</option>
                  <option value="SYCS">SYCS</option>
                  <option value="TYCS">TYCS</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-display text-muted-foreground uppercase tracking-widest flex items-center gap-2 px-1">
                  <Layers size={14} className="text-neon-purple" /> Target Division
                </label>
                <select className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple transition-all appearance-none cursor-pointer">
                  <option value="">Select Division</option>
                  <option value="A">Division A</option>
                  <option value="B">Division B</option>
                  <option value="C">Division C</option>
                  <option value="All">All Divisions</option>
                </select>
              </div>
            </div>

            {/* Upload Zone */}
            <GlassCard
              className={`p-10 mb-8 border-2 border-dashed transition-all cursor-pointer text-center ${
                dragActive ? "border-neon-purple neon-glow animate-pulse-neon" : "border-border"
              }`}
              glowOnHover={false}
            >
              <div
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => setDragActive(false)}
              >
                <Upload className={`mx-auto mb-3 ${dragActive ? "text-neon-purple" : "text-muted-foreground"}`} size={40} />
                <p className="font-display font-semibold text-foreground">Drop files here to upload</p>
                <p className="text-muted-foreground text-sm mt-1">Files will be tagged for the selected group</p>
              </div>
            </GlassCard>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GlassCard className="p-6 cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg neon-gradient flex items-center justify-center neon-glow">
                    <Plus className="text-primary-foreground" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">Create New Subject</h3>
                    <p className="text-muted-foreground text-sm">Add a new course to your roster</p>
                  </div>
                </div>
              </GlassCard>
              <GlassCard className="p-6 cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <Brain className="text-primary-foreground" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">Create Quiz</h3>
                    <p className="text-muted-foreground text-sm">Build MCQ assessments</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}

        {activeTab === "profile" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-display text-2xl font-bold mb-6 neon-gradient-text">Institutional Profile</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <GlassCard className="p-6 text-center">
                   <div className="w-24 h-24 rounded-full neon-gradient mx-auto p-1 mb-4 neon-glow">
                      <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center text-primary-foreground">
                         <User size={48} />
                      </div>
                   </div>
                   <h3 className="font-display font-bold text-xl text-foreground">{teacherInfo.name}</h3>
                   <p className="text-neon-purple text-xs font-display uppercase tracking-widest mt-1">Institutional Faculty</p>
                   
                   <div className="mt-8 space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                         <div className="flex items-center gap-2 text-muted-foreground">
                            <School size={16} />
                            <span className="text-xs uppercase tracking-wider">Dept</span>
                         </div>
                         <span className="text-xs font-bold text-foreground">{teacherInfo.department}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                         <div className="flex items-center gap-2 text-muted-foreground">
                            <Hash size={16} />
                            <span className="text-xs uppercase tracking-wider">Emp ID</span>
                         </div>
                         <span className="text-xs font-bold text-foreground">{teacherInfo.employeeId}</span>
                      </div>
                   </div>
                   
                   <div className="mt-8 p-4 rounded-xl border border-neon-purple/20 bg-neon-purple/5 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                         <UserCheck size={18} className="text-neon-purple" />
                      </div>
                      <div className="text-left">
                         <p className="text-[10px] text-muted-foreground uppercase font-bold">Verification</p>
                         <p className="text-xs text-foreground font-semibold">Institutional SSO Active</p>
                      </div>
                   </div>
                </GlassCard>
              </div>

              <div className="lg:col-span-2">
                <GlassCard className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-display font-semibold text-lg flex items-center gap-2">
                      <Edit2 size={18} className="text-neon-purple" />
                      Faculty Records
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-display text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                          <User size={14} /> Teacher Name
                        </label>
                        <input 
                          type="text" 
                          defaultValue={teacherInfo.name}
                          className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-display text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                          <Hash size={14} /> Employee ID
                        </label>
                        <input 
                          type="text" 
                          defaultValue={teacherInfo.employeeId}
                          className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-display text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                         <School size={14} /> Department
                      </label>
                      <input 
                        type="text" 
                        defaultValue={teacherInfo.department}
                        className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple transition-all"
                      />
                    </div>

                    <div className="pt-4">
                      <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-neon-purple to-pink-600 text-white font-display font-semibold text-sm neon-glow hover:scale-105 transition-transform">
                        Update Faculty Credentials
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
