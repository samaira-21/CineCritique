import React, { useEffect, useState } from "react";
import useTheme from "../context/theme";
import { Moon, Sun } from "lucide-react";

export default function ThemeBtn() {
  const { themeMode, lightTheme, darkTheme } = useTheme();
  const [isLight, setIsLight] = useState(themeMode === "light");

  useEffect(() => {
    setIsLight(themeMode === "light");
  }, [themeMode]);

  const toggleTheme = () => {
    if (isLight) {
      darkTheme();
      setIsLight(false);
    } else {
      lightTheme();
      setIsLight(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative flex items-center w-12 h-6 rounded-full transition-all duration-300
        ${isLight ? "bg-[#A06CD5]" : "bg-[#2a2a2a]"}
      `}
    >
      <div
        className={`
          h-5 w-5 rounded-full bg-white shadow-md absolute top-0.5 transition-all duration-300
          ${isLight ? "left-[30px]" : "left-0.5"}
        `}
      ></div>
      <span className="ml-14 text-gray-400 flex items-center gap-1 text-sm">
        {isLight ? <Sun size={16} /> : <Moon size={16} />}
      </span>
    </button>
  );
}
