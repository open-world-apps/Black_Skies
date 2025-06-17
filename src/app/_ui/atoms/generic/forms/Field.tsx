'use client';

import { styled } from '@/lib/configs/stitches.config';
import { Field as _Field } from '@radix-ui/react-form';

const Field = styled(_Field, { display: 'grid', marginBottom: '10px' });

export default Field;
