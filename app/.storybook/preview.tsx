import type { Preview } from '@storybook/react';
import environment from 'core/relay';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RelayEnvironmentProvider } from 'react-relay';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <RelayEnvironmentProvider environment={environment}>
          <Story />
        </RelayEnvironmentProvider>
      </SafeAreaProvider>
    ),
  ]
};

export default preview;
