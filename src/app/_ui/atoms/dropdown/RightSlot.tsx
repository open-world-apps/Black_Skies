'use client';

import styled from 'styled-components';
import { violet } from '@radix-ui/colors';
import Container from '../Container';

const RightSlot = styled(Container)`
  margin-left: auto;
  padding-left: 20px;
  color: ${violet.violet7};

  [data-highlighted] > & {
    color: 'White';
  }

  [data-disabled] & {
    color: ${violet.violet11};
  }
`;

export default RightSlot;
