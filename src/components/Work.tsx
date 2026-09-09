import { type ReactElement } from 'react';
import hach from '../images/hach.png';
import psLogo from '../images/ps_symbol_tm.png';
import regulus from '../images/regulus-logo.png';
import { useLocale } from '../hooks/useLocale';
import './Sections.css';

export const Work = (): ReactElement => {
  const { strings: i18n } = useLocale();

  const roles = [
    {
      company: 'Hach Company',
      href: 'https://www.hach.com',
      logo: hach,
      title: i18n.EMBEDDED_UI_ENGINEER,
      place: i18n.LOVELAND_CO_USA,
      from: i18n.APRIL_2025,
      to: i18n.PRESENT,
      note: i18n.HACH_PROMOTION_NOTE,
      current: true,
      bullets: [
        i18n.HACH_EXPERIENCE_1,
        i18n.HACH_EXPERIENCE_2,
        i18n.HACH_EXPERIENCE_3,
        i18n.HACH_EXPERIENCE_4,
      ],
    },
    {
      company: 'Philadelphia Scientific, LLC',
      href: 'https://www.phlsci.com',
      logo: psLogo,
      title: i18n.SOFTWARE_ENGINEER,
      place: i18n.MONTGOMERYVILLE_PA_USA,
      from: i18n.SEPTEMBER_2022,
      to: i18n.APRIL_2025,
      bullets: [i18n.PHLSCI_EXPERIENCE_1, i18n.PHLSCI_EXPERIENCE_2, i18n.PHLSCI_EXPERIENCE_3],
    },
    {
      company: 'Regulus Group, LLC',
      href: 'https://regulus-group.com',
      logo: regulus,
      title: i18n.SOFTWARE_ENGINEER,
      place: i18n.EGG_HARBOR_NJ_USA,
      from: i18n.JUNE_2021,
      to: i18n.SEPTEMBER_2022,
      bullets: [i18n.REGULUS_EXPERIENCE_1, i18n.REGULUS_EXPERIENCE_2, i18n.REGULUS_EXPERIENCE_3],
    },
  ];

  return (
    <ol className="timeline">
      {roles.map((role) => (
        <li key={`${role.company}-${role.from}`} className="timeline__role reveal">
          <span
            className={`timeline__node${role.current ? ' timeline__node--live' : ''}`}
            aria-hidden="true"
          />

          <div className="timeline__main">
            <div className="timeline__head">
              <a href={role.href} target="_blank" rel="noreferrer" className="timeline__logo">
                <img src={role.logo} alt={role.company} width={32} height={32} loading="lazy" />
              </a>
              <div>
                <h2 className="entry__title">{role.title}</h2>
                <p className="entry__role">
                  <a href={role.href} target="_blank" rel="noreferrer">
                    {role.company}
                  </a>
                </p>
              </div>
            </div>

            <p className="timeline__meta">
              <span>{role.place}</span>
              <span aria-hidden="true">·</span>
              <span>
                {role.from} — {role.to}
              </span>
            </p>

            {role.note && <p className="timeline__note">{role.note}</p>}

            <ul className="bullets">
              {role.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
};
