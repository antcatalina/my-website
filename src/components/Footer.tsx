import { useState, ReactElement } from 'react';
import { FaReact, FaPython, FaAws } from 'react-icons/fa';
import { Container, Row, Col } from 'reactstrap';
import { useLocale } from '../hooks/useLocale';

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

  return (
    <div className="bottom-container border-top border-primary-subtle text-center bg-primary-subtle text-primary-emphasis mt-3 pt-5 pb-4">
      <Container>
        <Row>
          <Col xs={12} md={4} className="text-center">
            <FaReact size={60} style={{ color: '#0d6efd' }} />
            <h3 className="pt-3 pb-2">{i18n.FRONTEND}</h3>
            {!showStack ? (
              <p className="px-3">{i18n.FRONTEND_DESCRIPTION}</p>
            ) : (
              <div>
                <StackView showStack={showStack} spec="front" />
              </div>
            )}
          </Col>
          <Col xs={12} md={4} className="text-center mt-lg-0 mt-md-0 mt-4">
            <FaPython size={60} style={{ color: '#0d6efd' }} />
            <h3 className="pt-3 pb-2">{i18n.BACKEND}</h3>
            {!showStack ? (
              <p className="px-3">{i18n.BACKEND_DESCRIPTION}</p>
            ) : (
              <div>
                <StackView showStack={showStack} spec="back" />
              </div>
            )}
          </Col>
          <Col xs={12} md={4} className="text-center mt-lg-0 mt-md-0 mt-4">
            <FaAws size={60} style={{ color: '#0d6efd' }} />
            <h3 className="pt-3 pb-2">CI/CD</h3>
            {!showStack ? (
              <p className="px-3">{i18n.CI_CD_DESCRIPTION}</p>
            ) : (
              <div>
                <StackView showStack={showStack} spec="cloud" />
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-center">
            <button
              className={`my-4 btn btn-primary ${showStack && 'active'}`}
              onClick={() => setShowStack(!showStack)}
            >
              {i18n.TECH_STACK}
            </button>
          </div>
        </Row>
      </Container>
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
    <div className="text-center">
      {stacks[spec].map((tech) => (
        <div key={tech}>{tech}</div>
      ))}
    </div>
  );
};
