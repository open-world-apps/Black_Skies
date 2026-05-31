import { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface FeedFrameProps {
  children?: ReactNode;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FeedFrame: FC<FeedFrameProps> = ({ children }) => {
  return <Root>{children}</Root>;
};

export default FeedFrame;
