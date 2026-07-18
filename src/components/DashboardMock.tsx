import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MOCK_ACCOUNTS, MOCK_DROPS } from "../data";
import { AccountStatus, DropEvent } from "../types";
import { 
  Play, Pause, Plus, RefreshCw, AlertCircle, Info, Check, 
  Terminal, ShieldCheck, Database, Server, Compass, Layers,
  Coins, Package
} from "lucide-react";

export default function DashboardMock() {
  const [accounts, setAccounts] = useState<AccountStatus[]>(MOCK_ACCOUNTS);
  const [drops, setDrops] = useState<DropEvent[]>(MOCK_DROPS);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [headlessMode, setHeadlessMode] = useState<boolean>(true);
  const [systemLoad, setSystemLoad] = useState({ cpu: 14, ram: 2.4, gpu: 8 });
  const [weeklyProfit, setWeeklyProfit] = useState<number>(142.50);
  const [botStatus, setBotStatus] = useState<'Active' | 'Idle' | 'Updating'>('Active');
  const [logMessages, setLogMessages] = useState<string[]>([
    "[SYSTEM] PRO DIGITAL° launcher initialized successfully.",
    "[LICENSE] Key verified. 250 days remaining.",
    "[PROXIES] Checked 5 SOCKS5 proxies. All online and fast (average latency 45ms).",
    "[STEAM] Steam Guard integration active.maFiles loaded.",
    "[PRO-DIGITAL] All lobbies synchronized. Standing by for start command..."
  ]);

  // Simulate active background operations when 'isRunning' is true
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // 1. Simulate changing CPU/RAM metrics
      setSystemLoad((prev) => {
        const jitterCpu = Math.floor((Math.random() - 0.5) * 4);
        const jitterGpu = Math.floor((Math.random() - 0.5) * 2);
        return {
          cpu: Math.max(8, Math.min(25, prev.cpu + jitterCpu)),
          ram: parseFloat(Math.max(2.1, Math.min(2.8, prev.ram + (Math.random() - 0.5) * 0.1)).toFixed(1)),
          gpu: headlessMode ? Math.max(3, Math.min(10, prev.gpu + jitterGpu)) : Math.max(65, Math.min(85, prev.gpu + jitterGpu))
        };
      });

      // 2. Simulate XP progression or state shifts
      setAccounts((prevAccounts) => {
        return prevAccounts.map((acc) => {
          if (acc.status === "offline") return acc;

          let nextXp = acc.xpPercent + Math.floor(Math.random() * 8);
          let nextLevel = acc.level;
          let nextActivity = acc.currentActivity;
          let nextStatus = acc.status;
          let cases = acc.casesFarmed;

          if (nextXp >= 100) {
            nextXp = 0;
            nextLevel += 1;
            cases += 1;
            nextActivity = "Level up! Claiming Drop...";
            nextStatus = "idle";
            
            // Add custom drop event
            triggerSimulatedDrop(acc.username);
          } else {
            // Random small status rotations
            if (acc.status === "idle" && Math.random() > 0.7) {
              nextStatus = "queuing";
              nextActivity = "Queuing Competitive";
              addLog(`[MATCHMAKING] Account ${acc.username} has entered search queue.`);
            } else if (acc.status === "queuing" && Math.random() > 0.7) {
              nextStatus = "in-game";
              nextActivity = "Farming Vertigo 5v5";
              addLog(`[STEAM] Lobby filled. ${acc.username} connected to local dedicated match.`);
            }
          }

          return {
            ...acc,
            xpPercent: nextXp,
            level: nextLevel,
            casesFarmed: cases,
            currentActivity: nextActivity,
            status: nextStatus
          };
        });
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isRunning, headlessMode]);

  // Cycle botStatus between 'Active', 'Idle', and 'Updating' when running
  useEffect(() => {
    if (!isRunning) {
      setBotStatus('Idle');
      return;
    }

    const statuses: ('Active' | 'Idle' | 'Updating')[] = ['Active', 'Idle', 'Updating'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % statuses.length;
      const nextStatus = statuses[currentIndex];
      setBotStatus(nextStatus);
      addLog(`[SYSTEM] Client status transitioned to: ${nextStatus.toUpperCase()}`);
    }, 8000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogMessages((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 18)]);
  };

  const triggerSimulatedDrop = (username: string) => {
    const items = [
      { name: "Gallery Case", type: "case", value: 1.15, rarity: "common" },
      { name: "Kilowatt Case", type: "case", value: 0.95, rarity: "common" },
      { name: "AK-47 | Safari Mesh (FT)", type: "skin", value: 1.80, rarity: "uncommon" },
      { name: "Dreams & Nightmares Case", type: "case", value: 0.65, rarity: "common" },
      { name: "Recoil Case", type: "case", value: 0.35, rarity: "common" },
      { name: "P250 | Sand Dune (BS)", type: "skin", value: 0.08, rarity: "common" }
    ];

    const chosenItem = items[Math.floor(Math.random() * items.length)];
    const newDrop: DropEvent = {
      id: `drop-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      time: "Just now",
      account: username,
      itemName: chosenItem.name,
      itemType: chosenItem.type as any,
      marketValue: chosenItem.value,
      rarity: chosenItem.rarity as any
    };

    setDrops((prev) => [newDrop, ...prev.slice(0, 3)]);
    setWeeklyProfit((prev) => prev + chosenItem.value);
    addLog(`[Loot Claimed] ${username} received drop: ${chosenItem.name} ($${chosenItem.value.toFixed(2)})`);
  };

  const toggleHeadless = () => {
    const nextState = !headlessMode;
    setHeadlessMode(nextState);
    if (nextState) {
      addLog("[OPTIMIZATION] Headless No-Render engine ENABLED. GPU clock limits throttled down.");
      setSystemLoad(prev => ({ ...prev, gpu: 7 }));
    } else {
      addLog("[OPTIMIZATION] Headless No-Render engine DISABLED. Forcing full 3D viewport calculations!");
      setSystemLoad(prev => ({ ...prev, gpu: 72 }));
    }
  };

  const handleManualDropSimulation = () => {
    const randomAcc = accounts[Math.floor(Math.random() * accounts.length)];
    triggerSimulatedDrop(randomAcc.username);
  };

  return (
    <section id="dashboard" className="py-20 lg:py-28 px-4 bg-bg-primary relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-primary/5 blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-brand-primary font-mono text-xs md:text-sm font-semibold tracking-widest uppercase">
            SOFTWARE IN ACTION
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mt-2 mb-4 tracking-tight">
            PRO DIGITAL° Farm Management Panel
          </h2>
          <p className="font-sans text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            This is an active simulation of the actual desktop client interface. Monitor accounts, trigger automatic matchmaking lobbies, claim weekly drops, and check resource consumption in real-time.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="bg-bg-secondary border border-white/5 rounded-3xl overflow-hidden shadow-2xl" id="mock-dashboard-frame">
          
          {/* Top Panel Bar */}
          <div className="bg-bg-tertiary border-b border-white/5 p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left side actions */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => {
                  setIsRunning(!isRunning);
                  addLog(isRunning ? "[PROCESS] Automation scheduler PAUSED." : "[PROCESS] Automation scheduler STARTED.");
                }}
                className={`px-5 py-2.5 rounded-xl font-sans font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  isRunning 
                    ? "bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25" 
                    : "bg-brand-primary text-black font-extrabold hover:opacity-90"
                }`}
                style={!isRunning ? { boxShadow: "0 0 15px rgba(var(--brand-primary-rgb), 0.2)" } : undefined}
                id="btn-toggle-farming"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    Pause Farm Lobbies
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-black" />
                    Start Farm Lobbies
                  </>
                )}
              </button>

              <button
                onClick={toggleHeadless}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs border transition-all cursor-pointer ${
                  headlessMode
                    ? "bg-brand-primary/10 border-brand-primary/30 text-brand-primary"
                    : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                }`}
                id="btn-toggle-headless"
              >
                No-Render Engine: {headlessMode ? "ACTIVE (LOW LOAD)" : "OFF (FULL RENDER)"}
              </button>

              <button
                onClick={handleManualDropSimulation}
                className="px-4 py-2.5 rounded-xl font-sans font-semibold text-xs bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
                id="btn-simulate-drop"
              >
                <Plus className="w-3.5 h-3.5" />
                Simulate Care Package Drop
              </button>
            </div>

            {/* Right side global metrics */}
            <div className="flex items-center gap-6 text-right">
              <div id="metric-bot-status" className="flex flex-col items-end">
                <span className="block text-[10px] text-gray-500 font-sans uppercase">Bot Status</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border mt-0.5 transition-all duration-300 ${
                  botStatus === 'Active' 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                    : botStatus === 'Idle'
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                    : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                }`}>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      botStatus === 'Active' ? 'bg-emerald-400' : botStatus === 'Idle' ? 'bg-amber-400' : 'bg-blue-400'
                    }`}></span>
                    <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                      botStatus === 'Active' ? 'bg-emerald-500' : botStatus === 'Idle' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}></span>
                  </span>
                  {botStatus.toUpperCase()}
                </span>
              </div>
              <div id="metric-farm-uptime">
                <span className="block text-[10px] text-gray-500 font-sans uppercase">Uptime</span>
                <span className="font-mono text-sm font-bold text-white tracking-wider">
                  {isRunning ? "12h 45m 32s" : "PAUSED"}
                </span>
              </div>
              <div id="metric-farm-active">
                <span className="block text-[10px] text-gray-500 font-sans uppercase">Clients Running</span>
                <span className="font-mono text-sm font-bold text-brand-primary tracking-wider">
                  {isRunning ? `${accounts.length}/${accounts.length}` : "0/5"}
                </span>
              </div>
            </div>
          </div>

          {/* Main Dashboard Layout (Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
            
            {/* Statistics Overview Cards Grid */}
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6" id="dashboard-statistics-grid">
              {/* Weekly Profit Card */}
              <div className="bg-bg-secondary/60 backdrop-blur-sm border border-white/5 rounded-2xl p-5 md:p-6 flex items-center justify-between hover:border-brand-primary/20 transition-all duration-300 group">
                <div>
                  <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold">Weekly Profit</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-display text-2xl md:text-3xl font-extrabold text-white group-hover:text-brand-primary transition-colors">
                      ${weeklyProfit.toFixed(2)}
                    </span>
                    <span className="text-emerald-400 font-mono text-xs font-semibold flex items-center gap-0.5">
                      +18.4%
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono block mt-1.5">Steam market index evaluation</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-brand-primary/5 border border-brand-primary/20 flex items-center justify-center text-brand-primary group-hover:scale-105 transition-transform duration-300">
                  <Coins className="w-5 h-5" />
                </div>
              </div>

              {/* Cases Farmed Card */}
              <div className="bg-bg-secondary/60 backdrop-blur-sm border border-white/5 rounded-2xl p-5 md:p-6 flex items-center justify-between hover:border-brand-primary/20 transition-all duration-300 group">
                <div>
                  <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold">Cases Farmed</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-display text-2xl md:text-3xl font-extrabold text-brand-primary group-hover:brightness-110 transition-all">
                      {accounts.reduce((sum, acc) => sum + acc.casesFarmed, 0)}
                    </span>
                    <span className="text-brand-secondary font-mono text-xs font-semibold">
                      Drops Claimed
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono block mt-1.5">Aggregate count from all slots</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-brand-secondary/5 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary group-hover:scale-105 transition-transform duration-300">
                  <Package className="w-5 h-5" />
                </div>
              </div>

              {/* Avg Drop Value Card */}
              <div className="bg-bg-secondary/60 backdrop-blur-sm border border-white/5 rounded-2xl p-5 md:p-6 flex items-center justify-between hover:border-brand-primary/20 transition-all duration-300 group">
                <div>
                  <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold">Avg Item Value</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-display text-2xl md:text-3xl font-extrabold text-white group-hover:text-brand-secondary transition-colors">
                      ${(weeklyProfit / accounts.reduce((sum, acc) => sum + acc.casesFarmed, 0)).toFixed(2)}
                    </span>
                    <span className="text-gray-400 font-mono text-xs font-semibold">
                      Per Drop Package
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono block mt-1.5">Dynamic cluster evaluation</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/5 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform duration-300">
                  <Layers className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Account List (Left & Center Columns) */}
            <div className="lg:col-span-8 space-y-6" id="dashboard-accounts-table">
              <div className="bg-[#050609]/80 border border-white/5 rounded-2xl p-4 md:p-6 shadow-md overflow-hidden">
                <h3 className="font-display font-bold text-sm md:text-base text-white mb-4 flex items-center gap-2">
                  <Server className="w-4 h-4 text-brand-primary animate-pulse" />
                  Cluster Account Automation Slots
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-white/5 text-gray-500 font-mono text-[10px] uppercase">
                        <th className="pb-3 pl-2">Steam Identity</th>
                        <th className="pb-3">Activity</th>
                        <th className="pb-3">Weekly XP Progress</th>
                        <th className="pb-3 text-center">Drops</th>
                        <th className="pb-3 text-right pr-2">Proxy Address</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {accounts.map((acc) => (
                        <tr key={acc.id} className="hover:bg-white/[0.01] transition-colors">
                          {/* Username & Avatar */}
                          <td className="py-3.5 pl-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-brand-primary text-xs">
                                {acc.username[0]}
                              </div>
                              <div>
                                <span className="block font-semibold text-white leading-tight">
                                  {acc.username}
                                </span>
                                <span className="text-[10px] text-gray-500 font-mono block">
                                  Level {acc.level} Account
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Activity & Status badge */}
                          <td className="py-3.5">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${
                                acc.status === "in-game" ? "bg-brand-primary animate-pulse" :
                                acc.status === "queuing" ? "bg-yellow-400 animate-ping" :
                                acc.status === "idle" ? "bg-brand-secondary" : "bg-gray-600"
                              }`}></span>
                              <div>
                                <span className="block font-medium text-gray-200">
                                  {acc.currentActivity}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* XP Bar */}
                          <td className="py-3.5 w-1/4">
                            <div className="flex items-center gap-2">
                              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-brand-primary"
                                  animate={{ width: `${acc.xpPercent}%` }}
                                  transition={{ duration: 0.5 }}
                                />
                              </div>
                              <span className="font-mono text-[10px] text-gray-400 font-bold shrink-0">
                                {acc.xpPercent}%
                              </span>
                            </div>
                          </td>

                          {/* Cases Farmed count */}
                          <td className="py-3.5 text-center font-mono font-bold text-white text-xs">
                            {acc.casesFarmed}
                          </td>

                          {/* Proxy */}
                          <td className="py-3.5 text-right font-mono text-[11px] text-gray-500 pr-2">
                            {acc.proxy}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Resource Monitor Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="resource-stats">
                {/* CPU load */}
                <div className="bg-[#050609]/80 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] font-sans text-gray-500 uppercase font-medium">FARM CPU IMPACT</span>
                    <span className="font-mono text-xl font-bold text-white mt-1 block">
                      {isRunning ? `${systemLoad.cpu}%` : "0%"}
                    </span>
                  </div>
                  <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden shrink-0">
                    <div 
                      className="h-full bg-brand-primary transition-all duration-1000"
                      style={{ width: `${isRunning ? systemLoad.cpu * 4 : 0}%` }}
                    />
                  </div>
                </div>

                {/* RAM load */}
                <div className="bg-[#050609]/80 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] font-sans text-gray-500 uppercase font-medium">TOTAL RAM USAGE</span>
                    <span className="font-mono text-xl font-bold text-white mt-1 block">
                      {isRunning ? `${systemLoad.ram} GB` : "0.3 GB"}
                    </span>
                  </div>
                  <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden shrink-0">
                    <div 
                      className="h-full bg-brand-secondary transition-all duration-1000"
                      style={{ width: `${isRunning ? (systemLoad.ram / 4) * 100 : 8}%` }}
                    />
                  </div>
                </div>

                {/* GPU load */}
                <div className="bg-[#050609]/80 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] font-sans text-gray-500 uppercase font-medium">GPU COMPRESSION RATIO</span>
                    <span className="font-mono text-xl font-bold text-white mt-1 block">
                      {isRunning ? `${systemLoad.gpu}%` : "0%"}
                    </span>
                  </div>
                  <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden shrink-0">
                    <div 
                      className={`h-full transition-all duration-1000 ${systemLoad.gpu > 50 ? "bg-red-400" : "bg-brand-primary"}`}
                      style={{ width: `${isRunning ? systemLoad.gpu : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Logs Terminal & Recent Drops (Right Columns) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Recent Loot drops */}
              <div className="bg-[#050609]/80 border border-white/5 rounded-2xl p-4 md:p-6 shadow-md" id="dashboard-loot-drops">
                <h3 className="font-display font-bold text-sm text-white mb-4 flex items-center gap-2">
                  <Database className="w-4 h-4 text-brand-secondary" />
                  Live Farm Drop Log
                </h3>

                <div className="space-y-3.5">
                  <AnimatePresence mode="popLayout">
                    {drops.map((drop) => (
                      <motion.div
                        key={drop.id}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-2"
                        id={`loot-event-${drop.id}`}
                      >
                        <div className="min-w-0">
                          <span className="text-[11px] text-gray-400 font-mono block leading-tight truncate">
                            {drop.account}
                          </span>
                          <span className="font-display font-bold text-xs text-white block mt-0.5 truncate">
                            {drop.itemName}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono text-xs font-bold text-brand-primary block">
                            +${drop.marketValue.toFixed(2)}
                          </span>
                          <span className="text-[9px] text-gray-500 block font-mono mt-0.5">
                            {drop.time}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Console Logs */}
              <div className="bg-[#050609]/80 border border-white/5 rounded-2xl p-4 md:p-6 shadow-md flex flex-col justify-between h-[300px]" id="dashboard-terminal-logs">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-gray-400" />
                    System Log Console
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>

                <div className="font-mono text-[10px] md:text-[11px] leading-relaxed text-gray-400 overflow-y-auto space-y-2 flex-1 mt-3.5 h-[180px] scrollbar-thin pr-1 flex flex-col-reverse">
                  {logMessages.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={`text-left ${
                        log.includes("[Loot") ? "text-brand-primary font-semibold" :
                        log.includes("[SYSTEM]") ? "text-brand-secondary" :
                        log.includes("[PROXIES]") ? "text-yellow-400" : "text-gray-400"
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
