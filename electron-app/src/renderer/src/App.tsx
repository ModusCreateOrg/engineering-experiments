import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Loading from 'component/loading';
import ErrorBoundary from 'component/error-boundary';
import APP from './route-link';

const Header = lazy(() => import('component/app/header'));
const Footer = lazy(() => import('component/app/footer'));
const Main = lazy(() => import('component/app/main'));

const App = () => (
  <HashRouter>
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <Header title="Electron App" />
        <Routes>
          <Route path={APP.MAIN} element={<Main />} />
        </Routes>
        <Footer />
      </ErrorBoundary>
    </Suspense>
  </HashRouter>
);

export default App;
