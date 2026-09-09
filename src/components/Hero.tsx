import { type ReactElement } from 'react';
import avatar from '../images/anthony.jpg';
import { useLocale } from '../hooks/useLocale';
import './Hero.css';

/** First professional engineering role — the readout counts up from here. */
const CAREER_START = new Date('2021-06-01');

const yearsShipping = () => {
  const ms = Date.now() - CAREER_START.getTime();
  return Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000));
};

export const Hero = (): ReactElement => {
  const { strings: i18n } = useLocale();

  return (
    <header className="hero">
      <div className="hero__body">
        <p className="hero__eyebrow">
          <span className="hero__rule" aria-hidden="true" />
          {i18n.ABOUT_ME}
        </p>

        {/* The only h1 on the page. */}
        <h1 className="hero__title">{i18n.HERO_TITLE}</h1>

        <p className="hero__place">{i18n.FORT_COLLINS_COLORADO}</p>
        <p className="hero__coords" aria-hidden="true">
          40.5853° N · 105.0844° W
        </p>
      </div>

      <figure className="hero__plate">
        <img
          className="hero__portrait"
          src={avatar}
          alt="Anthony Catalina"
          width={320}
          height={320}
          /* Above the fold — never lazy-load the LCP candidate. */
          fetchPriority="high"
          decoding="async"
        />
        <span className="hero__scan" aria-hidden="true" />
        {/* Registration marks, as on a calibration plate. */}
        <span className="hero__tick hero__tick--tl" aria-hidden="true" />
        <span className="hero__tick hero__tick--tr" aria-hidden="true" />
        <span className="hero__tick hero__tick--bl" aria-hidden="true" />
        <span className="hero__tick hero__tick--br" aria-hidden="true" />
      </figure>

      <dl className="hero__readout">
        <div className="hero__cell">
          <dt>YRS</dt>
          <dd>{yearsShipping()}+</dd>
        </div>
        <div className="hero__cell">
          <dt>FRONT</dt>
          <dd>React · TS</dd>
        </div>
        <div className="hero__cell">
          <dt>BACK</dt>
          <dd>Python · FastAPI</dd>
        </div>
        <div className="hero__cell">
          <dt>STATUS</dt>
          <dd className="hero__status">
            <span className="hero__lamp" aria-hidden="true" />
            Open
          </dd>
        </div>
      </dl>
    </header>
  );
};
