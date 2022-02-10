import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { PostPhoto } from '../../screens/modals/PostPhoto';

type ModalStackRoutes = {
  PostPhoto: undefined;
};

const Stack = createNativeStackNavigator<ModalStackRoutes>();

export const ModalNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true, ...TransitionPresets.ModalSlideFromBottomIOS, }}>
      <Stack.Screen name="PostPhoto" component={PostPhoto} options={{ contentStyle: { backgroundColor: 'rgba(0,0,0,0)' } }} />
    </Stack.Navigator>
  );
};
