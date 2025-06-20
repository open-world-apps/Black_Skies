'use client';

import React, { FC, ReactElement } from 'react';
import { useSession } from 'next-auth/react';
import { DropdownMenu } from 'radix-ui';
import Content from 'ui/atoms/generic/dropdown/Content';
import Avatar from 'ui/molecules/Avatar';
import LoggedOut from 'ui/organisms/dropdown/LoggedOut';
import { useAppSelector, useAppDispatch } from '@/lib/state/app/hooks';
import { gateKeeper, close } from '@/lib/state/reducers/menus/menuSlice';

const DropDown: FC= (): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const isOpen = useAppSelector(state => state.menu.open);
  const dispatch = useAppDispatch();

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={(open: boolean) => dispatch(gateKeeper(open))}>
      <DropdownMenu.Trigger asChild>
        <Avatar
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Person Import"
          fallback="PI"
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <Content sideOffset={5}>
          {(status === 'authenticated' && <></>) || <LoggedOut closeMenu={close} />}
        </Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropDown;
