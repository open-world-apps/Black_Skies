import { styled } from '@/lib/configs/stitches.config';
import Button from './Button';

const ProviderBtn = styled(Button, {
  width: '100%',
  borderRadius: '5px',
  background: 'white',
  padding: '0',

  '&:hover': {
    cursor: 'pointer',
  },
});

export default ProviderBtn;
