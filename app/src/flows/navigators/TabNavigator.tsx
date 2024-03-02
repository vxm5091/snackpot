import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackNavigator } from 'flows/navigators/HomeStackNavigator';
import { ENavigators, TParamListRoot, TParamListTabs } from 'flows/types';

const Tab = createBottomTabNavigator<TParamListTabs>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      id={ENavigators.Tab}
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
        unmountOnBlur: false,
      }}
    >
      <Tab.Screen
        name={'HomeTab'}
        component={HomeStackNavigator}
        options={{
          title: 'Home',
        }}
      />
    </Tab.Navigator>
  );
};
