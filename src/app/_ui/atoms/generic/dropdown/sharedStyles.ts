import { css, keyframes } from '@/lib/configs/stitches.config';

export const slideDownAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-2px)',
  },
  to: {
    opacity: '100%',
    transform: 'translateY(0)',
  },
});

export const slideLeftAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)',
  },
});

export const slideUpAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const slideRightAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(-2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)',
  },
});

export const content = css({
  minWidth: '220px',
  backgroundColor: 'White',
  borderRadius: '6px',
  padding: '5px',
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35),' +
    '0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  zIndex: 9999,

  '&[data-side="top"]': {
    animationName: slideDownAndFade,
  },
  '&[data-side="right"]': {
    animationName: slideLeftAndFade,
  },
  '&[data-side="bottom"]': {
    animationName: slideUpAndFade,
  },
  '&[data-side="left"]': {
    animationName: slideRightAndFade,
  },
});

export const item = css({
  fontSize: '13px',
  lineHeight: '1',
  color: 'BlueViolet',
  borderRadius: '3px',
  display: 'flex',
  alignItems: 'center',
  height: '25px',
  padding: '0 5px',
  position: 'relative',
  paddingLeft: '25px',
  userSelect: 'none',
  outline: 'none',

  '&[data-disabled]': {
    color: 'DimGrey',
    pointerEvents: 'none',
  },
  '&[data-highlighted]': {
    backgroundColor: 'Violet',
    color: 'BlueViolet',
  },
});

export const disabled = css({
  ['data-disabled']: {
    pointerEvents: 'none',
  },
});

export const highlighted = css({
  ['data-highlighted']: {
    backgroundColor: 'Violet',
    color: 'Violet',
  },
});
