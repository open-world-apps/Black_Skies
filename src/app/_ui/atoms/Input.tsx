'use client';

import styled from 'styled-components';
import { violet } from '@radix-ui/colors';

const Input = styled.input`
  all: unset;
  width: 100%;
  height: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 15px;
  line-height: 1;
  color: ${violet.violet11};
  padding: 10px;
  box-shadow: 0 0 0 1px ${violet.violet7};

  &.flex {
    flex: 1;
  }

  &:focus {
    box-shadow: 0 0 0 2px ${violet.violet8};
  }
`;

export default Input;
