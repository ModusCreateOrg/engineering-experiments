import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './screen';
import { SearchScreen } from '../search/screen';

type HomeRoutes = {
  Home: undefined;
  Search: undefined;
};

const Stack = createNativeStackNavigator<HomeRoutes>();

export const HomeNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}