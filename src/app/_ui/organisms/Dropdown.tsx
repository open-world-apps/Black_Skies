'use client';

import React, { FC, ReactElement } from 'react';
import { useSession } from 'next-auth/react';
import { DropdownMenu } from 'radix-ui';
import Content from 'ui/atoms/generic/dropdown/Content';
import { useRouter } from 'next/navigation';
import Avatar from 'ui/molecules/Avatar';
import LoggedOut from 'ui/molecules/dropdown/LoggedOut';

const DropDown: FC = (): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Avatar
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Person Import"
          fallback="PI"
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <Content sideOffset={5}>
          {(status === 'authenticated' && <></>) || (
            <LoggedOut router={router} />
          )}
        </Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropDown;
