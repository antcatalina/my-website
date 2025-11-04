import { HomeNav, IHomeNavProps } from './Home';
import { FaBriefcase } from 'react-icons/fa';
import hach from '../images/hach.png';
import psLogo from '../images/ps_symbol_tm.png';
import regulus from '../images/regulus-logo.png';
import { ReactElement } from 'react';
import { useLocale } from '../hooks/useLocale';

export const Work = (props: IHomeNavProps): ReactElement => {
  /** Get localized strings for the current language from the locale context. */
  const { strings: i18n } = useLocale();
  
  return (
    <>
      <div className="p-5 container info-container rounded-3">
        <div className="d-flex text-primary">
          <h2>
            <FaBriefcase className="me-2" />{' '}
          </h2>
          <h2>
            <div className="ms-2 mt-1">{i18n.WORK_EXPERIENCE}</div>
          </h2>
        </div>
        <hr />
        <h4 className="pt-2">
          <a href="https://www.hach.com" target="_blank">
            <img src={hach} alt="Avatar" width="42px" className="rounded-circle" />
          </a>
          <b className="ms-3">
            {i18n.CONTRACT_FIRMWARE_ENGINEER} /
            <a className="text-decoration-none" href="https://www.hach.com" target="_blank">
              {' '}
              Hach Company
            </a>
          </b>
        </h4>
        <div>
          <i>{i18n.LOVELAND_CO_USA}</i>
        </div>
        <div>
          {i18n.APRIL_2025} - {i18n.PRESENT}
        </div>
        <p className="pt-3">
          <ul>
            <li>{i18n.HACH_EXPERIENCE_1}</li>
            <li>{i18n.HACH_EXPERIENCE_2}</li>
            <li>{i18n.HACH_EXPERIENCE_3}</li>
          </ul>
        </p>
        <h4 className="pt-2">
          <a href="https://phlsci.com" target="_blank">
            <img src={psLogo} alt="Avatar" width="42px" />
          </a>
          <b className="ms-3">
            {i18n.SOFTWARE_ENGINEER} /
            <a className="text-decoration-none" href="https://www.phlsci.com" target="_blank">
              {' '}
              Philadelphia Scientific, LLC
            </a>
          </b>
        </h4>
        <div>
          <i>{i18n.MONTGOMERYVILLE_PA_USA}</i>
        </div>
        <div>
          {i18n.SEPTEMBER_2022} - {i18n.APRIL_2025}
        </div>
        <p className="pt-3">
          <ul>
            <li>{i18n.PHLSCI_EXPERIENCE_1}</li>
            <li>{i18n.PHLSCI_EXPERIENCE_2}</li>
            <li>{i18n.PHLSCI_EXPERIENCE_3}</li>
          </ul>
        </p>
        <h4 className="pt-3">
          <a href="https://regulus-group.com" target="_blank">
            <img src={regulus} alt="Avatar" width="42px" className="rounded-circle" />
          </a>
          <b className="ms-3">
            {i18n.SOFTWARE_ENGINEER} /
            <a className="text-decoration-none" href="https://regulus-group.com/" target="_blank">
              {' '}
              Regulus Group, LLC
            </a>
          </b>
        </h4>
        <div>
          <i>{i18n.EGG_HARBOR_NJ_USA}</i>
        </div>
        <div>
          {i18n.JUNE_2021} - {i18n.SEPTEMBER_2022}
        </div>
        <p className="pt-3">
          <ul>
            <li>{i18n.REGULUS_EXPERIENCE_1}</li>
            <li>{i18n.REGULUS_EXPERIENCE_2}</li>
            <li>{i18n.REGULUS_EXPERIENCE_3}</li>
          </ul>
        </p>
        <HomeNav {...props} />
      </div>
    </>
  );
};
