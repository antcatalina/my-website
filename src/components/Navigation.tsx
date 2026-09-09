import { useEffect, useId, useRef, useState, type ReactElement } from 'react';
import { BsBrightnessHigh, BsMoon, BsDisplay, BsArrowUpRight } from 'react-icons/bs';
import resume from '../files/Catalina_Resume.pdf';
import { useTheme, type Theme } from '../hooks/useTheme';
import { useLocale } from '../hooks/useLocale';
import { locales, TARGET_LANGUAGES } from '../locales';
import { circularReveal } from '../lib/viewTransition';
import { Menu, MenuItem } from './Menu';
import 'flag-icons/css/flag-icons.min.css';
import './Navigation.css';

export type LocaleCode = keyof typeof TARGET_LANGUAGES;

/**
 * Language codes whose ISO-639 tag differs from the ISO-3166 region the flag
 * library keys on.
 */
const FLAG_OVERRIDES: Record<string, string> = {
  'en-us': 'us',
  'en-gb': 'gb',
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

const flagFor = (code: string) => FLAG_OVERRIDES[code] ?? code;

const THEME_ICONS: Record<Theme, typeof BsMoon> = {
  light: BsBrightnessHigh,
  dark: BsMoon,
  system: BsDisplay,
};

/**
 * Live local time at the author's location.
 *
 * Isolated into its own component deliberately: it re-renders once a second,
 * and keeping the interval here means the header, nav links, and menus around
 * it never re-render at all.
 */
const StationClock = (): ReactElement => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    /* Align the first tick to the next second boundary, then run on a steady
       1s interval, so the display never sits visibly stale. */
    let interval: number;
    const timeout = window.setTimeout(
      () => {
        setNow(new Date());
        interval = window.setInterval(() => setNow(new Date()), 1000);
      },
      1000 - (Date.now() % 1000)
    );

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Denver',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);

  return (
    <span className="nav__clock" aria-hidden="true">
      <span className="nav__lamp" />
      {time} MT
    </span>
  );
};

const EXTERNAL_LINKS = [
  { href: 'https://www.linkedin.com/in/anthony-catalina/', label: 'LinkedIn' },
  { href: 'https://www.github.com/antcatalina/', label: 'GitHub' },
];

export const Navigation = (): ReactElement => {
  const { strings: i18n, locale, setLocale } = useLocale();
  const { theme, resolved, setTheme, themes } = useTheme();
  const themeAnchor = useRef<HTMLDivElement>(null);
  const mobileId = `nav${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  const ThemeIcon = THEME_ICONS[theme];

  /**
   * Swap the palette behind a circular wipe that spreads from the control the
   * visitor actually pressed, instead of a hard cut across the whole page.
   */
  const chooseTheme = (next: Theme) => {
    const rect = themeAnchor.current?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : { x: window.innerWidth, y: 0 };

    circularReveal(() => setTheme(next), origin);
  };

  const links = (
    <>
      <a className="nav__link" href={resume} target="_blank" rel="noreferrer">
        {i18n.RESUME}
        <BsArrowUpRight aria-hidden="true" />
      </a>
      {EXTERNAL_LINKS.map(({ href, label }) => (
        <a key={label} className="nav__link" href={href} target="_blank" rel="noreferrer">
          {label}
          <BsArrowUpRight aria-hidden="true" />
        </a>
      ))}
    </>
  );

  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="nav__brand" href="/">
          <span className="nav__brand-mark" aria-hidden="true" />
          <span className="nav__brand-name">Anthony Catalina</span>
        </a>

        <StationClock />

        <nav className="nav__links" aria-label="Primary">
          {links}
        </nav>

        <div className="nav__controls">
          <div ref={themeAnchor} className="nav__control">
            <Menu label="Select theme" trigger={<ThemeIcon size={16} />}>
              {themes.map((option) => (
                <MenuItem
                  key={option}
                  selected={theme === option}
                  onSelect={() => chooseTheme(option)}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </MenuItem>
              ))}
            </Menu>
          </div>

          <Menu
            label="Select language"
            scrollable
            trigger={<span className={`fi fi-${flagFor(locale)}`} />}
          >
            {Object.keys(TARGET_LANGUAGES).map((code) => {
              /* Language names are shown in the *currently selected* language,
                 falling back to the English name when that locale file has no
                 entry for it. */
              const key = `${code.toUpperCase()}_LANG`;
              const active = locales[locale] as Record<string, string | undefined>;
              return (
                <MenuItem
                  key={code}
                  selected={locale === code}
                  onSelect={() => setLocale(code as LocaleCode)}
                >
                  <span className={`fi fi-${flagFor(code)}`} aria-hidden="true" />
                  {active?.[key] ?? TARGET_LANGUAGES[code as LocaleCode]}
                </MenuItem>
              );
            })}
          </Menu>

          {/* Mobile disclosure. Also a popover, so it inherits light-dismiss
              and Escape without a click-outside listener or a state flag. */}
          <button
            type="button"
            className="nav__burger"
            popoverTarget={mobileId}
            aria-label="Menu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id={mobileId} popover="auto" className="nav__sheet">
        <nav aria-label="Primary (mobile)">{links}</nav>
        <p className="nav__sheet-meta">
          {resolved === 'dark' ? 'DARK' : 'LIGHT'} · {locale.toUpperCase()}
        </p>
      </div>
    </header>
  );
};
