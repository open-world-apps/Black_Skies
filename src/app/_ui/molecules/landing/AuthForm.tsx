import { FC, FormEvent } from 'react';
import styled from 'styled-components';
import Field from 'ui/atoms/forms/Field';
import FactionSelect from 'ui/atoms/forms/FactionSelect';
import StatusMessage from 'ui/atoms/text/StatusMessage';
import FootNote from 'ui/atoms/text/FootNote';
import GlowButton from 'ui/atoms/buttons/GlowButton';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonWrap = styled.div`
  margin-top: 4px;
`;

type Mode = 'login' | 'register';
type Phase = 'idle' | 'working' | 'denied' | 'granted';

interface AuthFormProps {
  /** Current mode (login or register) */
  mode: Mode;
  /** Current phase */
  phase: Phase;
  /** Handle/username value */
  handle: string;
  /** Password/key value */
  password: string;
  /** Selected faction */
  faction: string;
  /** Available factions */
  factions: string[];
  /** Status message */
  message: string;
  /** Handle change handler */
  onHandleChange: (value: string) => void;
  /** Password change handler */
  onPasswordChange: (value: string) => void;
  /** Faction change handler */
  onFactionChange: (faction: string) => void;
  /** Form submit handler */
  onSubmit: (e: FormEvent) => void;
  /** Optional className for external styling */
  className?: string;
}

/**
 * AuthForm molecule — authentication form for login/register
 */
const AuthForm: FC<AuthFormProps> = ({
  mode,
  phase,
  handle,
  password,
  faction,
  factions,
  message,
  onHandleChange,
  onPasswordChange,
  onFactionChange,
  onSubmit,
  className,
}) => (
  <Form onSubmit={onSubmit} className={className}>
    <Field
      label="HANDLE"
      value={handle}
      onChange={onHandleChange}
      placeholder="enter callsign"
    />

    {mode === 'login' && (
      <Field
        label="ACCESS KEY"
        value={password}
        onChange={onPasswordChange}
        type="password"
        placeholder="••••••••"
      />
    )}

    {mode === 'register' && (
      <FactionSelect
        value={faction}
        factions={factions}
        onChange={onFactionChange}
      />
    )}

    {message && phase === 'denied' && (
      <StatusMessage type="error">{message}</StatusMessage>
    )}

    {phase === 'working' && (
      <StatusMessage type="working" showCursor>
        {message}
      </StatusMessage>
    )}

    <ButtonWrap>
      <GlowButton type="submit" wide disabled={phase === 'working'}>
        {phase === 'working'
          ? 'STAND BY…'
          : mode === 'login'
            ? '↵ ENTER THE VOID'
            : '↵ REQUEST ACCESS'}
      </GlowButton>
    </ButtonWrap>

    <FootNote>
      {mode === 'login'
        ? 'no account survives the dark unaided.'
        : 'death is permanent for the unprepared.'}
    </FootNote>
  </Form>
);

export default AuthForm;
