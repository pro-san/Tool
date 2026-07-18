import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { DollarSign, ShieldCheck, Zap, Info, ArrowUpRight, Award, RefreshCw } from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid
} from "recharts";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      day: number;
      label: string;
      Profit: number;
    };
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#050609] border border-brand-primary/30 px-3 py-2 rounded-xl shadow-lg">
        <p className="font-sans text-[10px] text-gray-400 font-semibold">Day {payload[0].payload.day}</p>
        <p className="font-mono text-xs text-brand-primary font-bold mt-0.5">
          ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    );
  }
  return null;
}

export default function Calculator() {
  const [accountCount, setAccountCount] = useState<number>(25);
  const [hoursPerDay, setHoursPerDay] = useState<number>(12);
  const [caseType, setCaseType] = useState<string>("average");
  const [includeElectricity, setIncludeElectricity] = useState<boolean>(true);
  const [electricityRate, setElectricityRate] = useState<number>(0.15); // $/kWh
  const [pcPower, setPcPower] = useState<number>(350); // Watts

  // Estimated stats
  const [weeklyRevenue, setWeeklyRevenue] = useState<number>(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
  const [electricityCost, setElectricityCost] = useState<number>(0);
  const [licenseCost, setLicenseCost] = useState<number>(0);
  const [netProfit, setNetProfit] = useState<number>(0);

  const casePrices: Record<string, number> = {
    gallery: 1.15,
    kilowatt: 0.95,
    revolution: 0.45,
    recoil: 0.35,
    average: 0.85,
  };

  useEffect(() => {
    // CS2 guarantees 1 case drop per account per week upon level up
    // Let's assume accounts get 1 case drop per week
    const casesPerWeek = accountCount * 1;
    const caseValue = casePrices[caseType];
    
    // Revenue calculations
    const revWeekly = casesPerWeek * caseValue;
    const revMonthly = revWeekly * 4.33; // average weeks in month

    // Electricity calculations
    // If running 24h, we consume: (pcPower / 1000) * hours * 7 * electricityRate
    let elecWeekly = 0;
    if (includeElectricity) {
      const kWhWeekly = (pcPower / 1000) * hoursPerDay * 7;
      elecWeekly = kWhWeekly * electricityRate;
    }

    // Dynamic License Cost
    // We match the pricing plans:
    // If <= 20 accounts: $14/week
    // If > 20 accounts: $39/month (converted to weekly: $39 / 4.33 = $9)
    let licWeekly = 14;
    if (accountCount > 20) {
      licWeekly = 39 / 4.33; // monthly is unlimited, so monthly rate divided by weeks
    }

    const netWeekly = revWeekly - elecWeekly - licWeekly;
    const netMonthly = netWeekly * 4.33;

    setWeeklyRevenue(revWeekly);
    setMonthlyRevenue(revMonthly);
    setElectricityCost(elecWeekly * 4.33);
    setLicenseCost(accountCount > 20 ? 39 : 14 * 4.33);
    setNetProfit(Math.max(0, netMonthly));
  }, [accountCount, hoursPerDay, caseType, includeElectricity, electricityRate, pcPower]);

  // Generate 30-day cumulative ROI trend
  const chartData = [];
  const dailyNetProfit = netProfit / 30;
  for (let day = 1; day <= 30; day++) {
    chartData.push({
      day: day,
      label: `Day ${day}`,
      Profit: parseFloat((dailyNetProfit * day).toFixed(2)),
    });
  }

  return (
    <section id="calculator" className="py-20 lg:py-28 px-4 bg-[#090a0f] relative grid-bg">
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] rounded-full bg-brand-secondary/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-brand-secondary font-mono text-xs md:text-sm font-semibold tracking-widest uppercase">
            ROI PREDICTOR
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mt-2 mb-4 tracking-tight">
            Calculate Your Bot Farm Revenue
          </h2>
          <p className="font-sans text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            See exactly how much passive income you can generate by scaling up your Counter-Strike account farm. Adjust the sliders to match your hardware and targets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Inputs Panel */}
          <div className="lg:col-span-7 bg-[#050609]/90 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              {/* Slider 1: Number of Accounts */}
              <div id="calculator-accounts-slider">
                <div className="flex items-center justify-between mb-3">
                  <label className="font-display font-bold text-sm md:text-base text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-brand-primary" />
                    Number of Steam Accounts
                  </label>
                  <span className="font-mono text-lg font-bold text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-3 py-1 rounded-lg">
                    {accountCount} Accs
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={accountCount}
                  onChange={(e) => setAccountCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                />
                <div className="flex justify-between text-[11px] font-mono text-gray-500 mt-2">
                  <span>5 (Starter)</span>
                  <span>50 (Pro)</span>
                  <span>100 (Enterprise)</span>
                  <span>200+ (Master)</span>
                </div>
              </div>

              {/* Slider 2: Running Hours */}
              <div id="calculator-hours-slider">
                <div className="flex items-center justify-between mb-3">
                  <label className="font-display font-bold text-sm md:text-base text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Operating Hours / Day
                  </label>
                  <span className="font-mono text-lg font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-lg">
                    {hoursPerDay} Hours
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="24"
                  step="1"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
                <div className="flex justify-between text-[11px] font-mono text-gray-500 mt-2">
                  <span>2 hrs (Casual)</span>
                  <span>12 hrs (Standard)</span>
                  <span>24 hrs (Continuous)</span>
                </div>
              </div>

              {/* Drop Selection */}
              <div id="calculator-drop-selector">
                <label className="font-display font-bold text-sm md:text-base text-white block mb-3">
                  Targeted Drop Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { key: "gallery", label: "Gallery Case", desc: "$1.15 each" },
                    { key: "kilowatt", label: "Kilowatt Case", desc: "$0.95 each" },
                    { key: "revolution", label: "Revolution Case", desc: "$0.45 each" },
                    { key: "recoil", label: "Recoil Case", desc: "$0.35 each" },
                    { key: "average", label: "Average Mix", desc: "$0.85 each" },
                  ].map((option) => (
                    <button
                      key={option.key}
                      onClick={() => setCaseType(option.key)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        caseType === option.key
                          ? "bg-brand-primary/10 border-brand-primary text-white"
                          : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                      }`}
                      id={`case-opt-${option.key}`}
                    >
                      <span className="block font-sans text-xs font-bold leading-tight">
                        {option.label}
                      </span>
                      <span className="block font-mono text-[10px] text-gray-500 mt-0.5">
                        {option.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Electricity Toggle & Costs */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-4" id="elec-options">
                <div className="flex items-center justify-between">
                  <label className="font-display font-semibold text-sm text-gray-300 flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeElectricity}
                      onChange={(e) => setIncludeElectricity(e.target.checked)}
                      className="rounded border-white/10 text-brand-primary focus:ring-brand-primary bg-white/5 w-4 h-4 cursor-pointer"
                    />
                    Include Power Costs
                  </label>
                  <span className="text-xs text-gray-500 font-mono">Electricity Tariff</span>
                </div>

                {includeElectricity && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <span className="block text-xs text-gray-500 font-sans mb-1.5">Tariff per kWh ($)</span>
                      <input
                        type="number"
                        step="0.01"
                        value={electricityRate}
                        onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 font-mono text-sm text-white focus:border-brand-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 font-sans mb-1.5">PC Watts Draw (Average)</span>
                      <input
                        type="number"
                        step="50"
                        value={pcPower}
                        onChange={(e) => setPcPower(parseInt(e.target.value) || 0)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 font-mono text-sm text-white focus:border-brand-primary focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex items-start gap-2.5 text-xs text-gray-500 leading-relaxed border-t border-white/5 pt-4">
              <Info className="w-4 h-4 text-brand-secondary shrink-0" />
              <p>
                Calculations assume 1 care-package case drop per Steam Account per week as guaranteed by Valve, and negligible hardware depreciation.
              </p>
            </div>
          </div>

          {/* Outputs/Visualizations Panel */}
          <div className="lg:col-span-5 bg-gradient-to-b from-brand-primary/10 via-bg-secondary to-bg-secondary border border-brand-primary/20 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden" id="calculator-results">
            {/* Glossy overlay */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(ellipse at top right, rgba(var(--brand-primary-rgb), 0.1), transparent)' }}
            ></div>

            <div className="relative z-10">
              <span className="text-[10px] font-mono text-brand-primary font-bold tracking-widest uppercase block mb-4">
                PROJECTED FARM GAINS
              </span>

              {/* Monthly Profit Large Callout */}
              <div className="mb-8" id="result-monthly-profit">
                <span className="text-xs text-gray-400 font-sans block">ESTIMATED NET PROFIT / MO</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-mono text-4xl md:text-5xl font-extrabold text-brand-primary tracking-tight">
                    ${netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="font-sans text-xs text-brand-primary font-bold">/ month</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-4" id="results-breakdown">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-xs text-gray-400 font-sans">Gross Revenue (Weekly)</span>
                  <span className="font-mono text-sm text-white font-semibold">
                    +${weeklyRevenue.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-xs text-gray-400 font-sans">Gross Revenue (Monthly)</span>
                  <span className="font-mono text-sm text-white font-semibold">
                    +${monthlyRevenue.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-xs text-gray-400 font-sans">Power Consumption Cost / Mo</span>
                  <span className="font-mono text-sm text-red-400">
                    -${electricityCost.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-xs text-gray-400 font-sans">Bob Prime License Fee / Mo</span>
                  <span className="font-mono text-sm text-red-400">
                    -${licenseCost.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3">
                  <span className="text-xs text-gray-300 font-semibold font-sans">Estimated Annual Profit</span>
                  <span className="font-mono text-base text-brand-secondary font-bold">
                    +${(netProfit * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr
                  </span>
                </div>
              </div>

              {/* 30-Day Cumulative ROI Trend Chart */}
              <div className="mt-6 pt-6 border-t border-white/5" id="calculator-chart-container">
                <span className="text-[10px] font-mono text-brand-primary font-bold tracking-widest uppercase block mb-3">
                  30-DAY CUMULATIVE ROI TREND
                </span>
                <div className="h-[120px] w-full" id="roi-recharts-line-chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                      <XAxis 
                        dataKey="day" 
                        stroke="rgba(255,255,255,0.2)" 
                        fontSize={10}
                        fontFamily="monospace"
                        tickLine={false}
                        axisLine={false}
                        ticks={[1, 10, 20, 30]}
                        tickFormatter={(value) => `Day ${value}`}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.2)" 
                        fontSize={10}
                        fontFamily="monospace"
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${Math.round(value)}`}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(163,230,53,0.1)', strokeWidth: 1 }} />
                      <Line 
                        type="monotone" 
                        dataKey="Profit" 
                        stroke="#a3e635" 
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, stroke: '#a3e635', strokeWidth: 1, fill: '#050609' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* CTA action card */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10" id="calculator-cta">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 mb-5">
                <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                  <ShieldCheck className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-white uppercase">Break-even: 1-2 weeks</h4>
                  <p className="font-sans text-[11px] text-gray-400 mt-0.5">Quick ROI with high market drop rates.</p>
                </div>
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById("pricing");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-4 rounded-xl bg-brand-primary text-black font-sans font-bold text-sm shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:bg-brand-primary/95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Claim Your License Now
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
