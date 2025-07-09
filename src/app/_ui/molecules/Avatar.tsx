import React, { ReactElement, FC } from 'react';
import AvatarRoot from '../atoms/avatar/AvatarRoot';
import AvatarImage from '../atoms/avatar/AvatarImage';
import AvatarFallback from '../atoms/avatar/AvatarFallback';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
}

const Avatar: FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  ...props
}): ReactElement => (
  <AvatarRoot {...props}>
    <AvatarImage src={src} alt={alt} />
    <AvatarFallback delayMs={600}>{fallback}</AvatarFallback>
  </AvatarRoot>
);

export default Avatar;
