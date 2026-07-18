import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Menu, X, Download } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface NavbarProps {
  onScrollTo: (elementId: string) => void;
  onOpenPurchase: (planId?: string) => void;
}

export default function Navbar({ onScrollTo, onOpenPurchase }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: "Features", id: "features" },
    { label: "ROI Calculator", id: "calculator" },
    { label: "Live Dashboard", id: "dashboard" },
    { label: "Pricing", id: "pricing" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-white/5 px-4 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          id="logo-container"
        >
          <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center border border-brand-primary/30 shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.15)]">
            <Cpu className="w-5 h-5 text-brand-primary animate-pulse" />
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-wider text-white">
              PRO <span className="text-brand-primary font-extrabold text-glow-green">DIGITAL°</span>
            </span>
            <span className="block text-[9px] text-gray-500 font-mono tracking-widest leading-none">
              AUTOMATION NET
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onScrollTo(item.id)}
              className="font-sans text-sm font-medium text-gray-400 hover:text-brand-primary transition-colors cursor-pointer"
              id={`nav-item-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Dynamic Theme Selector Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 hover:border-brand-primary/30 text-xs text-gray-400 hover:text-brand-primary bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer font-mono"
            title={`Switch to ${theme === "carbon" ? "Midnight" : "Carbon"} theme`}
            id="desktop-theme-toggle"
          >
            {theme === "carbon" ? (
              <>
                <div className="w-2.5 h-2.5 rounded-full bg-[#a3e635] shadow-[0_0_8px_rgba(163,230,53,0.8)]" />
                <span>CARBON</span>
              </>
            ) : (
              <>
                <div className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
                <span>MIDNIGHT</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono font-medium text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Undetected (v2.4.1)
          </div>
          <button
            onClick={() => onOpenPurchase()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans font-semibold text-sm bg-brand-primary text-black hover:opacity-90 transition-all cursor-pointer"
            style={{ boxShadow: "0 0 20px rgba(var(--brand-primary-rgb), 0.3)" }}
            id="nav-btn-buy"
          >
            <Download className="w-4 h-4" />
            Download Now
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Active
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            id="mobile-menu-btn"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-bg-secondary border-t border-white/5 mt-4 overflow-hidden rounded-b-xl"
            id="mobile-drawer"
          >
            <div className="flex flex-col gap-4 py-4 px-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setIsOpen(false);
                    onScrollTo(item.id);
                  }}
                  className="text-left font-sans text-base font-medium text-gray-300 hover:text-brand-primary px-3 py-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                  id={`mobile-nav-item-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Theme Toggle row */}
              <div className="border-t border-white/5 my-1 pt-3 flex items-center justify-between px-3">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Theme Profile</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-xs font-mono text-white cursor-pointer"
                  id="mobile-theme-toggle"
                >
                  {theme === "carbon" ? (
                    <>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#a3e635] shadow-[0_0_8px_rgba(163,230,53,0.8)]" />
                      <span>CARBON</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
                      <span>MIDNIGHT</span>
                    </>
                  )}
                </button>
              </div>

              <div className="border-t border-white/5 my-1"></div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenPurchase();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-brand-primary text-black font-semibold font-sans text-sm cursor-pointer"
                style={{ boxShadow: "0 0 15px rgba(var(--brand-primary-rgb), 0.2)" }}
                id="mobile-nav-buy-btn"
              >
                <Download className="w-4 h-4" />
                Download Launcher
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
