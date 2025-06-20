import { styled } from '@/lib/configs/stitches.config';
import { mauve } from '@radix-ui/colors';
import { Dialog } from 'radix-ui';

const Description = styled(Dialog.Description, {
  margin: '10px 0 20px',
  color: mauve.mauve12,
  fontSize: '15px',
  lineHeight: 1.5,
});

export default Description;
