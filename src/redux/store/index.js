import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducers from '../reducer';
import rootSaga from '../saga';
const saga = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducers,
  middleware: () => [saga],
});
saga.run(rootSaga);
export default store;
