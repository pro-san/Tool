import React, { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MOCK_ACCOUNTS, MOCK_DROPS } from "../data";
import { AccountStatus, DropEvent } from "../types";
import { 
  Play, Pause, Plus, RefreshCw, AlertCircle, Info, Check, 
  Terminal, ShieldCheck, Database, Server, Compass, Layers,
  Coins, Package, Mail, X, User, Shield, Download
} from "lucide-react";

export default function DashboardMock() {
  const [accounts, setAccounts] = useState<AccountStatus[]>(MOCK_ACCOUNTS);
  const [drops, setDrops] = useState<DropEvent[]>(MOCK_DROPS);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [headlessMode, setHeadlessMode] = useState<boolean>(true);
  const [systemLoad, setSystemLoad] = useState({ cpu: 14, ram: 2.4, gpu: 8 });
  const [weeklyProfit, setWeeklyProfit] = useState<number>(142.50);
  const [botStatus, setBotStatus] = useState<'Active' | 'Idle' | 'Updating'>('Active');
  
  // Add Account form states
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newEmailProvider, setNewEmailProvider] = useState<"Gmail" | "Hotmail" | "Outlook" | "Yahoo" | "Custom">("Gmail");
  const [newProxy, setNewProxy] = useState<string>("");
  const [newLevel, setNewLevel] = useState<number>(1);
  const [newHasMaFile, setNewHasMaFile] = useState<boolean>(true);

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

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) return;

    const emailToUse = newEmail.trim() || `${newUsername.toLowerCase().replace(/[^a-z0-9]/g, '')}@${newEmailProvider === 'Custom' ? 'custom-domain.net' : newEmailProvider.toLowerCase() + '.com'}`;
    const proxyToUse = newProxy.trim() || `185.220.101.${Math.floor(Math.random() * 200 + 10)}:${Math.floor(Math.random() * 8000 + 1000)}`;

    const newAcc: AccountStatus = {
      id: `acc-${Date.now()}`,
      username: newUsername.trim(),
      level: Number(newLevel),
      casesFarmed: 0,
      currentActivity: "Idle (Standing by)",
      xpPercent: 0,
      status: "idle",
      proxy: proxyToUse,
      sellerEmail: emailToUse,
      emailProvider: newEmailProvider,
      hasMaFile: newHasMaFile,
    };

    setAccounts((prev) => [...prev, newAcc]);
    addLog(`[ACCOUNT] Added slot ${newAcc.username} linked to ${newEmailProvider} (${emailToUse})`);
    
    // Reset form states
    setNewUsername("");
    setNewEmail("");
    setNewEmailProvider("Gmail");
    setNewProxy("");
    setNewLevel(1);
    setNewHasMaFile(true);
    setIsAddModalOpen(false);
  };

  const handleDownloadConfig = () => {
    const configData = {
      client_name: "PRO DIGITAL° Farm Manager",
      version: "2.5.0-PRO",
      exported_at: new Date().toISOString(),
      settings: {
        headless_mode: headlessMode,
        scheduler_running: isRunning,
        target_system_load: systemLoad,
        lobby_rotation_interval_seconds: 45,
        matchmaking_region: "auto",
        auto_claim_drops: true,
      },
      accounts: accounts.map(acc => ({
        username: acc.username,
        level: acc.level,
        status: acc.status,
        proxy: acc.proxy,
        delivery_email: acc.sellerEmail || null,
        email_provider: acc.emailProvider || "None",
        steam_guard_enabled: acc.hasMaFile || false,
        stats: {
          cases_farmed: acc.casesFarmed,
          current_activity: acc.currentActivity
        }
      }))
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(configData, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `pro_digital_farm_config_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    addLog("[SYSTEM] Bot configurations exported and downloaded successfully.");
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

              <button
                onClick={handleDownloadConfig}
                className="px-4 py-2.5 rounded-xl font-sans font-semibold text-xs bg-brand-primary/10 border border-brand-primary/20 text-brand-primary hover:bg-brand-primary/20 transition-all flex items-center gap-1.5 cursor-pointer"
                id="btn-download-config"
                title="Export current bot configurations"
              >
                <Download className="w-3.5 h-3.5" />
                Download Configuration
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
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display font-bold text-sm md:text-base text-white flex items-center gap-2">
                    <Server className="w-4 h-4 text-brand-primary animate-pulse" />
                    Cluster Account Automation Slots
                  </h3>
                  <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary text-[11px] font-mono font-bold border border-brand-primary/20 flex items-center gap-1 transition-all cursor-pointer"
                    id="btn-open-add-account"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Seller Account
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-white/5 text-gray-500 font-mono text-[10px] uppercase">
                        <th className="pb-3 pl-2">Steam Identity / Seller Email</th>
                        <th className="pb-3">Activity</th>
                        <th className="pb-3">Weekly XP Progress</th>
                        <th className="pb-3 text-center">Drops</th>
                        <th className="pb-3 text-right pr-2">Proxy Address</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {accounts.map((acc) => (
                        <tr key={acc.id} className="hover:bg-white/[0.01] transition-colors">
                          {/* Username, Avatar & Linked Email */}
                          <td className="py-3.5 pl-2">
                            <div className="flex items-start gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-brand-primary text-xs shrink-0 mt-0.5">
                                {acc.username[0]}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-semibold text-white leading-tight truncate">
                                    {acc.username}
                                  </span>
                                  {acc.hasMaFile && (
                                    <span className="px-1 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-mono font-bold shrink-0" title="Steam Guard maFile Uploaded">
                                      2FA
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-gray-500 font-mono block mt-0.5">
                                  Level {acc.level} Account
                                </span>
                                
                                {acc.sellerEmail && (
                                  <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-gray-400 font-mono">
                                    <span className={`inline-flex items-center px-1 py-0.2 rounded text-[8px] font-bold ${
                                      acc.emailProvider === "Gmail" ? "bg-red-500/10 text-red-400 border border-red-500/15" :
                                      acc.emailProvider === "Hotmail" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/15" :
                                      acc.emailProvider === "Outlook" ? "bg-blue-500/10 text-blue-400 border border-blue-500/15" :
                                      acc.emailProvider === "Yahoo" ? "bg-purple-500/10 text-purple-400 border border-purple-500/15" :
                                      "bg-white/5 text-gray-300 border border-white/10"
                                    }`}>
                                      {acc.emailProvider}
                                    </span>
                                    <span className="truncate max-w-[140px] md:max-w-[180px] text-gray-400 hover:text-white transition-colors" title={acc.sellerEmail}>
                                      {acc.sellerEmail}
                                    </span>
                                  </div>
                                )}
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

      {/* Add Account Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-[#050609] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative z-10 overflow-hidden"
              id="add-account-modal"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
              
              {/* Close Button */}
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-brand-primary font-mono text-[10px] tracking-widest uppercase font-bold">AUTOMATION GATEWAY</span>
                <h3 className="font-display font-extrabold text-xl md:text-2xl text-white mt-1">
                  Add Seller Farm Account
                </h3>
                <p className="text-xs text-gray-400 mt-1.5">
                  Configure your automation bot and link it to your seller's delivery email for real-time tracking.
                </p>
              </div>

              <form onSubmit={handleAddAccount} className="space-y-4">
                {/* Steam Username */}
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5 font-bold">
                    Steam Username / Identity
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="e.g. Asimov_Farmer_01"
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-brand-primary/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-primary/20 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Email Provider Pills */}
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-2 font-bold">
                    Seller Email Provider
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {(["Gmail", "Hotmail", "Outlook", "Yahoo", "Custom"] as const).map((prov) => {
                      const isActive = newEmailProvider === prov;
                      return (
                        <button
                          key={prov}
                          type="button"
                          onClick={() => setNewEmailProvider(prov)}
                          className={`py-2 rounded-lg text-[10px] font-mono font-bold border transition-all cursor-pointer ${
                            isActive 
                              ? prov === "Gmail" ? "bg-red-500/10 border-red-500/30 text-red-400" :
                                prov === "Hotmail" ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" :
                                prov === "Outlook" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" :
                                prov === "Yahoo" ? "bg-purple-500/10 border-purple-500/30 text-purple-400" :
                                "bg-brand-primary/10 border-brand-primary/30 text-brand-primary"
                              : "bg-white/[0.02] border-white/5 text-gray-400 hover:border-white/10"
                          }`}
                        >
                          {prov}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5 font-bold">
                    Seller's Delivery Email (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder={newUsername ? `${newUsername.toLowerCase().replace(/[^a-z0-9]/g, '')}@${newEmailProvider.toLowerCase() === 'custom' ? 'custom-domain.net' : newEmailProvider.toLowerCase() + '.com'}` : `e.g. store@${newEmailProvider.toLowerCase() === 'custom' ? 'domain' : newEmailProvider.toLowerCase()}.com`}
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-brand-primary/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-primary/20 transition-all font-sans"
                    />
                  </div>
                  <span className="text-[9px] text-gray-500 font-mono mt-1 block">
                    If empty, a realistic email based on username will be auto-generated.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Proxy Server */}
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5 font-bold">
                      SOCKS5 Proxy (Optional)
                    </label>
                    <input
                      type="text"
                      value={newProxy}
                      onChange={(e) => setNewProxy(e.target.value)}
                      placeholder="e.g. 185.220.101.99:3128"
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-brand-primary/50 rounded-xl px-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-primary/20 transition-all font-mono"
                    />
                  </div>

                  {/* Level */}
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5 font-bold">
                      Initial Profile Level
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={40}
                      value={newLevel}
                      onChange={(e) => setNewLevel(Number(e.target.value))}
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-brand-primary/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-primary/20 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Steam Guard / maFile checkbox */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-start gap-2.5">
                    <span className="text-brand-secondary mt-0.5">
                      <Shield className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-white block">Auto-generate Steam Guard (.maFile)</span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">Enables automated login and immediate delivery checkout.</span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={newHasMaFile}
                      onChange={(e) => setNewHasMaFile(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-8 h-4 bg-white/10 rounded-full peer peer-focus:ring-0 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-brand-primary"></div>
                  </label>
                </div>

                {/* Submit button */}
                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-white/10 text-xs font-sans font-bold text-gray-300 hover:bg-white/5 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-xs font-sans font-extrabold text-black transition-all cursor-pointer shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.15)]"
                  >
                    Add Farm Slot
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
