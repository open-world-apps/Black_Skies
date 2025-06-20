import React, { FC, ReactElement } from 'react';
import { Dialog as D } from 'radix-ui';
import Overlay from 'ui/atoms/generic/dialog/Overlay';
import Content from 'ui/primitives/dialog/Content';
import Title from 'ui/atoms/generic/dialog/Title';
import Description from 'ui/atoms/generic/dialog/Description';
import FieldSet from 'ui/molecules/dialog/FieldSet';
import FlexContainer from 'ui/primitives/FlexContainer';
import Button from 'ui/atoms/generic/dialog/Button';

interface DialogProps {
  child: React.ReactElement;
}

const Dialog: FC<DialogProps> = ({ child }): ReactElement => {
  return (
    <D.Root>
      <D.Trigger>{child}</D.Trigger>
      <D.Portal>
        <Overlay />
        <Content>
          <Title>Login</Title>
          <Description>Login to your account here.</Description>
          <FieldSet label="Username" />
          <FieldSet label="Password" />
          <FlexContainer marginTop={25} justifyContent="flex-end">
            <D.Close asChild>
              <Button className="green">Login</Button>
            </D.Close>
          </FlexContainer>
        </Content>
      </D.Portal>
    </D.Root>
  );
};

export default Dialog;
