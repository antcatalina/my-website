import "./Navigation.css";
import resume from "../files/Catalina_Resume.pdf";
import { ReactElement, useEffect, useState } from "react";
import { useTheme, Theme } from "../hooks/useTheme";
import { BsBrightnessHigh, BsMoon } from "react-icons/bs";

export const Navigation = (): ReactElement => {
  /** Provides access to the current theme and a setter function. */
  const { theme, setTheme } = useTheme();

  /** The list of available theme options displayed in the dropdown. */
  const themes: Theme[] = ["light", "dark", "system"];

  /** Tracks the system's current color-scheme preference (light/dark). */
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  /** Listen for system theme changes if "system" is selected. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) =>
      setSystemPrefersDark(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  /** Resolves the *effective* theme being shown on screen. */
  const resolvedTheme =
    theme === "system" ? (systemPrefersDark ? "dark" : "light") : theme;

  return (
    <nav className="navbar navigation navbar-expand-lg bg-body-tertiary navbar-light fixed-top">
      <div className="navigation container-fluid">
        <a className="navbar-brand" href="/">
          <div className="p-2 text-primary-emphasis">
            <b>
              <i>Anthony Catalina</i>
            </b>
          </div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={resume} target="_blank">
                Resume
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www.linkedin.com/in/anthony-catalina/"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www.github.com/antcatalina/"
                target="_blank"
              >
                GitHub
              </a>
            </li>

            {/* === Theme Toggle Dropdown === */}
            <li className="pb-2 pb-lg-0 nav-item dropdown ms-2">
              <button
                className="btn dropdown-toggle d-inline-flex align-items-center gap-2"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="Select theme"
              >
                {resolvedTheme === "dark" ? <BsMoon /> : <BsBrightnessHigh />}
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                {themes.map((t) => (
                  <li key={t}>
                    <button
                      className={`dropdown-item${theme === t ? " active" : ""}`}
                      onClick={() => setTheme(t)}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
