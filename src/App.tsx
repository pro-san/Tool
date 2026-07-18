import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Calculator from "./components/Calculator";
import DashboardMock from "./components/DashboardMock";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import PurchaseModal from "./components/PurchaseModal";

export default function App() {
  const [isPurchaseOpen, setIsPurchaseOpen] = useState<boolean>(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const handleScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleOpenPurchase = (planId?: string) => {
    if (planId) {
      setSelectedPlanId(planId);
    } else {
      setSelectedPlanId(null);
    }
    setIsPurchaseOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-bg-primary text-white overflow-x-hidden selection:bg-brand-primary/30 selection:text-brand-primary">
      {/* Decorative ambient glowing grids and shapes */}
      <div 
        className="absolute top-0 left-0 w-full h-[600px] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(ellipse at top, rgba(var(--brand-primary-rgb), 0.06), transparent 60%)' }}
      ></div>
      <div 
        className="absolute top-[1200px] right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(var(--brand-secondary-rgb), 0.04), transparent 70%)' }}
      ></div>

      {/* Global Navbar */}
      <Navbar 
        onScrollTo={handleScrollTo} 
        onOpenPurchase={handleOpenPurchase} 
      />

      {/* Hero Section */}
      <Hero onScrollTo={handleScrollTo} />

      {/* Tech & Specifications Bento */}
      <Features />

      {/* Interactive Live ROI Simulator */}
      <Calculator />

      {/* High-Fidelity Mock Desktop Client */}
      <DashboardMock />

      {/* Flexible Licensing Tiers */}
      <Pricing onOpenPurchase={handleOpenPurchase} />

      {/* Frequently Answered FAQ */}
      <FAQ />

      {/* Footer Column links & Legal Disclaimers */}
      <Footer onScrollTo={handleScrollTo} />

      {/* Payment Processing & Checkout modal */}
      <PurchaseModal 
        isOpen={isPurchaseOpen} 
        onClose={() => setIsPurchaseOpen(false)} 
        selectedPlanId={selectedPlanId} 
      />
    </div>
  );
}
