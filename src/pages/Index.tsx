import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticleField from "@/components/ParticleField";
import LoginPage from "@/pages/LoginPage";
import StudentDashboard from "@/pages/StudentDashboard";
import TeacherDashboard from "@/pages/TeacherDashboard";

type AppState = { screen: "login" } | { screen: "student" } | { screen: "teacher" };

export default function Index() {
  const [state, setState] = useState<AppState>({ screen: "login" });

  const handleLogin = (role: "student" | "teacher") => {
    setState({ screen: role });
  };

  const handleLogout = () => setState({ screen: "login" });

  return (
    <>
      <ParticleField />
      <AnimatePresence mode="wait">
        <motion.div
          key={state.screen}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {state.screen === "login" && <LoginPage onLogin={handleLogin} />}
          {state.screen === "student" && <StudentDashboard onLogout={handleLogout} />}
          {state.screen === "teacher" && <TeacherDashboard onLogout={handleLogout} />}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
