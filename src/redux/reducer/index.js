import {combineReducers} from '@reduxjs/toolkit';
import auth from './auth';
import home from './home';
export default combineReducers({
  auth: auth,
  home: home,
});
