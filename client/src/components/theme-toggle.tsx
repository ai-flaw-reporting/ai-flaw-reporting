"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => mounted && setTheme(isDark ? "light" : "dark")}
      disabled={!mounted}
      className="relative size-[27px] shrink-0 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-50"
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} theme`
          : "Theme toggle loading"
      }
      role="switch"
      aria-checked={isDark}
    >
      <Image
        src="/icons/theme-switcher/light.svg"
        width={27}
        height={27}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full transition-all duration-500 ease-in-out"
        style={{
          opacity: mounted && isDark ? 0 : 1,
          transform:
            mounted && isDark
              ? "rotate(180deg) scale(0.5)"
              : "rotate(0deg) scale(1)",
        }}
      />
      <Image
        src="/icons/theme-switcher/dark.svg"
        width={27}
        height={27}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full transition-all duration-500 ease-in-out"
        style={{
          opacity: mounted && isDark ? 1 : 0,
          transform:
            mounted && isDark
              ? "rotate(0deg) scale(1)"
              : "rotate(-180deg) scale(0.5)",
        }}
      />
    </button>
  );
}
