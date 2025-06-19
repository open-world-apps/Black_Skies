import React, { ReactElement, FC } from 'react';
import AvatarRoot from '../atoms/generic/avatar/AvatarRoot';
import AvatarImage from '../atoms/generic/avatar/AvatarImage';
import AvatarFallback from '../atoms/generic/avatar/AvatarFallback';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
}

const Avatar: FC<AvatarProps> = ({src, alt, fallback, ...props}): ReactElement => (
  <AvatarRoot {...props}>
      <AvatarImage
        src={src}
        alt={alt}
      />
      <AvatarFallback delayMs={600}>{fallback}</AvatarFallback>
    </AvatarRoot>
  );

export default Avatar;
