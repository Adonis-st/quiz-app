"use client";

import { useAtom } from "jotai";
import { useLayoutEffect } from "react";
import { darkModeAtom } from "~/store";

export const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  useLayoutEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prevMode) => !prevMode)}
      className="mx-2 flex h-5 w-8 items-center rounded-full bg-purple p-1 md:mx-4 md:h-8 md:w-12"
    >
      <div className="aspect-square w-3 rounded-full bg-white duration-200 ease-in-out dark:translate-x-3 md:w-5 md:dark:translate-x-5" />
    </button>
  );
};
