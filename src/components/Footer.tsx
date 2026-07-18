import { motion } from "motion/react";
import { Cpu, Send, Globe, Facebook, Youtube } from "lucide-react";

interface FooterProps {
  onScrollTo: (elementId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  return (
    <footer className="bg-[#040508] border-t border-white/5 py-12 lg:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center border border-brand-primary/30 shadow-[0_0_15px_rgba(163,230,53,0.15)]">
                <Cpu className="w-4 h-4 text-brand-primary" />
              </div>
              <div>
                <span className="font-display font-bold text-base tracking-wider text-white">
                  PRO <span className="text-brand-primary font-extrabold">DIGITAL°</span>
                </span>
                <span className="block text-[8px] text-gray-500 font-mono tracking-widest leading-none">
                  AUTOMATION NET
                </span>
              </div>
            </div>
            
            <p className="font-sans text-xs md:text-sm text-gray-500 max-w-sm leading-relaxed">
              Leading the market in low-overhead Counter-Strike 2 account automation and XP boosting protocols. Optimized for maximum yield with minimum footprint.
            </p>

            <div className="flex items-center gap-3.5 pt-2">
              <a 
                href="https://t.me/kim_san145" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#24A1DE] text-gray-400 hover:text-white flex items-center justify-center border border-white/5 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </a>
              <a 
                href="https://t.me/kim_san145" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#1877F2] text-gray-400 hover:text-white flex items-center justify-center border border-white/5 transition-all cursor-pointer"
                title="Facebook Community Link"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://t.me/kim_san145" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#FF0000] text-gray-400 hover:text-white flex items-center justify-center border border-white/5 transition-all cursor-pointer"
                title="YouTube Community Link"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-display font-extrabold text-xs text-white uppercase tracking-wider mb-4">
              Core Products
            </h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <button onClick={() => onScrollTo("features")} className="text-gray-500 hover:text-brand-primary transition-colors cursor-pointer">
                  PRO DIGITAL° Client
                </button>
              </li>
              <li>
                <a href="#bob-beta" onClick={(e) => { e.preventDefault(); alert("PRO DIGITAL° Beta invites are currently full!"); }} className="text-gray-500 hover:text-brand-primary transition-colors">
                  PRO DIGITAL° Scheduler
                </a>
              </li>
              <li>
                <button onClick={() => onScrollTo("calculator")} className="text-gray-500 hover:text-brand-primary transition-colors cursor-pointer">
                  ROI Profit Predictor
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo("dashboard")} className="text-gray-500 hover:text-brand-primary transition-colors cursor-pointer">
                  Active Lobbies Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-display font-extrabold text-xs text-white uppercase tracking-wider mb-4">
              Support & Community
            </h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <button onClick={() => onScrollTo("faq")} className="text-gray-500 hover:text-brand-primary transition-colors cursor-pointer">
                  Technical Documentation
                </button>
              </li>
              <li>
                <a href="https://t.me/kim_san145" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-primary transition-colors">
                  Telegram Help Desk
                </a>
              </li>
              <li>
                <a href="https://t.me/kim_san145" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-primary transition-colors">
                  Telegram Announcements
                </a>
              </li>
              <li>
                <button onClick={() => onScrollTo("pricing")} className="text-gray-500 hover:text-brand-primary transition-colors cursor-pointer">
                  Billing & Licensing
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimers & Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="block text-[11px] text-gray-600 font-sans">
              &copy; {new Date().getFullYear()} PRO DIGITAL Corp. All Rights Reserved.
            </span>
            <span className="block text-[10px] text-gray-700 font-sans mt-1 max-w-2xl leading-relaxed">
              Disclaimer: Counter-Strike 2, CS2, Steam, and Valve Corporation are registered trademarks of Valve Corporation. PRO DIGITAL Corp is independent software and is not endorsed or affiliated with Valve Corporation. Using automation tools carries risk; play responsibly in accordance with terms.
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-600 shrink-0">
            <Globe className="w-4 h-4 text-gray-700" />
            <span>Server region: Global CDN</span>
          </div>
        </div>
      </div>

      {/* Floating Join Telegram Community Button */}
      <motion.a
        href="https://t.me/kim_san145"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4.5 py-3 rounded-full bg-bg-secondary border border-white/10 hover:border-brand-primary/30 text-white font-mono text-xs font-bold transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] group cursor-pointer"
        style={{ boxShadow: "0 0 20px rgba(var(--brand-primary-rgb), 0.15)" }}
        id="floating-telegram-btn"
      >
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
        </div>
        <Send className="w-3.5 h-3.5 text-brand-primary -rotate-12 group-hover:rotate-0 transition-transform" />
        <span className="tracking-wider">JOIN TELEGRAM</span>
      </motion.a>
    </footer>
  );
}
