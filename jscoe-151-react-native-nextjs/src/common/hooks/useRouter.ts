import { useNavigation } from '@react-navigation/native';

export const useRouter = () => {
  const navigation = useNavigation();

  const _navigateMobile = (routeName: string) => {
    const splitted = routeName.split('/');
    if (splitted?.length > 1) {
      navigation.navigate(splitted[0], { screen: splitted[1] })
    } else {
      navigation.navigate(routeName);
    }
  }
 
  const navigate = (routeName: string) => {
    if (!routeName) return;
    _navigateMobile(routeName);
  }

  const goBack = () => navigation.goBack();

  return {
    navigate,
    goBack
  };
};
