import { useRouter as nextRouter } from 'next/router'
// import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';

export const useRouter = () => {
  const isWeb = Platform.OS === 'web';
  const router = nextRouter();

  const _navigateWeb = (routeName: string) => {
    router.push('/' + routeName.toLocaleLowerCase());
  }
 
  const navigate = (routeName: string) => {
    if (!routeName) return;
    isWeb ? _navigateWeb(routeName) : undefined;
  }

  const goBack = () => router.back();

  return {
    navigate,
    goBack
  };
};
