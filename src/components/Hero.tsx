import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Play, Shield, Zap, RefreshCw, Trophy } from "lucide-react";

interface HeroProps {
  onScrollTo: (elementId: string) => void;
}

const AUTOMATION_PHRASES = [
  "Earn weekly case drops on complete autopilot.",
  "Run 10 to 500+ Steam accounts 24/7 simultaneously.",
  "Farm Profile XP and game rewards hands-free.",
  "Simulate human-like inputs with zero memory injections.",
  "Claim your share of the skin economy effortlessly."
];

export default function Hero({ onScrollTo }: HeroProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = AUTOMATION_PHRASES[currentPhraseIndex];

    const handleType = () => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setTypingSpeed(40); // Fast, snappy typing

        if (displayedText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2500); // Wait 2.5s before deleting
          return;
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        setTypingSpeed(20); // Faster deleting

        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % AUTOMATION_PHRASES.length);
          setTypingSpeed(100); // Short pause before typing next
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentPhraseIndex, typingSpeed]);

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 overflow-hidden grid-bg flex flex-col items-center justify-center">
      {/* Background radial gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-brand-primary/10 blur-[80px] pointer-events-none md:blur-[140px]"></div>
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] rounded-full bg-brand-secondary/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Anti-Cheat Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/5 border border-brand-primary/20 text-xs md:text-sm text-brand-primary font-mono mb-8"
          id="hero-security-badge"
        >
          <Shield className="w-4 h-4 text-brand-primary animate-pulse" />
          <span>RING-0 BYPASS & HUMAN SIMULATION ENGINE INCLUDED</span>
        </motion.div>

        {/* Core Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white mb-6 leading-[1.1]"
          id="hero-heading"
        >
          The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-glow-green">CS2 Case Farming</span> Machine
        </motion.h1>

        {/* Subtitle with Typing Animation */}
        <div className="max-w-3xl mx-auto mb-10" id="hero-subtext-container">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-base sm:text-xl text-gray-400 leading-relaxed mb-4"
            id="hero-subtext-main"
          >
            Automate 10 to 500+ Counter-Strike 2 accounts simultaneously with the world's most sophisticated cloud-ready client manager.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="inline-flex items-center justify-center gap-2 bg-brand-primary/[0.04] border border-brand-primary/25 rounded-2xl px-4 py-2.5 shadow-[0_0_15px_rgba(163,230,53,0.03)] w-full max-w-xl mx-auto min-h-[50px]"
            id="hero-typing-animation"
          >
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse shrink-0"></span>
            <span className="text-gray-500 uppercase tracking-widest text-[9px] md:text-[10px] font-mono font-extrabold shrink-0">
              AUTOMATION STATUS:
            </span>
            <span className="font-mono text-xs md:text-sm text-brand-primary text-glow-green text-left flex-1 truncate select-none leading-none">
              {displayedText}
              <span className="inline-block w-[2px] h-[1em] bg-brand-primary ml-1 animate-[pulse_0.8s_infinite] align-middle" />
            </span>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          id="hero-cta-container"
        >
          <button
            onClick={() => onScrollTo("pricing")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-sans font-bold text-base bg-brand-primary text-black hover:bg-brand-primary/95 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_25px_rgba(163,230,53,0.35)] cursor-pointer"
            id="hero-cta-buy"
          >
            Start Your Bot Farm
            <ArrowRight className="w-5 h-5 text-black" />
          </button>
          
          <button
            onClick={() => onScrollTo("dashboard")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-sans font-bold text-base bg-white/5 text-white hover:bg-white/10 border border-white/10 active:scale-95 transition-all cursor-pointer"
            id="hero-cta-demo"
          >
            <Play className="w-4 h-4 fill-white text-white" />
            Watch Live Demo
          </button>
        </motion.div>

        {/* Live Counter Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#090a0f] border border-white/5 max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
          id="hero-stats-panel"
        >
          {/* Subtle glow borders */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent"></div>
          
          <div className="text-center p-2 border-r border-white/5 last:border-0" id="stat-active-bots">
            <span className="block font-mono text-2xl md:text-3.5xl font-extrabold text-brand-primary tracking-wider">
              1,248
            </span>
            <span className="text-xs text-gray-500 font-sans font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping"></span>
              Live Bot Farms
            </span>
          </div>

          <div className="text-center p-2 border-r border-white/5 md:last:border-0" id="stat-cases-today">
            <span className="block font-mono text-2xl md:text-3.5xl font-extrabold text-white tracking-wider">
              43,892
            </span>
            <span className="text-xs text-gray-500 font-sans font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 mt-1">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              Drops Claimed Today
            </span>
          </div>

          <div className="text-center p-2 border-r border-white/5 last:border-0" id="stat-undetected">
            <span className="block font-mono text-2xl md:text-3.5xl font-extrabold text-brand-secondary tracking-wider">
              640+
            </span>
            <span className="text-xs text-gray-500 font-sans font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 mt-1">
              <Shield className="w-3.5 h-3.5 text-brand-secondary" />
              Days Undetected
            </span>
          </div>

          <div className="text-center p-2 last:border-0" id="stat-avg-roi">
            <span className="block font-mono text-2xl md:text-3.5xl font-extrabold text-white tracking-wider">
              14 Days
            </span>
            <span className="text-xs text-gray-500 font-sans font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 mt-1">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              Average ROI Period
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
