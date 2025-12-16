import React, { ReactElement, useState, useEffect } from 'react';
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
    <div className="nav-buttons-container">
      <button className={`nav-btn ${!activeSection && 'active'}`} onClick={() => onNavClick(null)}>
        <span className="nav-btn-text">{i18n.ABOUT}</span>
        <span className="nav-btn-glow"></span>
      </button>
      <button
        className={`nav-btn ${activeSection === 'projects' && 'active'}`}
        onClick={() => onNavClick('projects')}
      >
        <span className="nav-btn-text">{i18n.PROJECTS}</span>
        <span className="nav-btn-glow"></span>
      </button>
      <button
        className={`nav-btn ${activeSection === 'work' && 'active'}`}
        onClick={() => onNavClick('work')}
      >
        <span className="nav-btn-text">{i18n.EXPERIENCE}</span>
        <span className="nav-btn-glow"></span>
      </button>
    </div>
  );
};

const Home = (): ReactElement => {
  /** Tracks the currently active section in the navigation (projects, work, or none) */
  const [activeSection, setActiveSection] = useState<'projects' | 'work' | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      <div
        className="mouse-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      ></div>

      {/* Content */}
      <div className="content-wrapper">
        <Navigation />
        <div className="container top-container">
          <div className="section-transition">
            {activeSection === 'projects' ? (
              <Projects activeSection={activeSection} setActiveSection={setActiveSection} />
            ) : activeSection === 'work' ? (
              <Work activeSection={activeSection} setActiveSection={setActiveSection} />
            ) : (
              <About activeSection={activeSection} setActiveSection={setActiveSection} />
            )}
          </div>
        </div>
        <div className="container main-container">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
