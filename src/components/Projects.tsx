import { ReactElement } from 'react';
import { HomeNav, IHomeNavProps } from './Home';
import { FaFolderOpen } from 'react-icons/fa';
import { useLocale } from '../hooks/useLocale';

export const Projects = (props: IHomeNavProps): ReactElement => {
  /** Get localized strings for the current language from the locale context. */
  const { strings: i18n } = useLocale();

  return (
    <>
      <div className="p-5 container rounded-3 info-container">
        <h2 className="text-primary">
          <FaFolderOpen className="me-2" /> {i18n.PROJECTS}
        </h2>
        <hr />
        <h5 className="pt-2">
          <b>
            {i18n.WATER_ANALYSIS_UI} / {i18n.FIRMWARE_UI_DEVELOPMENT} @ Hach Company
          </b>
        </h5>
        <p>
          <i>TypeScript, Lit, React, HTML/SCSS, Jenkins, Bitbucket, MQTT, Jest</i>
        </p>
        <p>{i18n.WATER_ANALYSIS_UI_SUPPORTING_TEXT}</p>
        <hr />
        <h5 className="pt-2">
          <b>
            {i18n.BATTERY_MANAGER_OPS_DISPLAY} / {i18n.SOFTWARE_DEVELOPMENT} @ Philadelphia
            Scientific, LLC
          </b>
        </h5>
        <p>
          <i>React, Typescript, Javascript, Python, Bootstrap, CSS, SQL</i>
        </p>
        <p>{i18n.BATTERY_MANAGER_OPS_DISPLAY_SUPPORTING_TEXT}</p>
        <hr />
        <h5 className="pt-2">
          <b>
            {i18n.BATTERY_MANAGER_TOUCH_COMPUTER_APP} / {i18n.SOFTWARE_DEVELOPMENT} @ Philadelphia
            Scientific, LLC
          </b>
        </h5>
        <p>
          <i>React, Typescript, Javascript, Python, Bootstrap, CSS</i>
        </p>
        <p>{i18n.BATTERY_MANAGER_TC_APP_SUPPORTING_TEXT}</p>
        <hr />
        <h5 className="pt-2">
          <b>
            {i18n.SURVEILLANCE_SPOTLIGHT_DASHBOARD} / {i18n.SOFTWARE_DEVELOPMENT} @ Regulus Group,
            LLC w/ FAA
          </b>
        </h5>
        <p>
          <i>HTML, CSS, PHP, Javascript, Bootstrap</i>
        </p>
        <p>{i18n.SURVEILLANCE_SPOTLIGHT_SUPPORTING_TEXT}</p>
        <HomeNav {...props} />
      </div>
    </>
  );
};
