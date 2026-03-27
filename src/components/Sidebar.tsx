import { motion } from "framer-motion";
import { BookOpen, BarChart3, Trophy, Brain, LogOut, GraduationCap, Settings, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  role: "student" | "teacher";
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const studentTabs = [
  { id: "dashboard", label: "Dashboard", icon: BookOpen },
  { id: "quiz", label: "Quizzes", icon: Brain },
  { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  { id: "profile", label: "Profile", icon: User },
];

const teacherTabs = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "manage", label: "Manage", icon: Settings },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "profile", label: "Profile", icon: User },
];

export default function Sidebar({ role, activeTab, onTabChange, onLogout }: SidebarProps) {
  const isMobile = useIsMobile();
  const tabs = role === "student" ? studentTabs : teacherTabs;

  if (isMobile) {
    return (
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 glass-surface-strong border-t border-border"
      >
        <div className="flex items-center justify-around py-2 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                activeTab === tab.id ? "text-primary neon-gradient-text" : "text-muted-foreground"
              }`}
            >
              <tab.icon size={20} className={activeTab === tab.id ? "text-neon-blue" : ""} />
              <span className="text-[10px] font-display">{tab.label}</span>
            </button>
          ))}
          <button onClick={onLogout} className="flex flex-col items-center gap-1 p-2 text-muted-foreground">
            <LogOut size={20} />
            <span className="text-[10px] font-display">Exit</span>
          </button>
        </div>
      </motion.nav>
    );
  }

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="fixed left-0 top-0 bottom-0 w-64 glass-surface-strong border-r border-border z-50 flex flex-col"
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg neon-gradient flex items-center justify-center">
            <GraduationCap className="text-primary-foreground" size={22} />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg tracking-wide neon-gradient-text">AETHERIS</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
              {role === "student" ? "Student Portal" : "Teacher Studio"}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-display text-sm tracking-wide transition-all ${
              activeTab === tab.id
                ? "neon-gradient text-primary-foreground neon-glow"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-destructive hover:bg-secondary transition-all font-display text-sm"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </motion.aside>
  );
}
