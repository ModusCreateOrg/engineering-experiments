import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeNavigator } from '../../screens/home/navigation';
import { ModalNavigator } from './modals';

type MainStackRoutes = {
  Main: undefined;
  Modals: undefined;
};

const MainStack = createNativeStackNavigator<MainStackRoutes>();

const MainNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false, presentation: 'modal' }}>
      <MainStack.Screen name="Main" component={HomeNavigator} />
      <MainStack.Screen name="Modals" component={ModalNavigator} options={{ presentation: 'transparentModal' }} />
    </MainStack.Navigator>
  );
};

export const Navigator = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};
