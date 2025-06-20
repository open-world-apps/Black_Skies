import { styled } from '@/lib/configs/stitches.config';
import { green, violet } from '@radix-ui/colors';

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
});

export default Button;
