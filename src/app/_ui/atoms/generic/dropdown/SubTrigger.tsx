'use client';

import styled from 'styled-components';
import { SubTrigger as ST } from '@radix-ui/react-dropdown-menu';
import { item } from './sharedStyles';

const SubTrigger = styled(ST)`
  ${item}

  &[data-state="open"] {
    background-color: violet;
    color: violet;
  }
`;

export default SubTrigger;
