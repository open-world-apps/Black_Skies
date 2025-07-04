'use client';

import styled from 'styled-components';

const RTButton = styled.button`
  width: 150px;
  padding: 10px;
  background: rgba(0, 0, 0, 0);
  color: White;
  border-radius: 100px;
  border: 1px solid white;

  &:hover {
    background: rgba(156, 163, 150, 0.4);
    color: Yellow;
    cursor: pointer;
  }
`;

export default RTButton;
