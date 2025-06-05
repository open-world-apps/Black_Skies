import React, { FC, ReactElement } from 'react';
import AvatarRoot from '../atoms/generic/avatar/AvatarRoot';
import AvatarImage from '../atoms/generic/avatar/AvatarImage';
import AvatarFallback from '../atoms/generic/avatar/AvatarFallback';

const Avatar: FC = (): ReactElement => (
  <AvatarRoot>
    <AvatarImage
      src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      alt="Person Import"
    />
    <AvatarFallback delayMs={600}>PI</AvatarFallback>
  </AvatarRoot>
);

export default Avatar;
