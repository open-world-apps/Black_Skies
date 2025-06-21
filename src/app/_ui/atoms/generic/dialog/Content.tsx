import { keyframes, styled } from '@/lib/configs/stitches.config';
import { Dialog } from 'radix-ui';
import { gray } from '@radix-ui/colors';

const contentShow = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const Content = styled(Dialog.Content, {
  background: gray.gray1,
  borderRadius: '6px',
  boxShadow: 'var(--shadow-6)',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '85vh',
  padding: '25px',
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

  '&:focus': {
    outline: 'none',
  },
});

export default Content;
