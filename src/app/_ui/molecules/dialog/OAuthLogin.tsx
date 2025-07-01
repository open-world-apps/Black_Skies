'use client';

import React, { FC, ReactElement, useEffect, useState } from 'react';

import { BuiltInProviderType } from 'next-auth/providers/index';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from 'next-auth/react';
import ProviderBtn from 'ui/atoms/generic/dialog/ProviderBtn';
import FlexContainer from 'ui/atoms/generic/FlexContainer';

import { closeDlg } from '@/lib/state/reducers/menus/dialogSlice';
import ProviderLogo from '../ProviderLogo';
import Google from '@@/public/Google/web_neutral_rd_na.svg';
import Discord from '@@/public/Discord/Discord-Symbol-Blurple.svg';
import { useAppDispatch } from '@/lib/state/app/hooks';

const OAuthLogin: FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const logos = new Map();
  logos.set('Discord', Discord);
  logos.set('Google', Google);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <FlexContainer
      background="white"
      gap="15px"
      width="fit-content"
      justifyContent="center"
      alignItems="center"
    >
      {providers &&
        Object.values(providers).map((provider, idx) =>
          provider.id !== 'credentials' ? (
            <ProviderBtn
              onClick={() => {
                signIn(provider.id);
                dispatch(closeDlg());
              }}
              key={idx}
            >
              <ProviderLogo
                svg={logos.get(provider.name)}
                name={provider.name}
              />
            </ProviderBtn>
          ) : null
        )}
      {!providers && <p>Loading providers...</p>}
    </FlexContainer>
  );
};

export default OAuthLogin;
