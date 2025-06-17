import { css } from '@/lib/configs/stitches.config';

export const reset = css({
  all: 'unset',
  boxSizing: 'border-box',
});

export const inputs = css({
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  fontSize: '15px',
  color: 'White',
  backgroundColor: 'Black',
  boxShadow: '0 0 0 1px black',
});

export const inputTextAreaHover = css({
  '&:hover': {
    boxShadow: '0 0 0 1px black',
  },
});

export const inputTextAreaFocus = css({
  '&:hover': {
    boxShadow: '0 0 0 2px black',
  },
});

export const inputTextAreaSelection = css({
  '&::selection': {
    backgroundColor: 'Black',
    color: 'White',
  },
});
