import environment from 'core/relay';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaContext,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { RelayEnvironmentProvider } from 'react-relay';
import Constants from 'expo-constants';


const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <RelayEnvironmentProvider environment={environment}>
      {/*  navigation container*/}
      </RelayEnvironmentProvider>
    </SafeAreaProvider>
  );
}

let AppEntryPoint = App;

// dynamically switch between app and storybook using env variable
if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  AppEntryPoint = require('./.storybook').default;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
