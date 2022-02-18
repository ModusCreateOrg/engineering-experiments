// Use next.js page for the mobile app
import '@expo/match-media'
import 'react-native-gesture-handler';

import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { ThemeProvider } from './src/common/theme';
import { Navigator } from './src/common/navigation';

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <BottomSheetModalProvider>
          <Navigator />
        </BottomSheetModalProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
