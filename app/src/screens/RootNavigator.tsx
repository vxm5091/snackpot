import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import { useToast } from 'core/theme/toast';
import GroupScreen from './Group';
import HomeScreen from './Home';
import MemberHistory from './MemberHistory';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator<ReactNavigation.RootParamList>();

export const RootNavigator = () => {
  const { theme } = useTheme();
  const toastConfig = useToast(theme.colors);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{}} initialRouteName={'HomeScreen'}>
          <Stack.Screen
            name={'HomeScreen'}
            component={HomeScreen}
            options={{
              title: 'Home',
            }}
          />
          <Stack.Screen name={'GroupScreen'} component={GroupScreen} options={{
            title: 'Group'
          }} />
          <Stack.Screen name={'GroupMemberHistory'} component={MemberHistory} options={{
            title: 'Member Transaction History'
          }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast topOffset={60} config={toastConfig} />
    </>
  );
};
