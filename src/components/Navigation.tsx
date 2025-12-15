import './Navigation.scss';
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

  /** State for mobile menu toggle */
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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
    <nav className="navigation-wrapper">
      <div className="navigation-container">
        <div className="navigation-content">
          {/* Brand/Logo */}
          <a className="nav-brand" href="/">
            <span className="nav-brand-text">Anthony Catalina</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Navigation Links */}
          <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <a className="nav-link" href="#" onClick={() => setMobileMenuOpen(false)}>
              {i18n.HOME}
            </a>
            <a
              className="nav-link"
              href={resume}
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
            >
              {i18n.RESUME}
            </a>
            <a
              className="nav-link"
              href="https://www.linkedin.com/in/anthony-catalina/"
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
            >
              LinkedIn
            </a>
            <a
              className="nav-link"
              href="https://www.github.com/antcatalina/"
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
            >
              GitHub
            </a>
          </div>

          {/* Theme Toggle Dropdown */}
          <div className="nav-dropdown-container">
            <div className="nav-dropdown">
              <button className="nav-dropdown-toggle" type="button" title="Select theme">
                {resolvedTheme === 'dark' ? <BsMoon size={18} /> : <BsBrightnessHigh size={18} />}
              </button>

              <ul className="nav-dropdown-menu">
                {themes.map((t) => (
                  <li key={t}>
                    <button
                      className={`nav-dropdown-item ${theme === t ? 'active' : ''}`}
                      onClick={() => {
                        setTheme(t);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Language Dropdown */}
            <div className="nav-dropdown">
              <button className="nav-dropdown-toggle" type="button" title="Select language">
                <span className={`fi fi-${flagCodeMap[locale] || locale}`}></span>
              </button>

              <ul className="nav-dropdown-menu lang-dropdown">
                {Object.entries(TARGET_LANGUAGES).map(([code]) => {
                  const flagCode = flagCodeMap[code] || code;
                  const langKey = `${code.toUpperCase()}_LANG` as keyof (typeof locales)[LocaleKey];

                  return (
                    <li key={code}>
                      <button
                        className={`nav-dropdown-item ${locale === code ? 'active' : ''}`}
                        onClick={() => {
                          setLocale(code as LocaleCode);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <span className={`fi fi-${flagCode}`}></span>{' '}
                        {locales[locale]?.[langKey] || TARGET_LANGUAGES[code as LocaleCode]}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
