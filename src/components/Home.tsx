import React, { ReactElement, useState } from 'react';
import { Navigation } from './Navigation';
import './Home.scss';
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
    setActiveSection((prev) => (prev === selectedTab ? null : selectedTab));
  };

  return (
    <div className="nav-tabs-container">
      <button className={`nav-tab ${!activeSection && 'active'}`} onClick={() => onNavClick(null)}>
        <span className="nav-tab-text">{i18n.ABOUT}</span>
      </button>
      <button
        className={`nav-tab ${activeSection === 'projects' && 'active'}`}
        onClick={() => onNavClick('projects')}
      >
        <span className="nav-tab-text">{i18n.PROJECTS}</span>
      </button>
      <button
        className={`nav-tab ${activeSection === 'work' && 'active'}`}
        onClick={() => onNavClick('work')}
      >
        <span className="nav-tab-text">{i18n.EXPERIENCE}</span>
      </button>
    </div>
  );
};

const Home = (): ReactElement => {
  /** Tracks the currently active section in the navigation (projects, work, or none) */
  const [activeSection, setActiveSection] = useState<'projects' | 'work' | null>(null);

  return (
    <div className="home-wrapper">
      {/* Animated gradient background */}
      <div className="animated-bg">
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
      </div>

      {/* Floating particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Mouse follower glow */}
      <div className="mouse-glow" style={{ display: 'none' }}></div>

      {/* Content */}
      <div className="content-wrapper">
        <Navigation />
        <div className="container-with-tabs">
          <HomeNav activeSection={activeSection} setActiveSection={setActiveSection} />
          <div className="top-container">
            <div className="section-transition">
              {activeSection === 'projects' ? (
                <Projects />
              ) : activeSection === 'work' ? (
                <Work />
              ) : (
                <About />
              )}
            </div>
          </div>
        </div>
        <div className="main-container">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
