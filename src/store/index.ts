import createSagaMiddleware from '@redux-saga/core';
import {createStore, applyMiddleware, Middleware} from '@reduxjs/toolkit';
import reducers from './reducers';
import rootSaga from './sagas';

const bindMiddleware = (middleware: Middleware[]) => {
  const middlewares = middleware;

  if (__DEV__) {
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
  }

  return applyMiddleware(...middlewares);
};

function initializedStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = {
    ...createStore(reducers, bindMiddleware([sagaMiddleware])),
    sagaTask: sagaMiddleware.run(rootSaga),
  };

  return store;
}

export default initializedStore();
