import { combineReducers } from 'redux';
import auth from './auth';
import books from './books';
import router from './router';

export default combineReducers({
  auth,
  books,
  router
});
