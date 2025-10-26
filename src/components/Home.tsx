import React, { ReactElement, useState } from "react";
import { Navigation } from "./Navigation";
import "./Home.css";
import { Projects } from "./Projects";
import { Work } from "./Work";
import { About } from "./About";
import { Footer } from "./Footer";

/** Props for the HomeNav component, controlling the active section and its setter */
export interface IHomeNavProps {
  activeSection: "projects" | "work" | null;
  setActiveSection: React.Dispatch<
    React.SetStateAction<"projects" | "work" | null>
  >;
}

/** Navigation component for the home page with About, Projects, and Work tabs */
export const HomeNav = ({
  activeSection,
  setActiveSection,
}: IHomeNavProps): ReactElement => {
  const onNavClick = (selectedTab: typeof activeSection) => {
    // Clicking the same tab again resets to "about"
    setActiveSection((prev) => (prev === selectedTab ? null : selectedTab));
  };

  return (
    <>
      <button
        className={`mt-4 btn btn-outline-warning ${!activeSection && "active"}`}
        onClick={() => onNavClick(null)}
      >
        About
      </button>
      <button
        className={`mt-4 ms-3 btn btn-outline-warning ${
          activeSection === "projects" && "active"
        }`}
        onClick={() => onNavClick("projects")}
      >
        Projects
      </button>
      <button
        className={`mt-4 ms-3 btn btn-outline-warning ${
          activeSection === "work" && "active"
        }`}
        onClick={() => onNavClick("work")}
      >
        Experience
      </button>
    </>
  );
};

const Home = (): ReactElement => {
  const [activeSection, setActiveSection] = useState<
    "projects" | "work" | null
  >(null);

  return (
    <div className="bg-dark-subtle">
      <Navigation />
      <div className="top-container">
        {activeSection === "projects" ? (
          <Projects
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        ) : activeSection === "work" ? (
          <Work
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        ) : (
          <About
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
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
