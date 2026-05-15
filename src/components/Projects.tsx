import { ReactElement } from 'react';
import { useLocale } from '../hooks/useLocale';

export const Projects = (): ReactElement => {
  /** Get localized strings for the current language from the locale context. */
  const { strings: i18n } = useLocale();

  return (
    <>
      <div className="px-5 py-4 container rounded-3 info-container">
        <h5 className="pt-2 primary-text primary-text">
          <b>
            {i18n.WATER_ANALYSIS_UI} / {i18n.FIRMWARE_UI_DEVELOPMENT} @ Hach Company
          </b>
        </h5>
        <p className='tertiary-text'>
          <i>TypeScript, Lit, React, HTML/SCSS, Jenkins, Bitbucket, MQTT, Jest</i>
        </p>
        <p className='secondary-text'>{i18n.WATER_ANALYSIS_UI_SUPPORTING_TEXT}</p>
        <hr />
        <h5 className="pt-2 primary-text">
          <b>
            {i18n.BATTERY_MANAGER_OPS_DISPLAY} / {i18n.SOFTWARE_DEVELOPMENT} @ Philadelphia
            Scientific, LLC
          </b>
        </h5>
        <p className='tertiary-text'>
          <i>React, Typescript, Javascript, Python, Bootstrap, CSS, SQL</i>
        </p>
        <p className='secondary-text'>{i18n.BATTERY_MANAGER_OPS_DISPLAY_SUPPORTING_TEXT}</p>
        <hr />
        <h5 className="pt-2 primary-text">
          <b>
            {i18n.BATTERY_MANAGER_TOUCH_COMPUTER_APP} / {i18n.SOFTWARE_DEVELOPMENT} @ Philadelphia
            Scientific, LLC
          </b>
        </h5>
        <p className='tertiary-text'>
          <i>React, Typescript, Javascript, Python, Bootstrap, CSS</i>
        </p>
        <p className='secondary-text'>{i18n.BATTERY_MANAGER_TC_APP_SUPPORTING_TEXT}</p>
        <hr />
        <h5 className="pt-2 primary-text">
          <b>
            {i18n.SURVEILLANCE_SPOTLIGHT_DASHBOARD} / {i18n.SOFTWARE_DEVELOPMENT} @ Regulus Group,
            LLC w/ FAA
          </b>
        </h5>
        <p className='tertiary-text'>
          <i>HTML, CSS, PHP, Javascript, Bootstrap</i>
        </p>
        <p className='secondary-text'>{i18n.SURVEILLANCE_SPOTLIGHT_SUPPORTING_TEXT}</p>
      </div>
    </>
  );
};
