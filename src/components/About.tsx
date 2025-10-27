import { HomeNav, IHomeNavProps } from "./Home";
import avatar from "../images/anthony.jpg";

export const About = (props: IHomeNavProps) => {
  return (
    <>
      <div className="container p-lg-5 p-4">
        <div className="row align-items-center rounded-3 p-4 p-lg-5 p-sm-4 p-md-4 info-container">
          {/* Image on top on small screens, right on large screens */}
          <div className="col-lg-5 col-md-12 text-center order-md-1 order-lg-2">
            <img
              src={avatar}
              className="avatar img-fluid p-lg-3 p-md-3 p-2"
              alt="Avatar"
            />
          </div>
          {/* Text content on the bottom on small screens, left on large screens */}
          <div className="col-lg-7 col-md-12 p-sm-4 p-md-5 p-lg-5 order-md-2 order-lg-1">
            <h4 className="pt-3 text-primary">About Me</h4>
            <h1 className="pt-3">Software Engineer</h1>
            <h5>
              <i>Fort Collins, Colorado</i>
            </h5>
            <p className="pt-3">
              I specialize in web development, building scalable and
              high-performance products with seamless user experiences.
            </p>
            <p>
              With over four years of professional experience, I contribute to
              building reliable and efficient software solutions. My work has
              powered applications used by Fortune 500 companies, ensuring
              performance, scalability, and maintainability.
            </p>
            <HomeNav {...props} />
          </div>
        </div>
      </div>
    </>
  );
};
