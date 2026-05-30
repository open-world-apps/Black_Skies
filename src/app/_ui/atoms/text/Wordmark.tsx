import { FC } from 'react';
import styled from 'styled-components';

const Root = styled.h1`
  font-family: var(--bs-display);
  font-weight: 700;
  font-size: 92px;
  line-height: 0.92;
  letter-spacing: -0.01em;
  margin: 0;
  color: #f3f5f8;
  text-shadow: 0 0 60px rgba(0, 0, 0, 0.6);

  @media (max-width: 1100px) {
    font-size: 72px;
  }
`;

const Skies = styled.span`
  color: #fff;
  position: relative;
`;

const SkiesDot = styled.span`
  position: absolute;
  right: -18px;
  top: 6px;
  width: 10px;
  height: 10px;
  background: var(--bs-accent);
  box-shadow: 0 0 26px 6px var(--bs-accent);
  border-radius: 50%;
`;

interface WordmarkProps {
  /** Optional className for external styling */
  className?: string;
}

/**
 * Wordmark atom — large BLACK SKIES title with glowing accent dot
 */
const Wordmark: FC<WordmarkProps> = ({ className }) => (
  <Root className={className}>
    BLACK
    <br />
    <Skies>
      SKIES
      <SkiesDot />
    </Skies>
  </Root>
);

export default Wordmark;
