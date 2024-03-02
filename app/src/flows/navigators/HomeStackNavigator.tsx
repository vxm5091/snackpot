import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreenRoute } from 'flows/screens/Home';
import { HomeScreen } from 'flows/screens/Home/HomeScreen';
import { ENavigators, TParamListHome } from 'flows/types';

const Stack = createStackNavigator<TParamListHome>()

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator id={ENavigators.Home}>
      <Stack.Screen
        name={'HomeScreen'}
        component={HomeScreenRoute}
        options={{
          title: 'Home'
        }}
      />
    </Stack.Navigator>
  )
}