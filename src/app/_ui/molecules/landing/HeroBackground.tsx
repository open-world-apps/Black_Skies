import { FC } from 'react';
import styled from 'styled-components';

const Hero = styled.div`
  position: absolute;
  inset: 0;
  background-image: url('/intake/eclipse-hero.png');
  background-size: cover;
  background-position: center right;
`;

const ScrimX = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(5, 6, 10, 0.96) 0%,
    rgba(5, 6, 10, 0.86) 32%,
    rgba(5, 6, 10, 0.35) 60%,
    rgba(5, 6, 10, 0) 100%
  );
`;

const ScrimY = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    0deg,
    rgba(5, 6, 10, 0.92) 0%,
    rgba(5, 6, 10, 0) 38%
  );
`;

interface HeroBackgroundProps {
  /** Optional className for external styling */
  className?: string;
}

/**
 * HeroBackground molecule — hero image with horizontal and vertical gradient scrims
 */
const HeroBackground: FC<HeroBackgroundProps> = ({ className }) => (
  <>
    <Hero className={className} />
    <ScrimX />
    <ScrimY />
  </>
);

export default HeroBackground;
