'use client';

import { Color } from '@/lib/types';
import isColor from '@/lib/validators/isColor';
import styled from 'styled-components';

interface Props {
  color: Color;
  $fontSize: string;
}

const Header = styled.h1<Props>`
  color: ${({ color }) => (isColor(color) ? color : 'initial')};
  font-size: ${({ $fontSize }) => $fontSize ?? 'initial'};
  margin: 10px;
`;

export default Header;
