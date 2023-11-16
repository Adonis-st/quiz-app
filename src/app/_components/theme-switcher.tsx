"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { darkModeAtom } from "~/store";

export const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prevMode) => !prevMode)}
      className="mx-2 flex h-5 w-8 items-center rounded-full bg-purple p-1"
    >
      <div className="h-3 w-3 rounded-full bg-white dark:translate-x-3 ease-in-out duration-200" />
    </button>
  );
};
