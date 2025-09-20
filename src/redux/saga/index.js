import {all} from 'redux-saga/effects';
import authSaga from './auth';
import homeSaga from './home';
export default function* rootSaga() {
  yield all([authSaga(), homeSaga()]);
}
