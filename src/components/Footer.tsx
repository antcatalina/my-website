import { useId, useState, type ReactElement } from 'react';
import { FaReact, FaPython, FaAws } from 'react-icons/fa';
import { SiAnthropic } from 'react-icons/si';
import { useLocale } from '../hooks/useLocale';
import './Footer.css';

type ModuleId = 'front' | 'back' | 'cloud' | 'ai';

const STACKS: Record<ModuleId, string[]> = {
  front: ['React', 'TypeScript', 'JavaScript', 'Lit', 'HTML', 'CSS'],
  back: ['Python', 'FastAPI', 'Flask', 'PostgreSQL', 'MQTT', 'Docker'],
  cloud: ['AWS', 'GitHub Actions', 'Amazon S3', 'Bitbucket', 'Jenkins'],
  ai: ['Claude Code', 'GitHub Copilot', 'Anthropic API', 'MCP', 'Figma', 'Confluence'],
};

export const Footer = (): ReactElement => {
  const { strings: i18n } = useLocale();
  const baseId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [open, setOpen] = useState<ModuleId | null>(null);

  const modules = [
    { id: 'front' as const, icon: FaReact, title: i18n.FRONTEND, body: i18n.FRONTEND_DESCRIPTION },
    { id: 'back' as const, icon: FaPython, title: i18n.BACKEND, body: i18n.BACKEND_DESCRIPTION },
    { id: 'cloud' as const, icon: FaAws, title: 'CI/CD', body: i18n.CI_CD_DESCRIPTION },
    { id: 'ai' as const, icon: SiAnthropic, title: i18n.AI_ENGINEERING, body: i18n.AI_ENGINEERING_DESCRIPTION },
  ];

  return (
    <footer className="rack">
      <h2 className="rack__heading">{i18n.TECH_STACK}</h2>

      <div className="rack__grid">
        {modules.map(({ id, icon: Icon, title, body }) => {
          const expanded = open === id;
          const panelId = `${baseId}-${id}`;

          return (
            <section key={id} className={`module reveal${expanded ? ' module--open' : ''}`}>
              <button
                type="button"
                className="module__toggle"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen((prev) => (prev === id ? null : id))}
              >
                <Icon className="module__icon" aria-hidden="true" />
                <span className="module__title">{title}</span>
                <span className="module__sign" aria-hidden="true" />
              </button>

              <p className="module__body">{body}</p>

              {/* Collapsed with `grid-template-rows: 0fr → 1fr`, which animates
                  to intrinsic height without measuring anything in JS. */}
              <div id={panelId} className="module__drawer">
                <ul className="module__stack">
                  {STACKS[id].map((tech, index) => (
                    <li
                      key={tech}
                      className="module__tech"
                      style={{ '--i': index } as React.CSSProperties}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      <p className="rack__colophon">
        <span>© {new Date().getFullYear()} Anthony Catalina</span>
      </p>
    </footer>
  );
};
