import { Feature, Plan, FAQItem, AccountStatus, DropEvent } from "./types";

export const FEATURES_DATA: Feature[] = [
  {
    id: "no-render",
    title: "No-Render Engine",
    description: "Run 50+ CS2 instances simultaneously on a single standard gaming PC without GPU bottlenecks.",
    iconName: "Cpu",
    category: "performance",
    details: [
      "Bypasses 3D rendering loops completely, reducing GPU usage to near-zero.",
      "Cuts RAM and CPU footprints by up to 85% per game instance.",
      "Optimized window scaling and headless execution modes.",
      "Dynamically allocates resources to active lobbies to prevent lag."
    ]
  },
  {
    id: "auto-lobby",
    title: "Smart Lobby Automation",
    description: "Full matchmaking coordination. Auto-invite, lobby filling, queuing, and map veto systems.",
    iconName: "Users",
    category: "automation",
    details: [
      "Configurable lobby sizes (2v2 Wingman or 5v5 Competitive).",
      "Auto-accepts match invitations and queues with custom timing intervals.",
      "Handles voting, map veto, and server re-connections natively.",
      "Supports private password-protected servers or official Matchmaking."
    ]
  },
  {
    id: "human-movement",
    title: "Anti-Kick Humanoid Movement",
    description: "Undetected neural pathing making accounts walk, shoot, and complete rounds like a real human.",
    iconName: "Zap",
    category: "automation",
    details: [
      "Simulates human reaction time, random mouse swerves, and spray control.",
      "Natively triggers map-specific navigation points on Vertigo, Dust II, etc.",
      "Guarantees 0% AFK kicks, even on high-latency networks.",
      "Automated round progress so servers register active gameplay."
    ]
  },
  {
    id: "steam-guard",
    title: "Steam Guard Integration",
    description: "Upload your .maFile files for auto-login, Steam Guard code generation, and instant trading.",
    iconName: "Key",
    category: "security",
    details: [
      "Generates Steam Guard 2FA codes on-the-fly inside the panel.",
      "Encrypts credentials locally using AES-256 for absolute privacy.",
      "Automates trade acceptances and Steam level-up badge crafting.",
      "Provides seamless re-authentication when login tokens expire."
    ]
  },
  {
    id: "proxy-manager",
    title: "Advanced Proxy Mapping",
    description: "Isolate every single CS2 client with dedicated proxies to shield your main accounts from chain bans.",
    iconName: "Shield",
    category: "security",
    details: [
      "Supports HTTP, SOCKS4, and SOCKS5 residential or datacenter proxies.",
      "Rotates IP addresses dynamically if connection errors occur.",
      "Failsafe Kill-Switch instantly closes client if proxy connection drops.",
      "Bypasses Steam rate-limiting during simultaneous logins."
    ]
  },
  {
    id: "drop-analytics",
    title: "Loot & Drop Analytics",
    description: "Live tracking of weekly case drops, level ups, current values, and overall farm yield.",
    iconName: "TrendingUp",
    category: "analytics",
    details: [
      "Real-time Steam API price integration for farmed drops.",
      "Historical charts showing weekly, monthly, and lifetime profits.",
      "Configurable Discord/Telegram webhooks for instant loot alerts.",
      "Detailed status reports showing which accounts have obtained drops."
    ]
  }
];

