import styled, { keyframes } from 'styled-components';
import { Content as C } from '@radix-ui/react-dialog';
import { gray } from '@radix-ui/colors';

const contentShow = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Content = styled(C)`
  background: ${gray.gray1};
  border-radius: 6px;
  box-shadow: var(--shadow-6);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  color: black;

  &:focus {
    outline: none;
  }
`;

export default Content;
