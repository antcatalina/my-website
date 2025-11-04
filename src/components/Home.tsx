import React, { ReactElement, useState } from 'react';
import { Navigation } from './Navigation';
import './Home.css';
import { Projects } from './Projects';
import { Work } from './Work';
import { About } from './About';
import { Footer } from './Footer';
import { useLocale } from '../hooks/useLocale';

/** Props for the HomeNav component, controlling the active section and its setter */
export interface IHomeNavProps {
  activeSection: 'projects' | 'work' | null;
  setActiveSection: React.Dispatch<React.SetStateAction<'projects' | 'work' | null>>;
}

export const HomeNav = ({ activeSection, setActiveSection }: IHomeNavProps): ReactElement => {
  /** Get localized strings for the current language from the locale context. */
  const { strings: i18n } = useLocale();

  /** Sets the active section to the selected tab, or resets to null if the same tab is clicked again */
  const onNavClick = (selectedTab: typeof activeSection) => {
    // Clicking the same tab again resets to "about"
    setActiveSection((prev) => (prev === selectedTab ? null : selectedTab));
  };

  return (
    <>
      <button
        className={`mt-4 btn btn-outline-primary ${!activeSection && 'active'}`}
        onClick={() => onNavClick(null)}
      >
        {i18n.ABOUT}
      </button>
      <button
        className={`mt-4 ms-3 btn btn-outline-primary ${activeSection === 'projects' && 'active'}`}
        onClick={() => onNavClick('projects')}
      >
        {i18n.PROJECTS}
      </button>
      <button
        className={`mt-4 ms-3 btn btn-outline-primary ${activeSection === 'work' && 'active'}`}
        onClick={() => onNavClick('work')}
      >
        {i18n.EXPERIENCE}
      </button>
    </>
  );
};

const Home = (): ReactElement => {
  /** Tracks the currently active section in the navigation (projects, work, or none) */
  const [activeSection, setActiveSection] = useState<'projects' | 'work' | null>(null);

  return (
    <div className="bg-dark-subtle">
      <Navigation />
      <div className="top-container">
        {activeSection === 'projects' ? (
          <Projects activeSection={activeSection} setActiveSection={setActiveSection} />
        ) : activeSection === 'work' ? (
          <Work activeSection={activeSection} setActiveSection={setActiveSection} />
        ) : (
          <About activeSection={activeSection} setActiveSection={setActiveSection} />
        )}
      </div>
      <div className="main-container">
        {/* Other content */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
