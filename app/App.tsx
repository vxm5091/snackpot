import { container } from 'ansi-fragments';
import environment from 'core/relay';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from 'flows/navigators';
import { Dimensions, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RelayEnvironmentProvider } from 'react-relay';
import Constants from 'expo-constants';

const App = () => {
  return (
    <GestureHandlerRootView
      style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}
    >
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <RelayEnvironmentProvider environment={environment}>
        <RootNavigator />
      </RelayEnvironmentProvider>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
