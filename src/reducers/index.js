import { combineReducers } from 'redux';
import user from './user';
import blog from './blog';

const rootReducer = combineReducers({
  user,
  blog,
});

export default rootReducer;