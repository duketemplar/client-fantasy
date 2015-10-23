import React from 'react';
import { compose, createStore } from 'redux';
import { devTools, persistState} from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

export function createStoreWithDevTools(middleware) {
  return compose(middleware, devTools(), persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)))(createStore);
}

export function createDebugPanel(store) {
  return (
    <DebugPanel top right bottom>
      <DevTools store={ store } monitor={ LogMonitor } />
    </DebugPanel>
  );
}
