import CONSTANTS from '../constants';
import go from './router.js';
const { BOOKS, LOAN } = CONSTANTS;
const GOOGLE_BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

function searchSuccess(items) {
  return {
    type: BOOKS.RESPONSE,
    ok: true,
    searchResults: items
  }
}

function searchError(error) {
  return {
    type: BOOKS.RESPONSE,
    ok: false,
    message: error
  }
}

function searching() {
  return {
    type: BOOKS.LOADING
  }
}

function searchGoogle(query, token) {
  const config = {
      method: 'GET'
    },
    searchType = '&printType=books';

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    // dispatch(requestLogin(action.creds));

    dispatch(searching());

    return fetch(GOOGLE_BASE_URL + encodeURIComponent(query) + searchType, config)
      .then((resp) => {
        return resp.json()
      })
      .then(
        ({items}) => {
          dispatch(searchSuccess(items));
        },
        (error) => {
          dispatch(searchError(error));
        }
      ).catch(err => console.log('Error: ', err));
  };
}

function loanSuccess(item) {
  return {
    type: LOAN.RESPONSE,
    ok: true,
    item
  }
}

function loanError(error) {
  return {
    type: LOAN.RESPONSE,
    ok: false,
    message: error
  }
}

function loaning() {
  return {
    type: LOAN.LOADING
  }
}

function loan(book, token) {
  const config = {
      method: 'POST',
      headers: new Headers({'Authorization': 'JWT ' + token, 'Content-Type': 'application/json' })
    },
    resource = 'books',
    action = 'loans';


  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    // dispatch(requestLogin(action.creds));

    dispatch(loaning());

    let url = API_URL + resource + "/" + book._id + "/" + action;

    return fetch(url, config)
      .then((resp) => {
        return resp.json()
      })
      .then(
      ({ book }) => {
        dispatch(loanSuccess(book));
        dispatch(go('library'));
      },
      (error) => {
        dispatch(loanError(error));
        dispatch(go(''));
      }
    ).catch(err => console.log('Error: ', err));
  };
}

function returnBook(book, loan_id, token) {
  const config = {
      method: 'POST',
      headers: new Headers({'Authorization': 'JWT ' + token, 'Content-Type': 'application/json' })
    },
    resource_1 = 'books',
    resource_2 = 'loans',
    action = 'return';


  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    // dispatch(requestLogin(action.creds));

    dispatch(loaning());

    return fetch(API_URL + resource_1
      + '/' + book._id
      + '/' + resource_2
      + '/' + loan_id
      + '/' + action, config)
      .then((resp) => {
        return resp.json()
      })
      .then(
      ({ item }) => {
        dispatch(loanSuccess(book));
				dispatch(go('library'));
      },
      (error) => {
        dispatch(loanError(error));
      }
    ).catch(err => console.log('Error: ', err));
  };
}

function list(token) {

  const config = {
      method: 'GET',
      headers: new Headers({'Authorization': 'JWT ' + token, 'Content-Type': 'application/json' })
    },
    resource = 'books';

  return (dispatch) => {
    return fetch(API_URL + resource, config)
      .then((resp) => {
          console.log('hek');
        return resp.json();
      })
      .then(
      (items) => {
        dispatch(listSuccess(items));
      },
      (error) => {
        dispatch(listError(error));
        dispatch(go(''));
      }
    ).catch(err => console.log('Error: ', err));
  }
}

function listSuccess(items) {
  return {
    type: BOOKS.RESPONSE,
    ok: true,
    books: items
  }
}

function listError(error) {
  return {
    type: BOOKS.RESPONSE,
    ok: false,
    message: error
  }
}

export default {
  searchGoogle,
  loan,
  returnBook,
  list
}
