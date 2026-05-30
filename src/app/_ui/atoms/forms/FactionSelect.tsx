import { FC } from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Head = styled.span`
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--bs-ink-dim);
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--bs-line);
  color: var(--bs-ink);
  font-family: var(--bs-mono);
  font-size: 13px;
  padding: 10px;
  outline: none;

  option {
    background: #0a0c12;
  }
`;

interface FactionSelectProps {
  /** Current selected faction */
  value: string;
  /** Array of available factions */
  factions: string[];
  /** Change handler */
  onChange: (faction: string) => void;
  /** Label text */
  label?: string;
  /** Optional className for external styling */
  className?: string;
}

/**
 * FactionSelect atom — dropdown for selecting starting faction/allegiance
 */
const FactionSelect: FC<FactionSelectProps> = ({
  value,
  factions,
  onChange,
  label = 'STARTING ALLEGIANCE',
  className,
}) => (
  <Label className={className}>
    <Head>{label}</Head>
    <Select value={value} onChange={e => onChange(e.target.value)}>
      {factions.map(f => (
        <option key={f}>{f}</option>
      ))}
    </Select>
  </Label>
);

export default FactionSelect;
