import { configureStore } from '@reduxjs/toolkit';
import rootReducers from '../reducer';

import rootSaga from '../saga';
const createSagaMiddleware = require('redux-saga').default;
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run saga normally
sagaMiddleware.run(rootSaga);

export default store;
