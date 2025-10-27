import { HomeNav, IHomeNavProps } from "./Home";
import { FaBriefcase } from "react-icons/fa";
import hach from "../images/hach.png";
import psLogo from "../images/ps_symbol_tm.png";
import regulus from "../images/regulus-logo.png";

export const Work = (props: IHomeNavProps) => {
  return (
    <>
      <div className="p-5 container info-container rounded-3">
        <div className="d-flex text-primary">
          <h2>
            <FaBriefcase className="me-2" />{" "}
          </h2>
          <h2>
            <div className="ms-2 mt-1">Work Experience</div>
          </h2>
        </div>
        <hr />
        <h4 className="pt-2">
          <a href="https://www.hach.com" target="_blank">
            <img src={hach} alt="Avatar" width="40px" />
          </a>
          <b className="ms-3">
            Contract Firmware Engineer /
            <a
              className="text-decoration-none"
              href="https://www.hach.com"
              target="_blank"
            >
              {" "}
              Hach Company
            </a>
          </b>
        </h4>
        <div>
          <i>Loveland, Colorado, USA</i>
        </div>
        <div>April 2025 - Present</div>
        <p className="pt-3">
          <ul>
            <li>
              Maintain a large-scale TypeScript/LitElement monorepo utilizing
              MVC and atomic UI architecture.
            </li>
            <li>
              Implement and manage UI submodules for several projects,
              supporting water analysis displays.
            </li>
            <li>
              Implemented custom ESLint rules and configurations, and developed
              Jest unit tests for UI components.
            </li>
          </ul>
        </p>
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
        <div>
          <i>Montgomeryville, Pennsylvania, USA</i>
        </div>
        <div>September 2022 - April, 2025</div>
        <p className="pt-3">
          <ul>
            <li>
              Design, develop, and test software components for Battery Manager
              systems.
            </li>
            <li>
              Designing and developing web-based applications and GUIs used by
              distribution center employees for clients such as Target, Uline,
              and TJX.
            </li>
            <li>
              Day to day support activities, resolving system bugs, assisting
              with customer/site questions.
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
        <div>
          <i>Egg Harbor Township, New Jersey, USA</i>
        </div>
        <div>June 2021 - September 2022</div>
        <p className="pt-3">
          <ul>
            <li>
              Upgraded user interface for both inputting data requests and
              outputting analytical results.
            </li>
            <li>Improved database efficiencies and turnaround times.</li>
            <li>
              Developed dashboard-style web pages showing overall real-time and
              historical system performance.
            </li>
          </ul>
        </p>
        <HomeNav {...props} />
      </div>
    </>
  );
};
