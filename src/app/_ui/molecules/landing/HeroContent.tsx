import { FC } from 'react';
import styled from 'styled-components';
import Eyebrow from 'ui/atoms/text/Eyebrow';
import Wordmark from 'ui/atoms/text/Wordmark';
import Cursor from 'ui/atoms/effects/Cursor';
import Stats from 'ui/molecules/landing/Stats';

const Root = styled.div`
  max-width: 560px;
`;

const Tagline = styled.p`
  font-size: 15px;
  line-height: 1.5;
  letter-spacing: 0.02em;
  color: var(--bs-ink-dim);
  margin: 26px 0 0;
  min-height: 46px;
  max-width: 440px;
`;

interface HeroContentProps {
  /** Eyebrow text (sector/status) */
  eyebrow: string;
  /** Tagline text */
  tagline: string;
  /** Whether tagline animation is complete */
  taglineDone: boolean;
  /** Array of stat data [label, value] */
  stats: Array<readonly [string, string]>;
  /** Optional className for external styling */
  className?: string;
}

/**
 * HeroContent molecule — left hero section with branding, tagline, and stats
 */
const HeroContent: FC<HeroContentProps> = ({
  eyebrow,
  tagline,
  taglineDone,
  stats,
  className,
}) => (
  <Root className={className}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <Wordmark />
    <Tagline>
      {tagline}
      <Cursor visible={!taglineDone} />
    </Tagline>
    <Stats stats={stats} />
  </Root>
);

export default HeroContent;
