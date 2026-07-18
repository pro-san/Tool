import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ThemeType = "carbon" | "midnight";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem("pro-digital-theme");
    return (saved === "midnight" ? "midnight" : "carbon") as ThemeType;
  });

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem("pro-digital-theme", newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "carbon" ? "midnight" : "carbon");
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "midnight") {
      root.classList.add("theme-midnight");
    } else {
      root.classList.remove("theme-midnight");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