export const PLANS_DATA: Plan[] = [
  {
    id: "weekly",
    name: "Weekly Entry",
    price: "$14",
    period: "week",
    limit: "Up to 20 Accounts",
    features: [
      "Headless No-Render Client",
      "Standard Lobby Automation",
      "SOCKS5 Proxy Support",
      "Manual 2FA Login Codes",
      "Discord/Telegram Notifications",
      "Community Forum Access"
    ]
  },
  {
    id: "monthly",
    name: "Monthly Prime",
    price: "$39",
    period: "month",
    popular: true,
    limit: "Unlimited Accounts",
    features: [
      "Headless No-Render Client",
      "Full 5v5 & 2v2 Lobby Automation",
      "Steam Guard maFile 2FA Generator",
      "Residential Proxy Mapping",
      "Auto-Trading & Item Transfer",
      "Detailed Analytics Dashboard",
      "24/7 Priority Ticket Support"
    ]
  },
  {
    id: "lifetime",
    name: "Lifetime Access",
    price: "$299",
    period: "lifetime",
    limit: "Unlimited Accounts",
    features: [
      "All Monthly Prime Features",
      "Lifetime Panel Updates",
      "Bespoke Anti-Ban Optimizations",
      "Beta Access to new CS2 exploits",
      "Dedicated Technical Assistant",
      "Private Developer Discord Channel"
    ]
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "Can I get VAC banned for using PRO DIGITAL°?",
    answer: "PRO DIGITAL° operates externally, completely bypassing the CS2 game memory loop by using custom window wrappers, low-resource headless pipelines, and high-quality humanoid input simulation. Unlike traditional memory-injecting cheats, PRO DIGITAL° simulates mouse and keyboard inputs at the OS level, meaning Valve's Anti-Cheat (VAC) registers standard player interaction. When paired with high-quality residential proxies, the ban risk is minimized to practically zero.",
    category: "security"
  },
  {
    id: "faq-2",
    question: "What are the minimum system requirements?",
    answer: "Thanks to our optimized No-Render engine, system requirements are incredibly low. A standard gaming PC (e.g., Intel i5/AMD Ryzen 5, 16GB RAM, GTX 1060) can comfortably run 20 to 30 concurrent CS2 instances simultaneously. By disabling game render loops, CPU and GPU usage are minimal. Each instance takes less than 300MB of RAM and 1-2% CPU.",
    category: "technical"
  },
  {
    id: "faq-3",
    question: "How do Steam weekly drops work in CS2?",
    answer: "In Counter-Strike 2, accounts receive a care package upon their first level-up of the week. This package guarantees a weapon case (worth between $0.30 and $80.00+) and a secondary skin or graffiti. PRO DIGITAL° automates match XP gain (Vertigo lobbies or deathmatches), secures the level-up, claims the care package, and can automatically transfer the loot to a central storage account.",
    category: "general"
  },
  {
    id: "faq-4",
    question: "Do I need residential proxies?",
    answer: "For running more than 5 accounts simultaneously, we strongly recommend using dedicated SOCKS5 proxies. Steam limits the number of active logins from a single IP address and can place temporary locks on accounts logged in simultaneously. Our proxy manager isolates each client, assigning each steam account a unique IP, making it look like standard players logging in from separate households.",
    category: "security"
  },
  {
    id: "faq-5",
    question: "How do I activate my license key?",
    answer: "Once you purchase access through our checkout (we support Cryptocurrencies, Card Payments, and Skins), a secure license key is instantly delivered to your email and our Discord bot. Simply download the PRO DIGITAL° launcher, enter your license key, and your dashboard is immediately unlocked.",
    category: "billing"
  }
];

export const MOCK_ACCOUNTS: AccountStatus[] = [
  {
    id: "acc-1",
    username: "DragonSlayer_XP",
    level: 21,
    casesFarmed: 34,
    currentActivity: "Farming Vertigo 5v5",
    xpPercent: 78,
    status: "in-game",
    proxy: "185.220.101.44:3128",
  },
  {
    id: "acc-2",
    username: "GoldNova_Farmer",
    level: 14,
    casesFarmed: 22,
    currentActivity: "Queuing Competitive",
    xpPercent: 42,
    status: "queuing",
    proxy: "94.140.112.50:8080",
  },
  {
    id: "acc-3",
    username: "BobSkins_Store",
    level: 3,
    casesFarmed: 5,
    currentActivity: "Lobby waiting",
    xpPercent: 12,
    status: "idle",
    proxy: "45.138.22.119:1080",
  },
  {
    id: "acc-4",
    username: "Asimov_Grid_04",
    level: 18,
    casesFarmed: 29,
    currentActivity: "Farming Vertigo 5v5",
    xpPercent: 95,
    status: "in-game",
    proxy: "185.220.101.45:3128",
  },
  {
    id: "acc-5",
    username: "NeonRider_F",
    level: 12,
    casesFarmed: 18,
    currentActivity: "Reconnecting",
    xpPercent: 60,
    status: "queuing",
    proxy: "109.252.75.12:8888",
  }
];

export const MOCK_DROPS: DropEvent[] = [
  {
    id: "drop-1",
    time: "2 mins ago",
    account: "DragonSlayer_XP",
    itemName: "Gallery Case",
    itemType: "case",
    marketValue: 1.15,
    rarity: "common",
  },
  {
    id: "drop-2",
    time: "15 mins ago",
    account: "Asimov_Grid_04",
    itemName: "Kilowatt Case",
    itemType: "case",
    marketValue: 0.95,
    rarity: "common",
  },
  {
    id: "drop-3",
    time: "1 hour ago",
    account: "GoldNova_Farmer",
    itemName: "AK-47 | Safari Mesh (FT)",
    itemType: "skin",
    marketValue: 1.80,
    rarity: "uncommon",
  },
  {
    id: "drop-4",
    time: "3 hours ago",
    account: "DragonSlayer_XP",
    itemName: "Dreams & Nightmares Case",
    itemType: "case",
    marketValue: 0.65,
    rarity: "common",
  }
];

export const CASE_PRICES = [
  { name: "Gallery Case", value: 1.15, chance: 70 },
  { name: "Kilowatt Case", value: 0.95, chance: 20 },
  { name: "Revolution Case", value: 0.45, chance: 5 },
  { name: "Recoil Case", value: 0.35, chance: 4 },
  { name: "Weapon Case 1 (Rare!)", value: 92.50, chance: 1 }
];
