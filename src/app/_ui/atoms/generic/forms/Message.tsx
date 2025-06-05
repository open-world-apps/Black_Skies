'use client';

import { styled } from '@/lib/configs/stitches.config';
import { Form } from 'radix-ui';

const Message = styled(Form.Message, {
  fontSize: '13px',
  color: 'White',
  opacity: '0.8',
});

export default Message;
