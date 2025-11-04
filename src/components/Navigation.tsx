import './Navigation.css';
import resume from '../files/Catalina_Resume.pdf';
import { ReactElement, useEffect, useState } from 'react';
import { useTheme, Theme } from '../hooks/useTheme';
import { useLocale } from '../hooks/useLocale';
import { BsBrightnessHigh, BsMoon } from 'react-icons/bs';
import { LocaleKey, locales, TARGET_LANGUAGES } from '../locales';
import '/node_modules/flag-icons/css/flag-icons.min.css';

export type LocaleCode = keyof typeof TARGET_LANGUAGES;

export const Navigation = (): ReactElement => {
  /** Get localized strings for the current language from the locale context. */
  const { strings: i18n } = useLocale();

  /** Provides access to the current theme and a setter function. */
  const { theme, setTheme } = useTheme();

  /**  Access the current locale, and a function to update it, from the global Locale context */
  const { locale, setLocale } = useLocale();

  /** The list of available theme options displayed in the dropdown. */
  const themes: Theme[] = ['light', 'dark', 'system'];

  /** Tracks the system's current color-scheme preference (light/dark). */
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  /** Resolves the *effective* theme being shown on screen. */
  const resolvedTheme = theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : theme;

  /**
   * Some language codes do not match the class names used by the
   * flag icon library (e.g., fi fi-XX).
   * We override them here so the correct flag is displayed
   */
  const flagCodeMap: Record<string, string> = {
    en: 'us',
    ar: 'sa',
    vi: 'vn',
    ko: 'kr',
    ja: 'jp',
    da: 'dk',
    uk: 'ua',
    hi: 'in',
    cs: 'cz',
    el: 'gr',
    zh: 'cn',
    sv: 'se',
  };

  /** Listen for system theme changes if "system" is selected. */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

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
                {i18n.HOME}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={resume} target="_blank">
                {i18n.RESUME}
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
              <a className="nav-link" href="https://www.github.com/antcatalina/" target="_blank">
                GitHub
              </a>
            </li>

            {/* === Theme Toggle Dropdown === */}
            <li className="pb-1 pb-lg-0 nav-item dropdown">
              <button
                className="btn dropdown-toggle d-inline-flex align-items-center gap-2"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="Select theme"
              >
                {resolvedTheme === 'dark' ? <BsMoon /> : <BsBrightnessHigh />}
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                {themes.map((t) => (
                  <li key={t}>
                    <button
                      className={`dropdown-item${theme === t ? ' active' : ''}`}
                      onClick={() => setTheme(t)}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </li>

            {/* === Language Dropdown === */}
            <li className="pb-2 pb-lg-0 nav-item dropdown">
              <button
                className="btn dropdown-toggle d-flex align-items-center gap-2"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* Show current locale's flag */}
                <span className={`fi fi-${flagCodeMap[locale] || locale}`}></span>
              </button>

              <ul className="dropdown-menu dropdown-menu-end bg-dark-subtle lang-dropdown">
                {Object.entries(TARGET_LANGUAGES).map(([code]) => {
                  const flagCode = flagCodeMap[code] || code;

                  // Construct the key for the translated language name
                  const langKey = `${code.toUpperCase()}_LANG` as keyof (typeof locales)[LocaleKey];

                  return (
                    <li key={code}>
                      <button
                        className={`dropdown-item${locale === code ? ' active' : ''}`}
                        onClick={() => setLocale(code as LocaleCode)}
                      >
                        <span className={`fi fi-${flagCode}`}></span>{' '}
                        {locales[locale]?.[langKey] || TARGET_LANGUAGES[code as LocaleCode]}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
