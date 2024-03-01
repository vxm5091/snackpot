import environment from 'core/relay';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaContext,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { RelayEnvironmentProvider } from 'react-relay';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <RelayEnvironmentProvider environment={environment}>
      {/*  navigation container*/}
      </RelayEnvironmentProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
