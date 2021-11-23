import React from 'react';
import { useTransition, animated } from 'react-spring';
import { Route, Routes as ReactRoutes, useLocation } from 'react-router-dom';

import Start from './pages/Start';
import Pokedex from './pages/Pokedex';
import Test from './pages/Test';

const App: React.FC = () => {
  const location = useLocation();
  const transitions = useTransition(location, {
    keys: (location) => location.pathname,
    from: { opacity: 0, transform: 'translate(100%,0)' },
    enter: { opacity: 1, transform: 'translate(0%,0)' },
    leave: { opacity: 0, transform: 'translate(-50%,0)' },
  });

  return transitions((props, item) => (
    <animated.div style={props}>
      <ReactRoutes location={item}>
        <Route path="/" element={<Start />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/test" element={<Test />} />
      </ReactRoutes>
    </animated.div>
  ));
};

export default App;
