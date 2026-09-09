import { useCallback, useRef, useState, type KeyboardEvent, type ReactElement } from 'react';
import { Navigation } from './Navigation';
import { SignalField, type Signature } from './SignalField';
import { Hero } from './Hero';
import { Projects } from './Projects';
import { Work } from './Work';
import { About } from './About';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { useLocale } from '../hooks/useLocale';
import { withViewTransition } from '../lib/viewTransition';
import './Home.css';

const TABS = ['about', 'projects', 'work', 'contact'] as const;
/* Deliberately the same union as `Signature` — the tab drives the waveform,
   so a new section cannot be added without also tuning the background. */
type TabId = Signature;

const PANELS: Record<TabId, () => ReactElement> = {
  about: About,
  projects: Projects,
  work: Work,
  contact: Contact,
};

const Home = (): ReactElement => {
  const { strings: i18n } = useLocale();
  const [active, setActive] = useState<TabId>('about');
  const tablistRef = useRef<HTMLDivElement>(null);

  const labels: Record<TabId, string> = {
    about: i18n.ABOUT,
    projects: i18n.PROJECTS,
    work: i18n.EXPERIENCE,
    contact: i18n.CONTACT,
  };

  /** The panel cross-fades and the channel indicator morphs from the old tab to the new one. */
  const select = useCallback((next: TabId) => {
    withViewTransition(() => setActive(next));
  }, []);

  /** Arrow-key roving, per the WAI-ARIA tabs pattern. */
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
      if (!keys.includes(event.key)) return;
      event.preventDefault();

      const index = TABS.indexOf(active);
      const next =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? TABS.length - 1
            : (index + (event.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length;

      select(TABS[next]);
      /* Follow focus to the newly selected tab, as the pattern requires. */
      requestAnimationFrame(() => {
        tablistRef.current?.querySelector<HTMLButtonElement>(`#tab-${TABS[next]}`)?.focus();
      });
    },
    [active, select]
  );

  const Panel = PANELS[active];

  return (
    <>
      <SignalField signature={active} />
      <a className="skip-link" href="#panel">
        Skip to content
      </a>
      <Navigation />

      <div className="shell">
        <Hero />

        <main className="console" id="main">
          <div
            ref={tablistRef}
            className="console__tabs"
            role="tablist"
            aria-label="Sections"
            onKeyDown={onKeyDown}
          >
            {TABS.map((tab, index) => {
              const selected = tab === active;
              return (
                <button
                  key={tab}
                  id={`tab-${tab}`}
                  role="tab"
                  type="button"
                  className="console__tab"
                  aria-selected={selected}
                  aria-controls="panel"
                  /* Roving tabindex: one stop for the whole tablist. */
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(tab)}
                >
                  <span className="console__tab-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="console__tab-label">{labels[tab]}</span>
                  {selected && <span className="console__tab-lit" aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          <section
            className="console__panel"
            id="panel"
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            /* Focusable so keyboard users can reach panel content that has no
               interactive elements of its own. */
            tabIndex={0}
          >
            <Panel />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;
