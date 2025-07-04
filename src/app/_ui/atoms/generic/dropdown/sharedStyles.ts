import { violet } from '@radix-ui/colors';
import { css, keyframes } from 'styled-components';

export const slideDownAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px);
  }

  to {
    opacity: 100%;
    transform: translateY(0);
  }
`;

export const slideLeftAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(2px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideRightAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(-2px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const content = css`
  min-width: 220px;
  background-color: white;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35) 0px 10px 20px -15px
    rgba(22, 23, 24, 0.2);
  animation-duration: '400ms';
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  z-index: 9999;

  &[data-side='top'] {
    animation-name: ${slideDownAndFade};
  }

  &[data-side='right'] {
    animation-name: ${slideLeftAndFade};
  }

  &[data-side='bottom'] {
    animation-name: ${slideUpAndFade};
  }

  &[data-side='left'] {
    animation-name: ${slideRightAndFade};
  }
`;

export const item = css`
  font-size: 13px;
  line-height: 1;
  color: ${violet.violet1};
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 5px;
  position: relative;
  padding-left: 25px;
  user-select: none;
  outline: none;

  &[data-disabled] {
    color: grey;
    pointer-events: none;
  }

  &[data-highlighted] {
    background-color: violet;
    color: blueviolet;
  }
`;

export const disabled = css`
  [data-disabled] {
    pointer-events: none;
  }
`;

export const highlighted = css`
  [data-highlighted] {
    background-color: violet;
    color: violet;
  }
`;
