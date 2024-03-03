import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from 'flows/navigators/TabNavigator';
import { GroupScreen } from 'flows/screens/Group/GroupScreen';
import { GroupScreenRoute } from 'flows/screens/Group/GroupScreenRoute';
import { HomeScreenRoute } from 'flows/screens/Home';
import { ENavigators } from 'flows/types';

const Stack = createStackNavigator<ReactNavigation.RootParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator id={ENavigators.Root} screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen
        name={'Tabs'}
        component={TabNavigator}
      />
      <Stack.Screen
        name={'GroupScreen'}
        component={GroupScreenRoute}
      />
    </Stack.Navigator>
      </NavigationContainer>
  );
};
