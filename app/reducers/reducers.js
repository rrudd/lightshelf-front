import { combineReducers } from 'redux';
import auth from './auth';
import books from './books';
import search from './search';
import router from './router';

export default combineReducers({
  auth,
  books,
  search,
  router
});
