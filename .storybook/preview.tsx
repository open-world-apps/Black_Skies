import type { Preview } from '@storybook/react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing/react';
import { makeStore } from '../src/lib/state/app/store';
import { GlobalFonts } from '../src/lib/styled/GlobalFonts'; // named export
import GlobalStyles from '../src/lib/styled/GlobalStyles';   // default export

const withProviders = (Story: React.ComponentType) => {
  const store = makeStore();
  return (
    <>
      <GlobalFonts />
      <GlobalStyles />
      <ReduxProvider store={store}>
        <MockedProvider mocks={[]}>
          <Story />
        </MockedProvider>
      </ReduxProvider>
    </>
  );
};

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    backgrounds: {
      default: 'bs-dark',
      options: {
        'bs-dark': { name: 'bs-dark', value: '#06080d' },
        light: { name: 'light', value: '#ffffff' },
      },
    },
    layout: 'centered',
  },
};

export default preview;
