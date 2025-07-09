'use client';

import styled from 'styled-components';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  border: none;
  font-size: 15px;
  font-weight: 500;
  width: 100%;
  background-color: rgba(91, 110, 20);
  color: black;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`;

export default Button;
