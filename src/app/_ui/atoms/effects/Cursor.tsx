import { FC } from 'react';
import styled from 'styled-components';

const Span = styled.span<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  color: var(--bs-accent);
`;

interface CursorProps {
  /** Whether cursor should be visible */
  visible: boolean;
  /** Optional className for external styling */
  className?: string;
}

/**
 * Cursor atom — animated typing cursor
 */
const Cursor: FC<CursorProps> = ({ visible, className }) => (
  <Span $visible={visible} className={className}>
    ▋
  </Span>
);

export default Cursor;
