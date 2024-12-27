import React, { createContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("@whats-new:theme") as
      | "light"
      | "dark";

    const currentTheme = storedTheme || "light";

    setTheme(currentTheme);
    document.documentElement.classList.add(currentTheme);

    // Adiciona classes ao body
    document.body.classList.add(
      currentTheme === "light" ? "bg-light" : "bg-dark"
    );
  }, []);

  useEffect(() => {
    document.body.classList.remove("bg-light", "bg-dark");
    document.body.classList.add(theme === "light" ? "bg-light" : "bg-dark");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("@whats-new:theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
