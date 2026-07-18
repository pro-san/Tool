import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plan } from "../types";
import { PLANS_DATA } from "../data";
import { 
  X, Check, DollarSign, Wallet, ShieldCheck, RefreshCw, 
  Copy, ArrowRight, Award, Key, CreditCard, Bitcoin 
} from "lucide-react";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId: string | null;
}

export default function PurchaseModal({ isOpen, onClose, selectedPlanId }: PurchaseModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS_DATA[1]); // default to monthly
  const [paymentMethod, setPaymentMethod] = useState<"crypto" | "skins" | "card">("crypto");
  const [cryptoType, setCryptoType] = useState<"LTC" | "USDT" | "BTC">("LTC");
  
  // Checkout flow states
  const [checkoutStep, setCheckoutStep] = useState<"form" | "pending" | "success">("form");
  const [txProgress, setTxProgress] = useState<string>("");
  const [licenseKey, setLicenseKey] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  // Form Inputs
  const [email, setEmail] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("4111 2222 3333 4444");
  const [skinValue, setSkinValue] = useState<number>(50);

  useEffect(() => {
    if (selectedPlanId) {
      const found = PLANS_DATA.find(p => p.id === selectedPlanId);
      if (found) setSelectedPlan(found);
    }
  }, [selectedPlanId]);

  // Handle plan change
  const handlePlanSelect = (id: string) => {
    const found = PLANS_DATA.find(p => p.id === id);
    if (found) setSelectedPlan(found);
  };

  // Simulate payment processing
  const handleSimulatePayment = (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter a valid email address for license key delivery.");
      return;
    }

    setCheckoutStep("pending");
    
    // Step-by-step progress logging
    const steps = [
      "Initializing secure checkout tunnel...",
      paymentMethod === "crypto" 
        ? `Awaiting ${cryptoType} Mempool transmission...` 
        : paymentMethod === "skins" 
          ? "Waiting for Steam trade confirmation token..." 
          : "Authorizing credit transaction through Stripe gateway...",
      "Validating digital balance...",
      "Generating PRO DIGITAL° license credentials...",
      "Success! License finalized and emailed."
    ];

    let currentStep = 0;
    setTxProgress(steps[currentStep]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setTxProgress(steps[currentStep]);
      } else {
        clearInterval(interval);
        
        // Generate mock license key
        const randomHex = () => Math.random().toString(16).substring(2, 6).toUpperCase();
        const key = `PRO-DIGITAL-${randomHex()}-${randomHex()}-${randomHex()}-${randomHex()}`;
        setLicenseKey(key);
        setCheckoutStep("success");
      }
    }, 1500);
  };

  const copyLicense = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  // Addresses mapping
  const cryptoAddresses = {
    LTC: "M8XGfS3yLAmA9G9XnBzP93XzQj1Ue8XvNq",
    USDT: "0x7a3e635fb85b4d6ff87e14f2e9639e44",
    BTC: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Black backdrop blur */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer" 
        onClick={onClose}
        id="purchase-modal-backdrop"
      />

      <div className="bg-[#090a0f] border border-white/5 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative z-10" id="purchase-modal-box">
        {/* Header bar */}
        <div className="bg-[#050609] px-6 py-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-primary animate-pulse" />
            <h3 className="font-display font-extrabold text-base md:text-lg text-white">
              PRO DIGITAL° License Checkout
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            id="close-purchase-modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Flow */}
        <div className="p-6 md:p-8" id="purchase-modal-content">
          <AnimatePresence mode="wait">
            {/* Step 1: Input Form */}
            {checkoutStep === "form" && (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSimulatePayment}
                className="space-y-6"
              >
                {/* 1. Quick Plan Switcher */}
                <div>
                  <label className="font-display font-bold text-xs text-gray-400 uppercase tracking-wider block mb-2.5">
                    Select Your Plan Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {PLANS_DATA.map((plan) => (
                      <button
                        type="button"
                        key={plan.id}
                        onClick={() => handlePlanSelect(plan.id)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedPlan.id === plan.id
                            ? "bg-brand-primary/10 border-brand-primary text-white"
                            : "bg-white/5 border-white/5 text-gray-500 hover:bg-white/10 hover:text-white"
                        }`}
                        id={`checkout-plan-opt-${plan.id}`}
                      >
                        <span className="block font-sans text-xs font-bold">{plan.name}</span>
                        <span className="block font-mono text-[11px] text-brand-primary mt-1 font-semibold">{plan.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. License Delivery Email */}
                <div>
                  <label className="font-display font-bold text-xs text-gray-400 uppercase tracking-wider block mb-2">
                    License Delivery Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., alex@steamfarm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050609] border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-brand-primary focus:outline-none placeholder:text-gray-600 font-sans"
                  />
                  <span className="text-[10px] text-gray-500 font-sans mt-1.5 block">
                    Your login credentials, launcher files, and license key will be delivered instantly here.
                  </span>
                </div>

                {/* 3. Payment Method Switcher */}
                <div>
                  <label className="font-display font-bold text-xs text-gray-400 uppercase tracking-wider block mb-2.5">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "crypto", label: "Cryptocurrency", icon: Bitcoin },
                      { key: "skins", label: "CS2 Steam Skins", icon: Key },
                      { key: "card", label: "PayPal / Credit Card", icon: CreditCard },
                    ].map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <button
                          type="button"
                          key={method.key}
                          onClick={() => setPaymentMethod(method.key as any)}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            paymentMethod === method.key
                              ? "bg-brand-secondary/10 border-brand-secondary text-white"
                              : "bg-white/5 border-white/5 text-gray-500 hover:bg-white/10"
                          }`}
                          id={`checkout-method-${method.key}`}
                        >
                          <IconComponent className="w-5 h-5 text-gray-400" />
                          <span className="font-sans text-[10px] font-bold leading-tight">{method.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Payment Method Specific details */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-left">
                  {paymentMethod === "crypto" && (
                    <div className="space-y-3" id="crypto-checkout-details">
                      <div className="flex gap-2 mb-2">
                        {["LTC", "USDT", "BTC"].map((coin) => (
                          <button
                            type="button"
                            key={coin}
                            onClick={() => setCryptoType(coin as any)}
                            className={`px-3 py-1 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                              cryptoType === coin
                                ? "bg-brand-secondary text-black"
                                : "bg-white/5 text-gray-400"
                            }`}
                          >
                            {coin}
                          </button>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                        {/* Mock QR */}
                        <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center p-1 shrink-0">
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${cryptoAddresses[cryptoType]}`} 
                            alt="Payment QR" 
                            className="w-full h-full"
                          />
                        </div>
                        <div className="w-full">
                          <span className="block text-[10px] text-gray-500 font-sans uppercase">Transfer Exact Amount</span>
                          <span className="block font-mono text-sm font-bold text-white mt-0.5">
                            {selectedPlan.price} Worth of {cryptoType}
                          </span>
                          <span className="block text-[10px] text-gray-500 font-sans uppercase mt-2">Target Wallet Address</span>
                          <span className="block font-mono text-[10px] text-brand-secondary font-bold break-all mt-0.5 select-all">
                            {cryptoAddresses[cryptoType]}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "skins" && (
                    <div className="space-y-3" id="skins-checkout-details">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-300 font-sans">Required Skin Value:</span>
                        <span className="font-mono text-sm text-brand-primary font-bold">
                          +{selectedPlan.price}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
                        We accept skin trades via Steam API. Upon proceeding, we will initiate a peer-to-peer trade with our bot. Skins from CS2, Rust, or TF2 are supported.
                      </p>
                      <div>
                        <span className="block text-[10px] text-gray-500 font-sans uppercase mb-1">Steam Trade Offer Link URL</span>
                        <input
                          type="text"
                          placeholder="https://steamcommunity.com/tradeoffer/new/?partner=..."
                          className="w-full bg-[#050609] border border-white/10 rounded-lg px-3 py-1.5 font-mono text-xs text-white"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="space-y-3" id="card-checkout-details">
                      <div>
                        <span className="block text-[10px] text-gray-500 font-sans uppercase mb-1">Credit Card Number</span>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-[#050609] border border-white/10 rounded-lg px-3 py-1.5 font-mono text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="block text-[10px] text-gray-500 font-sans uppercase mb-1">Expiry MM/YY</span>
                          <input
                            type="text"
                            placeholder="12/28"
                            className="w-full bg-[#050609] border border-white/10 rounded-lg px-3 py-1.5 font-mono text-xs text-white"
                          />
                        </div>
                        <div>
                          <span className="block text-[10px] text-gray-500 font-sans uppercase mb-1">CVC</span>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full bg-[#050609] border border-white/10 rounded-lg px-3 py-1.5 font-mono text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-brand-primary text-black font-sans font-bold text-sm shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:bg-brand-primary/95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  id="checkout-submit-btn"
                >
                  Simulate License Payment (Free Checkout)
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </motion.form>
            )}

            {/* Step 2: Processing Payment Simulation */}
            {checkoutStep === "pending" && (
              <motion.div
                key="pending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <RefreshCw className="w-12 h-12 text-brand-secondary animate-spin" />
                <h4 className="font-display font-bold text-lg text-white">Simulating Payment Transaction</h4>
                <p className="font-mono text-xs text-gray-400 max-w-sm">
                  {txProgress}
                </p>
              </motion.div>
            )}

            {/* Step 3: Success & Key Delivery */}
            {checkoutStep === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-4 space-y-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-display font-extrabold text-2xl text-white">Payment Received!</h4>
                  <p className="font-sans text-sm text-gray-400">
                    Your mock transaction processed successfully. Email sent to <span className="text-white font-medium">{email}</span>.
                  </p>
                </div>

                {/* License key Box */}
                <div className="p-4 rounded-2xl bg-[#050609] border border-brand-primary/30 max-w-md mx-auto" id="checkout-license-box">
                  <span className="block text-[10px] text-gray-500 font-sans uppercase">Your PRO DIGITAL° License Key</span>
                  <div className="flex items-center justify-between gap-3 mt-1.5 bg-black/40 rounded-xl p-3 border border-white/5">
                    <span className="font-mono text-xs md:text-sm font-bold text-brand-primary select-all">
                      {licenseKey}
                    </span>
                    <button
                      onClick={copyLicense}
                      className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg transition-all flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      {copiedKey ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-brand-primary" />
                          <span className="text-[10px] font-bold text-brand-primary">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Post checkout instructions */}
                <div className="text-left max-w-md mx-auto space-y-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                  <h5 className="font-display font-bold text-xs text-white uppercase tracking-wider">How to Activate:</h5>
                  <ol className="list-decimal list-inside font-sans text-xs text-gray-400 space-y-1">
                    <li>Download the PRO DIGITAL° Client Launcher using the link below.</li>
                    <li>Launch the applet executable and select "Enter License Key".</li>
                    <li>Input the generated key to unlock your account dashboard.</li>
                  </ol>
                </div>

                {/* Download Launcher */}
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-4">
                  <a
                    href="https://mega.nz/file/XipQhT6K#GNMc8_aKx4d0JgjQDFy579IPpCPmRSt75V3yyC1h2X8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg bg-brand-primary text-black font-sans font-bold text-sm shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.3)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-center"
                  >
                    Download Launcher (.msi)
                  </a>
                  <button
                    onClick={() => {
                      setCheckoutStep("form");
                      onClose();
                    }}
                    className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-sans font-bold text-sm hover:bg-white/10 transition-all cursor-pointer"
                  >
                    Return to Page
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
