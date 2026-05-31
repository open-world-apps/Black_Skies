import { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface FeedHeaderProps {
  children?: ReactNode;
}

const Root = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 14px;
  margin-bottom: 2px;
  border-bottom: 1px solid var(--bs-line);
  flex-shrink: 0;
  gap: 9px;
  align-items: center;
`;

const FeedHeader: FC<FeedHeaderProps> = ({ children }) => {
  return <Root>{children}</Root>;
};

export default FeedHeader;
