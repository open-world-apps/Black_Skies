import React, { FC, ReactElement } from 'react';

interface CharHeaderProps {
  name: string;
  rank: string | undefined;
  active: boolean;
}

const CharHeader: FC<CharHeaderProps> = ({
  name,
  rank,
  active,
}): ReactElement => (
  <h1>
    {name}
    {rank && <span>&comma; {rank}</span>}
    {active && (
      <>
        &nbsp;<span>(Active)</span>
      </>
    )}
  </h1>
);

export default CharHeader;
