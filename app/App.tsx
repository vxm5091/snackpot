import { ThemeProvider } from '@rneui/themed';
import { container } from 'ansi-fragments';
import environment from 'core/relay';
import theme from 'core/theme/theme';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './src/screens';
import { Dimensions, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RelayEnvironmentProvider } from 'react-relay';
import Constants from 'expo-constants';

const App = () => {
  return (
    <GestureHandlerRootView
      style={{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      }}
    >
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <ThemeProvider theme={theme}>
          <RelayEnvironmentProvider environment={environment}>
            <RootNavigator />
          </RelayEnvironmentProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

let AppEntryPoint = App;

// dynamically switch between app and storybook using env variable
if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  AppEntryPoint = require('./.storybook').default;
}

export default AppEntryPoint;
