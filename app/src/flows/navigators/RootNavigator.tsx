import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from 'flows/navigators/TabNavigator';
import { HomeScreenRoute } from 'flows/screens/Home';
import { ENavigators } from 'flows/types';

const Stack = createStackNavigator<ReactNavigation.RootParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator id={ENavigators.Home}>
      <Stack.Screen
        name={'Tabs'}
        component={TabNavigator}
        options={{
          title: 'Home',
        }}
      />
    </Stack.Navigator>
      </NavigationContainer>
  );
};
