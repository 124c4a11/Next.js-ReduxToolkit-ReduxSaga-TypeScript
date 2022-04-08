import { configureStore, Store } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';

import { rootReducer, rootSaga } from './reducers';


interface SagaStore extends Store {
  sagaTask?: Task;
}


const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  });

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}


export type RootReducer = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];


export const wrapper = createWrapper<SagaStore>(makeStore, { debug: true });
