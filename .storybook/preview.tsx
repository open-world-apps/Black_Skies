import type { Preview } from '@storybook/react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing/react';
import { makeStore } from '../src/lib/state/app/store';
import { GlobalFonts } from '../src/lib/styled/GlobalFonts'; // named export
import GlobalStyles from '../src/lib/styled/GlobalStyles';   // default export

// Single store instance shared across stories — sufficient for visual-only stories.
const store = makeStore();

const withProviders = (Story: React.ComponentType) => (
  <ReduxProvider store={store}>
    <MockedProvider mocks={[]} addTypename={false}>
      <GlobalFonts />
      <GlobalStyles />
      <Story />
    </MockedProvider>
  </ReduxProvider>
);

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    backgrounds: {
      values: [
        { name: 'bs-dark', value: '#06080d' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    layout: 'centered',
  },
  initialGlobals: {
    backgrounds: { value: '#06080d' },
  },
};

export default preview;
