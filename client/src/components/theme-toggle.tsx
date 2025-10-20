"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import Image from "next/image";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "dark" ? "dark" : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  if (!mounted) {
    return (
      <Button
        disabled
        size="icon"
        variant="outline"
        className="bg-gray-blue-300 hover:bg-gray-blue-300 dark:bg-gray-blue-600 dark:hover:bg-gray-blue-600 size-[35px] rounded-full"
        aria-label="Theme toggle loading"
      >
        <Image
          width={24}
          height={24}
          alt=""
          src="icons/theme-switch.svg"
          aria-hidden="true"
        />
      </Button>
    );
  }

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => setTheme(nextTheme)}
      className="bg-gray-blue-300 hover:bg-gray-blue-400 dark:bg-gray-blue-600 dark:hover:bg-gray-blue-500 size-[35px] rounded-full border-none"
      aria-label={`Switch to ${nextTheme} theme`}
      role="switch"
    >
      <Image
        width={24}
        height={24}
        alt=""
        src="icons/theme-switch.svg"
        aria-hidden="true"
      />
    </Button>
  );
}
