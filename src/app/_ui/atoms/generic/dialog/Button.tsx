import { styled } from '@/lib/configs/stitches.config';
import { gray, green, violet } from '@radix-ui/colors';

const Button = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  padding: '0 15px',
  fontSize: '15px',
  lineHeight: 1,
  fontWeight: 500,
  height: '35px',
  userSelect: 'none',
  border: 'none',
  outline: 'none',

  '&:focus:not(:focus-visible)': {
    outline: 0,
  },
  '&:focus-visible': {
    outline: `2px solid ${violet.violet6}`,
    outlineOffset: '1px',
  },
  '&.green': {
    backgroundColor: green.green4,
    color: green.green11,
    outlineColor: green.green7,
  },
  '&.green:hover': {
    background: green.green5,
  },
  '&.icon': {
    all: 'unset',
    fontFamily: 'inherit',
    borderRadius: '100%',
    height: '25px',
    width: '25px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: violet.violet11,
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: gray.gray3,
  },
  '&.icon:hover': {
    backgroundColor: violet.violet4,
  },
  '&.icon:focus': {
    boxShadow: `0 0 0 2px ${violet.violet7}`,
  },
});

export default Button;
