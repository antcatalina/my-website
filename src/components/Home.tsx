import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Navigation } from "./Navigation";
import avatar from "../images/anthony.jpeg";
import psLogo from "../images/ps_symbol_tm.png";
import regulus from "../images/regulus-logo.png";
import lockheed from "../images/lockheed.png";
import "./Home.css";
import {
  FaReact,
  FaPython,
  FaAws,
  FaFolderOpen,
  FaBriefcase,
} from "react-icons/fa";

interface StackViewProps {
  showStack: boolean;
  spec: "front" | "back" | "cloud";
}

interface HomeNavProps {
  showProjects: boolean;
  showWork: boolean;
  showEdu: boolean;
  setShowProjects: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWork: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEdu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home = () => {
  const [showStack, setShowStack] = useState<boolean>(false);
  const [showProjects, setShowProjects] = useState<boolean>(false);
  const [showWork, setShowWork] = useState<boolean>(false);
  const [showEdu, setShowEdu] = useState<boolean>(false);

  return (
    <div className="bg-dark-subtle">
      <Navigation />
      <div className="top-container">
        {showProjects ? (
          <>
            <div className="p-5 container bg-dark-subtle text-dark-emphasis border border-dark-subtle rounded-3">
              <h2 className="text-warning">
                <FaFolderOpen className="me-2" /> Projects
              </h2>
              <hr />
              <h5 className="pt-2">
                <b>
                  Battery Manager Operations Display / Software Development @
                  Philadelphia Scientific, LLC
                </b>
              </h5>
              <p>React.js, Python, Bootstrap, CSS, MySQL</p>
              <p>
                Programmed web app to display distribution centers’ battery
                maintenance activity. Runs on Raspberry Pi devices. Displays
                real-time battery maintenance activities for distribution
                centers in interactive graphs and tables.
              </p>
              <hr />
              <h5 className="pt-2">
                <b>
                  Battery Manager Touch Computer Web App / Software Development
                  @ Philadelphia Scientific, LLC
                </b>
              </h5>
              <p>React.js, Python, Bootstrap, CSS</p>
              <p>
                Full stack development of web app for devices used by
                distribution center employees to maintain, track, and view
                statistics for industrial batteries. In use by several Fortune
                500 companies.
              </p>
              <hr />
              <h5 className="pt-2">
                <b>
                  Spectrum Analysis Tool / Software Development @ Regulus Group,
                  LLC w/ FAA
                </b>
              </h5>
              <p>HTML, CSS, Javascript, Bootstrap, Python, Flask, Jinja</p>
              <p>
                Responsible for developing the user interface for a software
                tool developed for the Federal Aviation Administration (FAA).
              </p>
              <hr />
              <h5 className="pt-2">
                <b>
                  Surveillance Spotlight Dashboard / Software Development @
                  Regulus Group, LLC w/ FAA
                </b>
              </h5>
              <p>HTML, CSS, PHP, Javascript, Bootstrap</p>
              <p>
                Software tool developed for the Federal Aviation Administration
                (FAA). The tool displays flight data from different data
                sources. Users can choose between daily and monthly data, and
                the data is populated into an interactive dashboard.
              </p>
              <hr />
              <h5 className="pt-2">
                <b>
                  Vulnerability Alert System Tool (VAST) / Software Engineering
                  @ Rowan University w/ Lockheed Martin
                </b>
              </h5>
              <p>MySQL, PHP, Python, HTML, CSS, Javascript, JQuery</p>
              <p>
                Developed a software tool for Lockheed Martin that automates
                monitoring online sources of vulnerability information and alert
                feeds from sources such as the National Vulnerability Database
                and the Department of Homeland Security. The tool acts as a
                website where users can log in via their email address and
                select applicable software or threat action filters to receive
                vulnerability alerts to their email.
              </p>
              <HomeNav
                showProjects={showProjects}
                showWork={showWork}
                showEdu={showEdu}
                setShowProjects={setShowProjects}
                setShowWork={setShowWork}
                setShowEdu={setShowEdu}
              />
            </div>
          </>
        ) : showWork ? (
          <>
            <div className="p-5 container bg-dark-subtle text-dark-emphasis border border-dark-subtle rounded-3">
              <div className="d-flex text-warning">
                <h2>
                  <FaBriefcase className="me-2" />{" "}
                </h2>
                <h2>
                  <div className="ms-2 mt-1">Work Experience</div>
                </h2>
              </div>
              <hr />
              <h4 className="pt-2">
                <a href="https://phlsci.com" target="_blank">
                  <img src={psLogo} alt="Avatar" width="40px" />
                </a>
                <b className="ms-3">
                  Software Engineer /
                  <a
                    className="text-decoration-none"
                    href="https://www.phlsci.com"
                    target="_blank"
                  >
                    {" "}
                    Philadelphia Scientific, LLC
                  </a>
                </b>
              </h4>
              <div>Montgomeryville, Pennsylvania, USA</div>
              <div>September 2022 - Present</div>
              <p className="pt-3">
                <ul>
                  <li>
                    Design, develop, and test software components for Battery
                    Manager systems.
                  </li>
                  <li>
                    Designing and developing web-based applications and GUIs
                    used by distribution center employees for clients such as
                    Target, Uline, and TJX.
                  </li>
                  <li>
                    Day to day support activities, resolving system bugs,
                    assisting with customer/site questions.
                  </li>
                </ul>
              </p>
              <h4 className="pt-3">
                <a href="https://regulus-group.com" target="_blank">
                  <img src={regulus} alt="Avatar" width="38px" />
                </a>
                <b className="ms-3">
                  Software Engineer /
                  <a
                    className="text-decoration-none"
                    href="https://regulus-group.com/"
                    target="_blank"
                  >
                    {" "}
                    Regulus Group, LLC
                  </a>
                </b>
              </h4>
              <div>Egg Harbor Township, New Jersey, USA</div>
              <div>June 2021 - September 2022</div>
              <p className="pt-3">
                <ul>
                  <li>
                    Upgraded user interface for both inputting data requests and
                    outputting analytical results.
                  </li>
                  <li>Improved database efficiencies and turnaround times.</li>
                  <li>
                    Developed dashboard-style web pages showing overall
                    real-time and historical system performance.
                  </li>
                </ul>
              </p>
              <h4 className="pt-3">
                <a
                  href="https://www.lockheedmartin.com/en-us/index.html"
                  target="_blank"
                >
                  <img src={lockheed} alt="Avatar" width="38px" />
                </a>
                <b className="ms-3">
                  Student Software Developer /
                  <a
                    className="text-decoration-none"
                    href="https://www.lockheedmartin.com/en-us/index.html"
                    target="_blank"
                  >
                    {" "}
                    Lockheed Martin
                  </a>
                </b>
              </h4>
              <div>Moorestown, New Jersey, USA</div>
              <div>January 2020 - May 2020</div>
              <p className="pt-3">
                Vulnerability Alert System Tool (VAST): Developed a software
                tool for Lockheed Martin that automates monitoring online
                sources of vulnerability information and alert feeds from
                sources such as the National Vulnerability Database and the
                Department of Homeland Security. The tool acts as a website
                where users can log in via their email address and select
                applicable software or threat action filters to receive
                vulnerability alerts to their email. VAST was developed using
                MySQL, PHP, Python, HTML, CSS, and JavaScript/JQuery.
              </p>
              <HomeNav
                showProjects={showProjects}
                showWork={showWork}
                showEdu={showEdu}
                setShowProjects={setShowProjects}
                setShowWork={setShowWork}
                setShowEdu={setShowEdu}
              />
            </div>
          </>
        ) : (
          <>
            <div className="container p-5">
              <div className="row align-items-center bg-dark-subtle text-dark-emphasis border border-dark-subtle rounded-3 p-5">
                {/* Image on top on small screens, right on large screens */}
                <div className="col-lg-5 col-md-12 text-center order-md-1 order-lg-2">
                  <img
                    src={avatar}
                    className="avatar img-fluid p-3"
                    alt="Avatar"
                  />
                </div>

                {/* Text content on the bottom on small screens, left on large screens */}
                <div className="col-lg-7 col-md-12 p-5 order-md-2 order-lg-1">
                  <h4 className="pt-3 text-warning">Hi, my name is Anthony.</h4>
                  <h1 className="pt-3">
                    I am a Software Engineer from the Denver area.
                  </h1>
                  <p className="pt-3">
                    I specialize in web development, building scalable and
                    high-performance products with seamless user experiences.
                  </p>
                  <p>
                    With over four years of professional experience, I
                    contribute to building reliable and efficient software
                    solutions. My work has powered applications used by Fortune
                    500 companies, ensuring performance, scalability, and
                    maintainability.
                  </p>
                  <HomeNav
                    showProjects={showProjects}
                    showWork={showWork}
                    showEdu={showEdu}
                    setShowProjects={setShowProjects}
                    setShowWork={setShowWork}
                    setShowEdu={setShowEdu}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="main-container">
        {/* Other content */}
        <div className="bottom-container text-center bg-dark-subtle text-dark-emphasis mt-3 pt-5 pb-4">
          <Container>
            <Row>
              <Col xs={12} md={4} className="text-center">
                <FaReact size={60} style={{ color: "#ffc107" }} />
                <h3 className="pt-3 pb-2">Frontend</h3>
                {!showStack ? (
                  <p className="px-3">
                    Highly skilled in several frontend technologies, web
                    scripting, and UI Engineering. Led the development of
                    multiple applications currently deployed across Fortune 500
                    companies.
                  </p>
                ) : (
                  <div>
                    <StackView showStack={showStack} spec="front" />
                  </div>
                )}
              </Col>
              <Col xs={12} md={4} className="text-center mt-lg-0 mt-md-0 mt-4">
                <FaPython size={60} style={{ color: "#ffc107" }} />
                <h3 className="pt-3 pb-2">Backend</h3>
                {!showStack ? (
                  <p className="px-3">
                    Skilled in RESTful API development, writing and optimizing
                    complex SQL queries, and managing relational databases.
                    Experienced in seamless integration between frontend and
                    backend systems for high-performance applications.
                  </p>
                ) : (
                  <div>
                    <StackView showStack={showStack} spec="back" />
                  </div>
                )}
              </Col>
              <Col xs={12} md={4} className="text-center mt-lg-0 mt-md-0 mt-4">
                <FaAws size={60} style={{ color: "#ffc107" }} />
                <h3 className="pt-3 pb-2">Cloud Platforms</h3>
                {!showStack ? (
                  <p className="px-3">
                    Experienced in cloud computing, leveraging GitHub Actions
                    for CI/CD automation to deploy and host React applications
                    on Amazon S3. Skilled in streamlining deployment pipelines
                    for scalable and efficient cloud-based solutions.
                  </p>
                ) : (
                  <div>
                    <StackView showStack={showStack} spec="cloud" />
                  </div>
                )}
              </Col>
            </Row>
            <Row>
              <div className="d-flex justify-content-center">
                <button
                  className={`my-4 btn btn-warning ${showStack && "active"}`}
                  onClick={() => setShowStack(!showStack)}
                >
                  Tech Stack
                </button>
              </div>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

const StackView = ({ showStack, spec }: StackViewProps) => {
  if (!showStack) return null;

  const stacks = {
    front: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "VS Code"],
    back: ["Python", "Flask", "SQL", "Docker", "MySQL Workbench", "Postman"],
    cloud: ["AWS", "GitHub", "Amazon S3", "CloudWatch"],
  };

  return (
    <div className="text-center">
      {stacks[spec].map((tech) => (
        <div key={tech}>{tech}</div>
      ))}
    </div>
  );
};

const HomeNav = ({
  showProjects,
  setShowProjects,
  showWork,
  setShowWork,
  showEdu,
}: // setShowEdu,
HomeNavProps) => {
  return (
    <>
      <button
        className={`mt-4 btn btn-outline-warning ${
          !showProjects && !showWork && !showEdu && "active"
        }`}
        onClick={() => {
          setShowProjects(false);
          setShowWork(false);
        }}
      >
        About
      </button>
      <button
        className={`mt-4 ms-3 btn btn-outline-warning ${
          showProjects && "active"
        }`}
        onClick={() => {
          setShowProjects(true);
          setShowWork(false);
        }}
      >
        Projects
      </button>
      <button
        className={`mt-4 ms-3 btn btn-outline-warning ${showWork && "active"}`}
        onClick={() => {
          setShowProjects(false);
          setShowWork(true);
        }}
      >
        Work Experience{" "}
      </button>
    </>
  );
};

export default Home;
