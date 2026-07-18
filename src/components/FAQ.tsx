import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FAQS_DATA } from "../data";
import { FAQItem } from "../types";
import { ChevronDown, Search, HelpCircle, ArrowRight } from "lucide-react";

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<"all" | "general" | "security" | "technical" | "billing">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>("faq-1"); // Expand first by default

  const categories = [
    { label: "All Questions", value: "all" },
    { label: "General", value: "general" },
    { label: "Security & Anti-Cheat", value: "security" },
    { label: "Technical & PC", value: "technical" },
    { label: "Billing & Delivery", value: "billing" },
  ];

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesQuery = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 px-4 bg-[#050609] relative">
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-brand-secondary font-mono text-xs md:text-sm font-semibold tracking-widest uppercase">
            ANSWERS IN DETAIL
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mt-2 mb-4 tracking-tight">
            Frequently Answered FAQ
          </h2>
          <p className="font-sans text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Have questions about how PRO DIGITAL° isolates steam clients, hardware optimization, or ban security? Find your answers here.
          </p>
        </div>

        {/* Search Bar & Categories Grid */}
        <div className="space-y-6 mb-10" id="faq-search-filters">
          {/* Search bar */}
          <div className="relative max-w-lg mx-auto">
            <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#090a0f] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-brand-primary focus:outline-none transition-all placeholder:text-gray-500 font-sans"
            />
          </div>

          {/* Category Sub-Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value as any)}
                className={`px-3 py-1.5 rounded-xl font-sans text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.value
                    ? "bg-brand-secondary/15 text-brand-secondary border border-brand-secondary/30"
                    : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10"
                }`}
                id={`faq-tab-${cat.value}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 text-left" id="faq-accordion-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all ${
                    isExpanded
                      ? "bg-[#090a0f] border-brand-primary/20"
                      : "bg-white/[0.01] border-white/5 hover:bg-white/[0.02]"
                  }`}
                  id={`accordion-item-${faq.id}`}
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full p-5 md:p-6 flex items-center justify-between gap-4 font-display font-bold text-sm md:text-base text-white text-left cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${isExpanded ? "text-brand-primary" : "text-gray-500"}`} />
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-250 ${isExpanded ? "rotate-180 text-brand-primary" : "text-gray-500"}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 md:px-6 md:pb-6 text-xs md:text-sm font-sans text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center p-8 text-gray-500 font-sans" id="no-faq-results">
              No matching questions found. Try searching for "VAC", "proxy", or "requirements".
            </div>
          )}
        </div>

        {/* Support Callout Footer */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-brand-primary/5 via-brand-secondary/5 to-transparent border border-white/5 text-center flex flex-col md:flex-row items-center justify-between gap-4 text-left" id="faq-footer-callout">
          <div>
            <h4 className="font-display font-bold text-sm md:text-base text-white">Still have questions about PRO DIGITAL°?</h4>
            <p className="font-sans text-xs text-gray-400 mt-1">Our live support team is active 24/7 inside our Telegram community.</p>
          </div>
          <a
            href="https://t.me/kim_san145"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl font-sans font-bold text-xs bg-[#24A1DE] hover:bg-[#24A1DE]/90 text-white flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-black/30"
          >
            Join Telegram Support
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
