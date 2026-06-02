import { } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Glyph from 'ui/atoms/icons/Glyph';
import GlowButton from 'ui/atoms/buttons/GlowButton';
import { WORLD } from '@/lib/intake/data';

const Root = styled.div`
  padding: 14px 0;
`;

const Title = styled.div`
  font-family: var(--bs-display);
  font-size: 19px;
  margin-top: 16px;
  color: #fff;
`;

const Message = styled.div`
  font-size: 12px;
  color: var(--bs-accent2);
  margin-top: 10px;
  line-height: 1.6;
`;

const Detail = styled.div`
  font-size: 11px;
  color: var(--bs-ink-dim);
  margin-top: 18px;
  line-height: 1.7;
`;

const ButtonWrap = styled.div`
  margin-top: 22px;
`;

interface GrantedScreenProps {
  /** Success message to display */
  message: string;
  /** Optional className for external styling */
  className?: string;
}

/**
 * GrantedScreen molecule — success state display after authentication
 */
const GrantedScreen = ({ message, className }: GrantedScreenProps) => {
  const router = useRouter();

  return (
    <Root className={className}>
      <Glyph type="node" size={30} c="var(--bs-accent2)" />
      <Title>CONNECTION ESTABLISHED</Title>
      <Message>{message}</Message>
      <Detail>
        routing to {WORLD.node}…
        <br />
        loading dossier · syncing empire · arming nerve
      </Detail>
      <ButtonWrap>
        <GlowButton kind="t" wide onClick={() => router.push('/')}>
          ↵ ENTER THE VOID
        </GlowButton>
      </ButtonWrap>
    </Root>
  );
};

export default GrantedScreen;
