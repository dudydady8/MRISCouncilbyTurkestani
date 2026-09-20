"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button onClick={toggle} className="w-9 h-9 rounded-lg grid place-items-center text-blue-900 dark:text-blue-100 hover:bg-blue-50 dark:hover:bg-blue-900/30">
      {dark ? "☀️" : "🌙"}
    </button>
  );
}