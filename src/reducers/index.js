import {combineReducers} from 'redux';

import users from './users';

export const reducers = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
};

const appReducer = combineReducers({
  users,
});
