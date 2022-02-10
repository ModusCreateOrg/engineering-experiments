import 'setimmediate';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { ThemeProvider } from '../src/common/theme';
import { ModalProvider } from '../src/common/hooks/useModal.web';

if (!global.requestAnimationFrame) {
  global.requestAnimationFrame = function (c: any) { return 0 };
}

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <ModalProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <Component {...pageProps} />
        </SafeAreaProvider>
      </ModalProvider>
    </ThemeProvider>
  );
};

export default MyApp;
