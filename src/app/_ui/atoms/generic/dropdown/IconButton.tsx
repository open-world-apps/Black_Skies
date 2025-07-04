'use client';

import styled from 'styled-components';

const IconButton = styled.button`
  border-radius: 100%;
  height: 35px;
  width: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 10px black;

  &:hover {
    background-color: violet,
  }

  &:focus {
    box-shadow: 0 0 0 2px black;
  }

  & * {
    all: unset;
  }
`;

export default IconButton;
