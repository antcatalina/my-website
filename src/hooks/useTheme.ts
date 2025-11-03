import { useEffect, useState } from "react";

/** Represents the available theme modes for the application. */
export type Theme = "light" | "dark" | "system";

/** Custom React hook to manage the application's theme (light, dark, or system). */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    return saved || "system";
  });

  useEffect(() => {
    const root = document.documentElement;

    /** Applies the theme to the document by setting the `data-bs-theme` attribute. */
    const applyTheme = (t: Theme) => {
      let resolved = t;
      if (t === "system") {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        resolved = prefersDark ? "dark" : "light";
      }
      root.setAttribute("data-bs-theme", resolved);
    };

    applyTheme(theme);
    localStorage.setItem("theme", theme);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if (theme === "system") applyTheme("system");
    };
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, [theme]);

  return { theme, setTheme };
}
