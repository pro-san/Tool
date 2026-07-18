import { motion } from "motion/react";
import { Plan } from "../types";
import { PLANS_DATA } from "../data";
import { Check, Shield, Award, HelpCircle, Flame } from "lucide-react";

interface PricingProps {
  onOpenPurchase: (planId?: string) => void;
}

export default function Pricing({ onOpenPurchase }: PricingProps) {
  return (
    <section id="pricing" className="py-20 lg:py-28 px-4 bg-[#090a0f] relative grid-bg">
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-brand-primary/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] rounded-full bg-brand-secondary/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-brand-primary font-mono text-xs md:text-sm font-semibold tracking-widest uppercase">
            CHOOSE YOUR SCALE
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mt-2 mb-4 tracking-tight">
            Flexible Plans for Every Farm
          </h2>
          <p className="font-sans text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Select the plan that fits your account portfolio. All subscriptions include complete anti-ban shield updates and launcher access. Secure payment handling.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {PLANS_DATA.map((plan, idx) => {
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 md:p-8 rounded-3xl flex flex-col justify-between border relative ${
                  plan.popular
                    ? "bg-bg-tertiary border-brand-primary scale-100 md:scale-[1.03]"
                    : "bg-bg-secondary/90 border-white/5"
                }`}
                style={plan.popular ? { boxShadow: "0 0 30px rgba(var(--brand-primary-rgb), 0.12)" } : undefined}
                id={`plan-card-${plan.id}`}
              >
                {/* Popular Ribbon */}
                {plan.popular && (
                  <div 
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-primary text-black font-sans font-extrabold text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full flex items-center gap-1.5"
                    style={{ boxShadow: "0 4px 15px rgba(var(--brand-primary-rgb), 0.3)" }}
                  >
                    <Flame className="w-3.5 h-3.5 fill-black" />
                    Most popular
                  </div>
                )}

                <div>
                  {/* Name & Limit */}
                  <div className="text-left">
                    <h3 className="font-display font-extrabold text-xl text-white">
                      {plan.name}
                    </h3>
                    <span className="text-xs text-gray-500 font-mono mt-1 block">
                      LIMIT: {plan.limit}
                    </span>
                  </div>

                  {/* Price Block */}
                  <div className="my-6 text-left flex items-baseline gap-1 border-b border-white/5 pb-6">
                    <span className="font-mono text-4xl md:text-5xl font-extrabold text-white">
                      {plan.price}
                    </span>
                    <span className="font-sans text-xs text-gray-500">
                      / {plan.period}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-4 text-left my-6">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 mt-0.5 border border-brand-primary/20">
                          <Check className="w-3.5 h-3.5 text-brand-primary" />
                        </div>
                        <span className="font-sans text-sm text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Purchase Button */}
                <button
                  onClick={() => onOpenPurchase(plan.id)}
                  className={`w-full py-4 rounded-xl font-sans font-bold text-sm transition-all cursor-pointer ${
                    plan.popular
                      ? "bg-brand-primary text-black hover:opacity-90 active:scale-95"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95"
                  }`}
                  style={plan.popular ? { boxShadow: "0 0 20px rgba(var(--brand-primary-rgb), 0.3)" } : undefined}
                  id={`btn-purchase-plan-${plan.id}`}
                >
                  Buy Access Key
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Security / Quality Badges */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left" id="pricing-trust-badges">
          <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex gap-4">
            <Shield className="w-10 h-10 text-brand-primary shrink-0 bg-brand-primary/5 p-2 rounded-lg border border-brand-primary/10" />
            <div>
              <h4 className="font-display font-bold text-sm text-white">Instant Key Delivery</h4>
              <p className="font-sans text-xs text-gray-400 mt-1 leading-relaxed">
                Your login and license token are sent straight to your email inbox immediately after payment approval.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex gap-4">
            <Award className="w-10 h-10 text-brand-secondary shrink-0 bg-brand-secondary/5 p-2 rounded-lg border border-brand-secondary/10" />
            <div>
              <h4 className="font-display font-bold text-sm text-white">Guaranteed Safe Code</h4>
              <p className="font-sans text-xs text-gray-400 mt-1 leading-relaxed">
                Clean and compiled assemblies. Every update undergoes rigorous anti-analysis telemetry tests.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex gap-4">
            <HelpCircle className="w-10 h-10 text-brand-primary shrink-0 bg-brand-primary/5 p-2 rounded-lg border border-brand-primary/10" />
            <div>
              <h4 className="font-display font-bold text-sm text-white">Refund Protection</h4>
              <p className="font-sans text-xs text-gray-400 mt-1 leading-relaxed">
                If our client is incompatible with your system hardware, our billing department issues a full credit refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
