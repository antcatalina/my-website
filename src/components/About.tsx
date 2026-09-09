import { type ReactElement } from 'react';
import { useLocale } from '../hooks/useLocale';
import './Sections.css';

export const About = (): ReactElement => {
  const { strings: i18n } = useLocale();

  return (
    <div className="section">
      <p className="section__lead">{i18n.ABOUT_HEADLINE}</p>
      <p className="section__body">{i18n.ABOUT_SUPPORTING_TEXT}</p>
    </div>
  );
};
