import { useState, ReactElement } from 'react';
import { FaReact, FaPython, FaAws } from 'react-icons/fa';
import { useLocale } from '../hooks/useLocale';
import './Footer.scss';

/** Props for the StackView component specifying visibility and stack type */
interface IStackViewProps {
  showStack: boolean;
  spec: 'front' | 'back' | 'cloud';
}

export const Footer = (): ReactElement => {
  /** Get localized strings for the current language from the locale context. */
  const { strings: i18n } = useLocale();

  /** Tracks whether the tech stack details are visible, and provides a setter to toggle it */
  const [showStack, setShowStack] = useState<boolean>(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const sections = [
    {
      id: 'front',
      icon: FaReact,
      title: i18n.FRONTEND,
      description: i18n.FRONTEND_DESCRIPTION,
      color: '#61dafb',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 'back',
      icon: FaPython,
      title: i18n.BACKEND,
      description: i18n.BACKEND_DESCRIPTION,
      color: '#3776ab',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      id: 'cloud',
      icon: FaAws,
      title: 'CI/CD',
      description: i18n.CI_CD_DESCRIPTION,
      color: '#ff9900',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
  ];

  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-grid">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className={`footer-card ${hoveredCard === section.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(section.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="footer-card-glow" style={{ background: section.gradient }}></div>
                <div className="footer-card-content">
                  <div className="footer-icon-wrapper">
                    <Icon className="footer-icon" style={{ color: section.color }} />
                  </div>
                  <h3 className="footer-card-title">{section.title}</h3>
                  {!showStack ? (
                    <p className="footer-card-description">{section.description}</p>
                  ) : (
                    <StackView
                      showStack={showStack}
                      spec={section.id as 'front' | 'back' | 'cloud'}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="footer-button-wrapper">
          <button
            className={`footer-stack-button ${showStack ? 'active' : ''}`}
            onClick={() => setShowStack(!showStack)}
          >
            <span className="footer-button-text">{i18n.TECH_STACK}</span>
            <span className="footer-button-glow"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

/** Displays a list of technologies for the given stack type if showStack is true */
const StackView = ({ showStack, spec }: IStackViewProps) => {
  if (!showStack) return null;

  const stacks = {
    front: ['React', 'TypeScript', 'JavaScript', 'LitElement', 'HTML', 'CSS', 'VS Code'],
    back: ['Python', 'Flask', 'HTTP', 'MQTT', 'SQL', 'Docker', 'MySQL Workbench', 'Postman'],
    cloud: ['AWS', 'GitHub', 'Amazon S3', 'Bitbucket', 'Jenkins'],
  };

  return (
    <div className="stack-list">
      {stacks[spec].map((tech, index) => (
        <div key={tech} className="stack-item" style={{ animationDelay: `${index * 0.05}s` }}>
          <span className="stack-dot"></span>
          {tech}
        </div>
      ))}
    </div>
  );
};
