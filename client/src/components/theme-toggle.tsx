"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const ICON_TRANSITION_MS = 500;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const handleToggle = useCallback(() => {
    if (!mounted) return;

    // Disable all transitions except the toggle icons so theme colors snap instantly
    const style = document.createElement("style");
    style.textContent =
      "*, *::before, *::after { transition: none !important; } " +
      "[data-theme-toggle] img { transition: all 500ms ease-in-out !important; }";
    document.head.appendChild(style);

    setTheme(isDark ? "light" : "dark");

    // Re-enable transitions after the icon animation completes
    setTimeout(() => {
      style.remove();
    }, ICON_TRANSITION_MS);
  }, [mounted, isDark, setTheme]);

  return (
    <button
      data-theme-toggle
      onClick={handleToggle}
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
