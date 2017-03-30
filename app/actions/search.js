import CONSTANTS from '../constants';
import go from './router.js';
import errorHandler from './error'
const { SEARCH, BOOKS } = CONSTANTS;
const GOOGLE_BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

function searchSuccess(items) {
  return {
    type: SEARCH.RESPONSE,
    ok: true,
    results: items,
  };
}

function searchError(error) {
  return {
    type: SEARCH.RESPONSE,
    ok: false,
    message: error,
  };
}

function findBookSuccess(books) {
  return {
    type: BOOKS.FIND.RESPONSE,
    ok: true,
    items: books
  }
}
function findBookError(error) {
  return {
    type: BOOKS.FIND.RESPONSE,
    ok: false,
    message: error 
  }
}

function search(query) {
  const config = {
    method: 'GET',
  };
  const searchType = '&printType=books';

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    // dispatch(requestLogin(action.creds));

    dispatch({
      type: SEARCH.REQUEST,
      query,
    });

    return fetch(GOOGLE_BASE_URL + encodeURIComponent(query) + searchType, config)
      .then((resp) => resp.json())
      .then(
      ({ items }) => {
        dispatch(searchSuccess(items));
      },
      (error) => {
        dispatch(searchError(error));
      }
    ).catch(err => console.log('Error: ', err));
  };
}

function findBook(query, token) {
  const headers = new Headers({
    Authorization: `JWT ${token}`,
    'Content-Type': 'application/json',
  });
  const config = {
    method: 'GET',
    headers,
  };

  const url = `${API_URL}books/find?title=${query}`;

  return (dispatch) => {

    dispatch({
      type: BOOKS.FIND.REQUEST,
      query,
    });

    return fetch(url, config)
      .then((resp) => errorHandler(resp, dispatch))
      .then(
      ({ books }) => {
        dispatch(findBookSuccess(books));
      },
      (error) => {
        dispatch(findBookError(error));
      }
      ).catch(err => console.log('Error: ', err));
  };
}

export default {
  search,
  findBook,
};
