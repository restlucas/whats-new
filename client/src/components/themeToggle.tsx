import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Moon, Sun } from "@phosphor-icons/react";

const ThemeToggle = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeToggle must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
    >
      {theme === "light" ? (
        <Moon
          size={22}
          className="fill-text-primary cursor-pointer"
          weight="bold"
        />
      ) : (
        <Sun
          size={22}
          className="fill-text-primary cursor-pointer"
          weight="bold"
        />
      )}
    </button>
  );
};

export default ThemeToggle;
