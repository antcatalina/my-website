import { HomeNav, IHomeNavProps } from "./Home";
import { FaFolderOpen } from "react-icons/fa";

export const Projects = (props: IHomeNavProps) => {
  return (
    <>
      <div className="p-5 container bg-dark-subtle text-dark-emphasis border border-dark-subtle rounded-3">
        <h2 className="text-warning">
          <FaFolderOpen className="me-2" /> Projects
        </h2>
        <hr />
        <h5 className="pt-2">
          <b>Water Analysis UI / Firmware UI Development @ Hach Company</b>
        </h5>
        <p>
          <i>
            TypeScript, LitElement, React, HTML/SCSS, Jenkins, Bitbucket, MQTT,
            Jest
          </i>
        </p>
        <p>
          Implemented scalable, modular UI components using Atomic UI and
          Modular MVC architecture to support real-time water analysis and
          measurement visualization for internal engineers, lab technicians, and
          clients.
        </p>
        <hr />
        <h5 className="pt-2">
          <b>
            Battery Manager Operations Display / Software Development @
            Philadelphia Scientific, LLC
          </b>
        </h5>
        <p>
          <i>React.js, Python, Bootstrap, CSS, MySQL</i>
        </p>
        <p>
          Programmed web app to display distribution centers’ battery
          maintenance activity. Runs on Raspberry Pi devices. Displays real-time
          battery maintenance activities for distribution centers in interactive
          graphs and tables.
        </p>
        <hr />
        <h5 className="pt-2">
          <b>
            Battery Manager Touch Computer Web App / Software Development @
            Philadelphia Scientific, LLC
          </b>
        </h5>
        <p>
          <i>React.js, Python, Bootstrap, CSS</i>
        </p>
        <p>
          Full stack development of web app for devices used by distribution
          center employees to maintain, track, and view statistics for
          industrial batteries. In use by several Fortune 500 companies.
        </p>
        <hr />
        <h5 className="pt-2">
          <b>
            Surveillance Spotlight Dashboard / Software Development @ Regulus
            Group, LLC w/ FAA
          </b>
        </h5>
        <p>
          <i>HTML, CSS, PHP, Javascript, Bootstrap</i>
        </p>
        <p>
          Software tool developed for the Federal Aviation Administration (FAA).
          The tool displays flight data from different data sources. Users can
          choose between daily and monthly data, and the data is populated into
          an interactive dashboard.
        </p>
        <HomeNav {...props} />
      </div>
    </>
  );
};
