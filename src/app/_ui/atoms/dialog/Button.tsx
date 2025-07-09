import styled from 'styled-components';
import { gray, green, violet } from '@radix-ui/colors';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
  user-select: none;
  border: none;
  outline: none;

  &:focus:not(:focus-visible) {
    outline: 0;
  }

  &:focus-visible {
    outline: 2px solid ${violet.violet7};
    outline-offset: 1px;
  }

  &.green {
    background-color: ${green.green7};
    color: ${green.green11};
    outline-color: ${green.green7};
  }

  &.green:hover {
    background: ${green.green5};
  }

  &.icon {
    all: 'unset';
    font-family: 'inherit';
    border-radius: '100%';
    height: '25px';
    width: '25px';
    display: 'inline-flex';
    align-items: 'center';
    justify-content: 'center';
    color: ${violet.violet11};
    position: 'absolute';
    top: '10px';
    right: '10px';
    background-color: ${gray.gray3};
  }

  &.icon:hover {
    background-color: ${violet.violet4};
  }

  &.icon:focus {
    box-shadow: 0 0 0 2px ${violet.violet7};
  }
`;

export default Button;
