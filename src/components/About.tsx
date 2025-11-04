import { HomeNav, IHomeNavProps } from "./Home";
import avatar from "../images/anthony.jpg";
import { ReactElement } from "react";
import { useLocale } from "../hooks/useLocale";

export const About = (props: IHomeNavProps): ReactElement => {
  const { strings: i18n } = useLocale();
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
            <h4 className="pt-3 text-primary">{i18n.ABOUT_ME}</h4>
            <h1 className="pt-3">{i18n.SOFTWARE_ENGINEER}</h1>
            <h5>
              <i>{i18n.FORT_COLLINS_COLORADO}</i>
            </h5>
            <p className="pt-3">{i18n.ABOUT_HEADLINE}</p>
            <p>{i18n.ABOUT_SUPPORTING_TEXT}</p>
            <HomeNav {...props} />
          </div>
        </div>
      </div>
    </>
  );
};
