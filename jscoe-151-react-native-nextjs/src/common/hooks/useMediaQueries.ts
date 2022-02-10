import { useMediaQuery as query } from 'react-responsive';

export interface MediaQueriesReturnType {
  isMobile: boolean;
  isDesktop: boolean;
  isLarge: boolean;
}

export const useMediaQueries = (): MediaQueriesReturnType => {
  const isMobile = query({
    maxDeviceWidth: 767
  });

  const isDesktop = query({
    minDeviceWidth: 768
  });

  const isLarge = query({
    minDeviceWidth: 1200
  })
  
  return {
    isMobile,
    isDesktop,
    isLarge
  }
};
