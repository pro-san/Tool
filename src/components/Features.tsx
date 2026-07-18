import { useState, ComponentType } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Feature } from "../types";
import { FEATURES_DATA } from "../data";
import { Cpu, Users, Zap, Key, Shield, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

// Icon mapping dictionary
const IconMap: Record<string, ComponentType<any>> = {
  Cpu: Cpu,
  Users: Users,
  Zap: Zap,
  Key: Key,
  Shield: Shield,
  TrendingUp: TrendingUp,
};

export default function Features() {
  const [activeCategory, setActiveCategory] = useState<"all" | "automation" | "performance" | "security" | "analytics">("all");
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(FEATURES_DATA[0]);

  const categories = [
    { label: "All Tech", value: "all" },
    { label: "Automation", value: "automation" },
    { label: "Resource optimization", value: "performance" },
    { label: "Security & Anti-Ban", value: "security" },
    { label: "Analytics & Loot", value: "analytics" },
  ];

  const filteredFeatures = activeCategory === "all"
    ? FEATURES_DATA
    : FEATURES_DATA.filter((f) => f.category === activeCategory);

  return (
    <section id="features" className="py-20 lg:py-28 px-4 bg-[#050609] relative">
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-accent/5 blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-brand-primary font-mono text-xs md:text-sm font-semibold tracking-widest uppercase">
            UNRIVALED TECHNOLOGY
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mt-2 mb-4 tracking-tight">
            Engineered for Massive Scale
          </h2>
          <p className="font-sans text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            PRO DIGITAL° is not just a bot. It is a full-featured automated client management cluster designed to extract maximum value from CS2 with minimal hardware load.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8" id="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value as any);
                  const matched = FEATURES_DATA.find(f => cat.value === "all" ? true : f.category === cat.value);
                  if (matched) setSelectedFeature(matched);
                }}
                className={`px-4 py-2 rounded-full font-sans text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.value
                    ? "bg-brand-primary text-black shadow-[0_0_15px_rgba(163,230,53,0.25)]"
                    : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white"
                }`}
                id={`cat-tab-${cat.value}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Grid & Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Feature Cards list */}
          <div className="lg:col-span-7 space-y-4" id="features-cards-list">
            <AnimatePresence mode="popLayout">
              {filteredFeatures.map((feature, idx) => {
                const IconComponent = IconMap[feature.iconName] || Cpu;
                const isSelected = selectedFeature?.id === feature.id;

                return (
                  <motion.div
                    key={feature.id}
                    layoutId={`feature-card-${feature.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    onClick={() => setSelectedFeature(feature)}
                    className={`p-5 rounded-2xl border transition-all duration-300 ease-out cursor-pointer flex gap-4 text-left group hover:scale-[1.015] ${
                      isSelected
                        ? "bg-bg-secondary border-brand-primary/40 shadow-[0_0_20px_rgba(var(--brand-primary-rgb),0.12)]"
                        : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-brand-primary/20 hover:shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.06)]"
                    }`}
                    id={`feature-card-${feature.id}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 transition-all ${
                      isSelected 
                        ? "bg-brand-primary/10 border-brand-primary/40 text-brand-primary" 
                        : "bg-white/5 border-white/10 text-gray-400 group-hover:text-white group-hover:border-white/20"
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-primary transition-colors">
                          {feature.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono uppercase text-gray-500">
                          {feature.category}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-gray-400 mt-1.5 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right Column: Deep-dive Detail Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-28" id="feature-detail-panel">
            <AnimatePresence mode="wait">
              {selectedFeature && (
                <motion.div
                  key={selectedFeature.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 md:p-8 rounded-3xl bg-bg-tertiary border border-white/5 shadow-2xl overflow-hidden relative"
                >
                  {/* Glowing decorative corner light */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-primary/5 blur-[40px] pointer-events-none"></div>

                  <span className="text-[10px] font-mono tracking-widest text-brand-primary uppercase font-bold flex items-center gap-1.5 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
                    ACTIVE COMPONENT: {selectedFeature.category}
                  </span>

                  <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white mb-4">
                    {selectedFeature.title}
                  </h3>

                  <p className="font-sans text-sm md:text-base text-gray-400 mb-6 leading-relaxed">
                    {selectedFeature.description}
                  </p>

                  <div className="border-t border-white/5 my-6"></div>

                  <h4 className="font-display font-semibold text-xs md:text-sm text-white uppercase tracking-wider mb-4">
                    Technical Specifications
                  </h4>

                  <ul className="space-y-3.5 mb-8">
                    {selectedFeature.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-3 text-left">
                        <CheckCircle className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                        <span className="font-sans text-sm text-gray-300 leading-relaxed">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      const el = document.getElementById("pricing");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-4 px-6 rounded-xl font-sans font-bold text-sm bg-white/5 border border-white/10 text-white hover:bg-brand-primary hover:text-black hover:border-brand-primary transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Deploy This Tech Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
