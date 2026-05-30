import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  font-size: 10px;
  color: var(--bs-ink-dim);
  letter-spacing: 0.1em;
  text-align: center;
  line-height: 1.6;
`;

interface FootNoteProps {
  /** Footnote text */
  children: ReactNode;
  /** Optional className for external styling */
  className?: string;
}

/**
 * FootNote atom — small footnote text display
 */
const FootNote: FC<FootNoteProps> = ({ children, className }) => (
  <Root className={className}>{children}</Root>
);

export default FootNote;
