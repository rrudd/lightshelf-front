import { combineReducers } from 'redux';
import auth from './auth.js';

// @TODO: validate id_token?
function initState() {
  return {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  };
}

export default combineReducers({
  auth
});
