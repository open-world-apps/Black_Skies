import { css } from 'styled-components';

export const reset = css`
  all: unset;
  box-sizing: border-box;
`;

export const inputs = css`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 15px;
  color: White;
  background-color: Black;
  box-shadow: 0 0 0 1px black;
`;

export const inputTextAreaHover = css`
  &:hover {
    box-shadow: 0 0 0 1px black;
  }
`;

export const inputTextAreaFocus = css`
  &:hover {
    box-shadow: 0 0 0 2px black;
  }
`;

export const inputTextAreaSelection = css`
  &::selection {
    background-color: black;
    color: white;
  }
`;
