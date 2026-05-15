import hach from '../images/hach.png';
import psLogo from '../images/ps_symbol_tm.png';
import regulus from '../images/regulus-logo.png';
import { ReactElement } from 'react';
import { useLocale } from '../hooks/useLocale';

export const Work = (): ReactElement => {
  /** Get localized strings for the current language from the locale context. */
  const { strings: i18n } = useLocale();
  
  return (
    <>
      <div className="px-5 py-4 container info-container rounded-3">
        <h4 className="pt-2">
          <a href="https://www.hach.com" target="_blank">
            <img src={hach} alt="Avatar" width="42px" className="rounded-circle" />
          </a>
          <b className="ms-3 primary-text">
            {i18n.CONTRACT_FIRMWARE_ENGINEER} /
            <a className="text-decoration-none" href="https://www.hach.com" target="_blank">
              {' '}
              Hach Company
            </a>
          </b>
        </h4>
        <div className='tertiary-text'>
          <i>{i18n.LOVELAND_CO_USA}</i>
        </div>
        <div className='tertiary-text'>
          {i18n.APRIL_2025} - {i18n.PRESENT}
        </div>
        <p className="pt-3 secondary-text">
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
          <b className="ms-3 primary-text">
            {i18n.SOFTWARE_ENGINEER} /
            <a className="text-decoration-none" href="https://www.phlsci.com" target="_blank">
              {' '}
              Philadelphia Scientific, LLC
            </a>
          </b>
        </h4>
        <div className='tertiary-text'>
          <i>{i18n.MONTGOMERYVILLE_PA_USA}</i>
        </div>
        <div className='tertiary-text'>
          {i18n.SEPTEMBER_2022} - {i18n.APRIL_2025}
        </div>
        <p className="pt-3 secondary-text">
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
          <b className="ms-3 primary-text">
            {i18n.SOFTWARE_ENGINEER} /
            <a className="text-decoration-none" href="https://regulus-group.com/" target="_blank">
              {' '}
              Regulus Group, LLC
            </a>
          </b>
        </h4>
        <div className='tertiary-text'>
          <i>{i18n.EGG_HARBOR_NJ_USA}</i>
        </div>
        <div className='tertiary-text'>
          {i18n.JUNE_2021} - {i18n.SEPTEMBER_2022}
        </div>
        <p className="pt-3 secondary-text">
          <ul>
            <li>{i18n.REGULUS_EXPERIENCE_1}</li>
            <li>{i18n.REGULUS_EXPERIENCE_2}</li>
            <li>{i18n.REGULUS_EXPERIENCE_3}</li>
          </ul>
        </p>
      </div>
    </>
  );
};
