import { } from 'react';
import styled from 'styled-components';
import Tab from 'ui/atoms/buttons/Tab';

const Root = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 26px;
`;

interface AuthTabsProps {
  /** Current active tab id */
  activeTab: string;
  /** Array of [id, label] tuples */
  tabs: ReadonlyArray<readonly [string, string]>;
  /** Callback when tab changes */
  onTabChange: (tabId: string) => void;
  /** Optional className for external styling */
  className?: string;
}

/**
 * AuthTabs molecule — tab switcher for authentication modes
 */
const AuthTabs = ({
  activeTab,
  tabs,
  onTabChange,
  className,
}: AuthTabsProps) => (
  <Root className={className}>
    {tabs.map(([id, label]) => (
      <Tab key={id} active={activeTab === id} onClick={() => onTabChange(id)}>
        {label}
      </Tab>
    ))}
  </Root>
);

export default AuthTabs;
