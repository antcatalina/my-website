import { type ReactElement } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { useLocale } from '../hooks/useLocale';
import './Sections.css';

export const Projects = (): ReactElement => {
  const { strings: i18n } = useLocale();

  /** Built from the locale strings on each render rather than hoisted to module scope. */
  const projects = [
    {
      name: 'Pedro',
      href: 'https://github.com/antcatalina/pedro',
      role: `${i18n.LANGUAGE_DESIGN_COMPILER_ENGINEERING} · ${i18n.PERSONAL_PROJECT}`,
      stack: ['Python', 'Compiler Design', 'Claude Code'],
      body: i18n.PEDRO_SUPPORTING_TEXT,
    },
    {
      name: 'PassportIQ',
      href: 'https://passportiq.app',
      role: `${i18n.FULL_STACK_DEVELOPMENT} @ Mattermind`,
      stack: ['React', 'TypeScript', 'FastAPI', 'Python', 'PostgreSQL', 'Stripe', 'Playwright'],
      body: i18n.PASSPORTIQ_SUPPORTING_TEXT,
    },
    {
      name: i18n.WATER_ANALYSIS_UI,
      role: `${i18n.FIRMWARE_UI_DEVELOPMENT} @ Hach Company`,
      stack: ['TypeScript', 'Lit', 'React', 'SCSS', 'Jenkins', 'Bitbucket', 'MQTT', 'Jest'],
      body: i18n.WATER_ANALYSIS_UI_SUPPORTING_TEXT,
    },
    {
      name: i18n.BATTERY_MANAGER_OPS_DISPLAY,
      role: `${i18n.SOFTWARE_DEVELOPMENT} @ Philadelphia Scientific`,
      stack: ['React', 'TypeScript', 'JavaScript', 'Python', 'SQL'],
      body: i18n.BATTERY_MANAGER_OPS_DISPLAY_SUPPORTING_TEXT,
    },
    {
      name: i18n.BATTERY_MANAGER_TOUCH_COMPUTER_APP,
      role: `${i18n.SOFTWARE_DEVELOPMENT} @ Philadelphia Scientific`,
      stack: ['React', 'TypeScript', 'JavaScript', 'Python', 'CSS'],
      body: i18n.BATTERY_MANAGER_TC_APP_SUPPORTING_TEXT,
    },
    {
      name: i18n.SURVEILLANCE_SPOTLIGHT_DASHBOARD,
      role: `${i18n.SOFTWARE_DEVELOPMENT} @ Regulus Group · FAA`,
      stack: ['PHP', 'JavaScript', 'HTML', 'CSS'],
      body: i18n.SURVEILLANCE_SPOTLIGHT_SUPPORTING_TEXT,
    },
  ];

  return (
    <ol className="entries">
      {projects.map((project, index) => (
        <li key={project.name} className="entry reveal">
          <span className="entry__index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="entry__main">
            <h2 className="entry__title">
              {project.href ? (
                <a
                  className="entry__link"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.name}
                  <BsArrowUpRight aria-hidden="true" />
                </a>
              ) : (
                project.name
              )}
            </h2>
            <p className="entry__role">{project.role}</p>
            <p className="entry__body">{project.body}</p>

            <ul className="chips" aria-label="Stack">
              {project.stack.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
};
