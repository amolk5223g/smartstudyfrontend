import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import {
  Brain,
  Clock,
  CheckCircle2,
  XCircle,
  PartyPopper,
  Search,
  Sparkles,
  Loader2,
} from "lucide-react";

const DEFAULT_QUIZ = [
  {
    question: "What is the derivative of x²?",
    options: ["x", "2x", "x²", "2x²"],
    correct: 1,
  },
  {
    question: "Which data structure uses FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correct: 1,
  },
  {
    question: "What is Newton's Second Law?",
    options: ["F = mv", "F = ma", "F = mg", "E = mc²"],
    correct: 1,
  },
];

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export default function QuizPage() {
  const [quizData, setQuizData] = useState(DEFAULT_QUIZ);
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [shaking, setShaking] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const generateAIQuiz = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content:
                  "You are a quiz generator. Generate 5 multiple choice questions on the given topic. Return ONLY a JSON array of objects with fields: question (string), options (array of 4 strings), and correct (index 0-3). No other text.",
              },
              {
                role: "user",
                content: `Topic: ${topic}`,
              },
            ],
            temperature: 0.7,
            response_format: { type: "json_object" },
          }),
        },
      );

      const data = await response.json();
      const content = JSON.parse(data.choices[0].message.content);
      // Groq might wrap it in a root object if asked for json_object
      const questions = Array.isArray(content)
        ? content
        : content.questions || Object.values(content)[0];

      if (Array.isArray(questions) && questions.length > 0) {
        setQuizData(questions);
        setStarted(true);
      }
    } catch (error) {
      console.error("AI Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = useCallback(() => {
    if (current < quizData.length - 1) {
      setCurrent((p) => p + 1);
      setSelected(null);
      setTimeLeft(15);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  }, [current, quizData.length]);

  useEffect(() => {
    if (!started || finished || showResult) return;
    if (timeLeft <= 0) {
      handleNext();
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, started, finished, showResult, handleNext]);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    const isCorrect = idx === quizData[current].correct;
    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
    setShowResult(true);
    setTimeout(handleNext, 1200);
  };

  const percentage = Math.round((score / quizData.length) * 100);
  const timerPercent = (timeLeft / 15) * 100;

  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[70vh] gap-8"
      >
        <GlassCard className="p-10 text-center max-w-md w-full relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={120} className="text-neon-purple" />
          </div>

          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl neon-gradient neon-glow-strong flex items-center justify-center relative z-10">
            <Brain className="text-primary-foreground" size={32} />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2 neon-gradient-text">
            Aetheris AI Studio
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            Generate a personalized institutional quiz on any topic using Groq
            AI.
          </p>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Enter topic (e.g. Quantum Physics, React Hooks)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-xl px-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-neon-purple/50 transition-all text-white placeholder:text-muted-foreground/50"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            {isGenerating && (
              <Loader2
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neon-purple animate-spin"
                size={18}
              />
            )}
          </div>

          <div className="flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isGenerating || !topic.trim()}
              onClick={generateAIQuiz}
              className="w-full py-4 rounded-xl neon-gradient text-primary-foreground font-display font-bold text-sm neon-glow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? "Synthesizing Knowledge..." : "Generate AI Quiz"}
              {!isGenerating && <Sparkles size={14} />}
            </motion.button>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">
              OR
            </p>
            <button
              onClick={() => {
                setQuizData(DEFAULT_QUIZ);
                setStarted(true);
              }}
              className="text-xs font-display text-muted-foreground hover:text-white transition-colors py-2"
            >
              Start Default Institutional Quiz
            </button>
          </div>
        </GlassCard>
      </motion.div>
    );
  }

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center min-h-[60vh]"
      >
        <GlassCard className="p-10 text-center max-w-md neon-glow-strong">
          {percentage === 100 && (
            <PartyPopper className="mx-auto text-neon-gold mb-4" size={48} />
          )}
          <motion.div className="animate-count-up">
            <span className="font-display text-6xl font-bold neon-gradient-text">
              {percentage}%
            </span>
          </motion.div>
          <p className="text-foreground font-display text-lg mt-2">
            {score}/{quizData.length} Correct
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            {percentage >= 80
              ? "Excellent work! 🎉"
              : percentage >= 50
                ? "Good effort! Keep practicing."
                : "Review recommended materials."}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setStarted(false);
              setCurrent(0);
              setScore(0);
              setFinished(false);
              setSelected(null);
              setTimeLeft(15);
              setShowResult(false);
            }}
            className="mt-6 px-6 py-2.5 rounded-lg neon-gradient text-primary-foreground font-display text-sm neon-glow"
          >
            Try Again
          </motion.button>
        </GlassCard>
      </motion.div>
    );
  }

  const q = quizData[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto flex flex-col justify-center min-h-[70vh]"
    >
      {/* Progress & Timer */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-display text-sm text-muted-foreground uppercase tracking-widest text-[10px]">
            Topic: {topic || "Institutional"}
          </span>
          <span className="font-display text-sm text-muted-foreground">
            {current + 1} / {quizData.length}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full holographic-timer"
            animate={{ width: `${timerPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          <GlassCard
            className={`p-10 mb-8 ${shaking ? "animate-shake" : ""} border-neon-purple/20 bg-neon-purple/5`}
            tiltIntensity={2}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-neon-purple/20 flex items-center justify-center text-neon-purple">
                <Brain size={16} />
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                Artificial Intelligence
              </span>
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight">
              {q.question}
            </h3>
          </GlassCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {q.options.map((opt, idx) => {
              let optionStyle =
                "border-border hover:border-neon-purple/50 hover:bg-neon-purple/5";
              if (showResult && idx === q.correct)
                optionStyle =
                  "border-neon-green bg-neon-green/10 text-neon-green";
              else if (showResult && idx === selected && idx !== q.correct)
                optionStyle = "border-neon-red bg-neon-red/10 text-neon-red";

              return (
                <motion.button
                  key={idx}
                  whileHover={!showResult ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  onClick={() => handleSelect(idx)}
                  className={`glass-surface p-5 rounded-xl border-2 text-left font-body text-sm transition-all flex items-center gap-4 ${optionStyle}`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg border border-border flex items-center justify-center text-xs font-display font-bold shrink-0 ${
                      showResult && idx === q.correct
                        ? "border-neon-green bg-neon-green/20"
                        : ""
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 font-medium">{opt}</span>
                  {showResult && idx === q.correct && (
                    <CheckCircle2
                      className="text-neon-green shrink-0"
                      size={20}
                    />
                  )}
                  {showResult && idx === selected && idx !== q.correct && (
                    <XCircle className="text-neon-red shrink-0" size={20} />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
