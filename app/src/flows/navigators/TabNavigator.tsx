import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { HomeStackNavigator } from 'flows/navigators/HomeStackNavigator';
import { ENavigators, TParamListRoot, TParamListTabs } from 'flows/types';
import { useCallback, useMemo } from 'react';

const Tab = createBottomTabNavigator<TParamListTabs>();

interface IRenderIconProps {
  focused: boolean;
  color: string;
  size: number;
  routeName: keyof TParamListTabs;
}

export const TabNavigator = () => {
  // ------------------------------------------ Render ------------------------------------------
  const renderIcon = useCallback(
    ({ routeName, focused, color }: IRenderIconProps) => {
      let icon;
      switch (routeName) {
        case 'HomeTab':
          icon = 'home';
      }

      return <Icon name={icon} size={24} color={color} />;
    },
    [],
  );

  return (
    <Tab.Navigator
      id={ENavigators.Tab}
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        headerShown: false,
        unmountOnBlur: false,
        tabBarIcon: ({ focused, color, size }) =>
          renderIcon({ focused, color, size, routeName: route.name }),
      })}
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
