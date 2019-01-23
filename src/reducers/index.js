import { combineReducers } from 'redux';
import app from './app';
import user from './user';
import blog from './blog';

const rootReducer = combineReducers({
  app,
  user,
  blog,
});

export default rootReducer;