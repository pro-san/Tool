export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: "automation" | "performance" | "security" | "analytics";
  details: string[];
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: "week" | "month" | "lifetime";
  popular?: boolean;
  limit: string;
  features: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "security" | "technical" | "billing";
}

export interface AccountStatus {
  id: string;
  username: string;
  level: number;
  casesFarmed: number;
  currentActivity: string;
  xpPercent: number;
  status: "idle" | "in-game" | "queuing" | "offline";
  proxy: string;
}

export interface DropEvent {
  id: string;
  time: string;
  account: string;
  itemName: string;
  itemType: "case" | "skin" | "graffiti";
  marketValue: number;
  rarity: "common" | "uncommon" | "rare";
}
