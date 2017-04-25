import CONSTANTS from '../constants';
import go from './router';
const { BOOKS } = CONSTANTS;
import errorHandler from './error'

function borrowSuccess(item) {
  return {
    type: BOOKS.BORROW.RESPONSE,
    ok: true,
    item,
  };
}

function borrowError(error) {
  return {
    type: BOOKS.BORROW.RESPONSE,
    ok: false,
    message: error,
  };
}

function borrow(book, token) {
  const headers = new Headers({
    Authorization: `JWT ${token}`,
    'Content-Type': 'application/json',
  });
  const config = { method: 'POST', headers };
  const resource = 'books';
  const action = 'loans';


  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    // dispatch(requestLogin(action.creds));

    dispatch({ type: BOOKS.BORROW.REQUEST, book: book });

    const url = `${API_URL}${resource}/${book.id}/${action}`;

    return fetch(url, config)
      .then((resp) => errorHandler(resp, dispatch))
      .then(
      ({ book }) => {
        dispatch(borrowSuccess(book));
      },
      (error) => {
        dispatch(borrowError(error));
        dispatch(go(''));
      }
    ).catch(err => console.log('Error: ', err));
  };
}


function returnSuccess(item) {
  return {
    type: BOOKS.RETURN.RESPONSE,
    ok: true,
    item,
  };
}

function returnError(error) {
  return {
    type: BOOKS.RETURN.RESPONSE,
    ok: false,
    message: error,
  };
}

function returnBook(book, loanID, token) {
  const headers = new Headers({
    Authorization: `JWT ${token}`,
    'Content-Type': 'application/json',
  });
  const config = {
    method: 'POST',
    headers,
  };
  const resource = 'books';
  const subResource = 'loans';
  const action = 'return';

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    // dispatch(requestLogin(action.creds));

    dispatch({ type: BOOKS.RETURN.REQUEST, book: book });

    const url = `${API_URL}${resource}/${book._id}/${subResource}/${loanID}/${action}`;

    return fetch(url, config)
      .then((resp) => errorHandler(resp, dispatch))
      .then(
      ({ book }) => {
        dispatch(returnSuccess(book));
      },
      (error) => {
        dispatch(returnError(error));
      }
    ).catch(err => console.log('Error: ', err));
  };
}

function listSuccess(items) {
  return {
    type: BOOKS.LIST.RESPONSE,
    ok: true,
    books: items,
  };
}

function listError(error) {
  return {
    type: BOOKS.LIST.RESPONSE,
    ok: false,
    message: error,
  };
}

function list(token) {
  const headers = new Headers({
    Authorization: `JWT ${token}`,
    'Content-Type': 'application/json',
  });
  const config = {
    method: 'GET',
    headers,
  };
  const resource = 'books';

  return (dispatch) => {
    dispatch({ type: BOOKS.LIST.REQUEST });

    const url = `${API_URL}${resource}`;
    return fetch(url, config)
      .then((resp) => errorHandler(resp, dispatch))
      .then(
      (items) => {
        dispatch(listSuccess(items));
      },
      (error) => {
        dispatch(listError(error));
      }
    ).catch((err) => console.log('Error: ', err));
  };
}

function addSuccess(books) {
  return {
    type: BOOKS.ADD.RESPONSE,
    ok: true,
    books,
  };
}

function addError(error) {
  return {
    type: BOOKS.ADD.RESPONSE,
    ok: false,
    message: error,
  };
}

function add(book, token, numberOfCopies) {
  return (dispatch) => {
    dispatch({ type: BOOKS.ADD.REQUEST, book: book });

    const headers = new Headers({
      Accept: 'application/json',
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    });
    book.numberOfCopies = numberOfCopies;
    const config = {
      method: 'POST',
      headers,
      body: JSON.stringify(book),
    };
    const url = `${API_URL}books`;

    return fetch(url, config)
      .then((resp) => errorHandler(resp, dispatch))
      .then(
      ({ books }) => {
        dispatch(addSuccess(books));
      },
      (error) => {
        dispatch(addError(error));
      });
  };
}

function filter(books) {
  return {
    type: BOOKS.FILTER,
    ok: true,
    books: books,
  };
}


export default {
  borrow,
  returnBook,
  list,
  filter,
  add,
};
