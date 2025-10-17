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

  if (!mounted) {
    return (
      <Button
        disabled
        size="icon"
        variant="outline"
        className="bg-gray-blue-300 hover:bg-gray-blue-300 dark:bg-gray-blue-600 dark:hover:bg-gray-blue-600 size-[35px] rounded-full"
      >
        <Image
          width={24}
          height={24}
          alt="Theme Switch"
          src="/icons/theme-switch.svg"
        />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-gray-blue-300 hover:bg-gray-blue-400 dark:bg-gray-blue-600 dark:hover:bg-gray-blue-500 size-[35px] rounded-full border-none"
    >
      <Image
        width={24}
        height={24}
        alt="Theme Switch"
        src="/icons/theme-switch.svg"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
