import {configureStore} from '@reduxjs/toolkit';

import rootReducers from '../reducer';
import rootSaga from '../saga';
const createSagaMiddleware=require('redux-saga').default
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

let sagaTask = sagaMiddleware.run(rootSaga);

// 🔥 Hot reload sagas during development
if (module.hot) {
  module.hot.accept('../saga', () => {
    const getNewSagas = require('../saga').default;
    sagaTask.cancel(); // cancel current saga
    sagaTask.toPromise().then(() => {
      sagaTask = sagaMiddleware.run(getNewSagas);
    });
  });
}

export default store;
