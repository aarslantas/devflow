"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

const ThemeToggleButton = () => {
  const { setTheme, resolvedTheme: currentTheme } = useTheme();
  const toggleTheme = () => {
    if (currentTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer outline-none focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200 rounded-full p-2"
    >
      {currentTheme === "light" ? (
        <Image
          src={"/icons/sun.svg"}
          width={30}
          height={30}
          alt="light mode logo"
          priority
          loading="eager"
          className="active-theme"
        />
      ) : (
        <Image
          src={"/icons/moon.svg"}
          width={30}
          height={30}
          alt="dark mode logo"
          priority
          loading="eager"
          className="active-theme"
        />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

export default ThemeToggleButton;
