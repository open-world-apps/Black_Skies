'use client';

import styled from 'styled-components';
import { ItemIndicator as II } from '@radix-ui/react-dropdown-menu';

const ItemIndicator = styled(II)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export default ItemIndicator;
