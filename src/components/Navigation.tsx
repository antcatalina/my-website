import "./Navigation.css";
import resume from "../files/Catalina_Resume.pdf";

export const Navigation = (): any => {
  return (
    <nav className="navbar navigation navbar-expand-lg bg-body-tertiary navbar-dark fixed-top">
      <div className="navigation container-fluid">
        <a className="navbar-brand" href="/">
        <div className="p-2 text-primary-emphasis">
          <b><i>Anthony Catalina</i></b>
        </div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={resume} target="_blank">
                Resume
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www.linkedin.com/in/anthony-catalina/"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
