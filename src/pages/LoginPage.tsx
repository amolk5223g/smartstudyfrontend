import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { GraduationCap, Mail, Lock, User, ArrowRight } from "lucide-react";

interface LoginPageProps {
  onLogin: (role: "student" | "teacher") => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 mx-auto mb-4 rounded-2xl neon-gradient neon-glow-strong flex items-center justify-center"
          >
            <GraduationCap className="text-primary-foreground" size={32} />
          </motion.div>
          <h1 className="font-display text-4xl font-bold tracking-wide neon-gradient-text">
            AETHERIS
          </h1>
          <p className="text-muted-foreground text-sm mt-1 tracking-[0.15em] uppercase">
            Next-Gen Learning Platform
          </p>
        </div>

        <GlassCard className="p-8" tiltIntensity={5}>
          {/* Role Toggle */}
          <div className="flex mb-6 p-1 rounded-lg bg-secondary">
            {(["student", "teacher"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-md text-sm font-display font-medium transition-all capitalize ${
                  role === r
                    ? "neon-gradient text-primary-foreground neon-glow"
                    : "text-muted-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isSignup ? "signup" : "login"}
              initial={{ opacity: 0, x: isSignup ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSignup ? -20 : 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {isSignup && (
                <>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  {role === "student" ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="College ID"
                            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all"
                          />
                        </div>
                        <div className="relative">
                          <select className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all appearance-none cursor-pointer">
                            <option value="">Division</option>
                            <option value="A">Div A</option>
                            <option value="B">Div B</option>
                            <option value="C">Div C</option>
                          </select>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Year / Class (e.g. FYCS, SYBMS)"
                          className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Employee ID"
                          className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent transition-all"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Department"
                          className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent transition-all"
                        />
                      </div>
                    </>
                  )}
                </>
              )}

              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg neon-gradient text-primary-foreground font-display font-semibold text-sm tracking-wide neon-glow flex items-center justify-center gap-2"
              >
                {isSignup ? "Create Institutional Account" : "Sign In"}
                <ArrowRight size={16} />
              </motion.button>
            </motion.form>
          </AnimatePresence>

          <p className="text-center mt-6 text-muted-foreground text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="ml-1 text-neon-blue hover:text-neon-purple transition-colors font-medium"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
