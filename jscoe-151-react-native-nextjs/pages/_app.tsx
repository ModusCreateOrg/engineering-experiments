import 'setimmediate';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { ThemeProvider } from '../src/common/theme';
import { ModalProvider } from '../src/common/hooks/useModal.web';

// https://github.com/expo/expo/issues/7996
if (!global.setImmediate) {
  global.setImmediate = setTimeout as any;
}

if (!global?.requestAnimationFrame) {
  // global.requestAnimationFrame = function (c: any) { return 0 };
  global.requestAnimationFrame = function requestAnimationFrame(f){
    global.setImmediate(() => f(Date.now()))
  } as any;
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
