import CONSTANTS from '../constants';
import go from './router.js';
const { BOOKS } = CONSTANTS;

function borrowSuccess(item) {
  return {
    type: BOOKS.BORROW.RESPONSE,
    ok: true,
    item
  }
}

function borrowError(error) {
  return {
    type: BOOKS.BORROW.RESPONSE,
    ok: false,
    message: error
  }
}

function borrow(book, token) {
  const config = {
      method: 'POST',
      headers: new Headers({'Authorization': 'JWT ' + token, 'Content-Type': 'application/json' })
    },
    resource = 'books',
    action = 'loans';


  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    // dispatch(requestLogin(action.creds));

    dispatch({
      type: BOOKS.BORROW.REQUEST
    });

    let url = API_URL + resource + "/" + book._id + "/" + action;

    return fetch(url, config)
      .then((resp) => {
        return resp.json()
      })
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
    item
  }
}

function returnError(error) {
  return {
    type: BOOKS.RETURN.RESPONSE,
    ok: false,
    message: error
  }
}

function returnBook(book, loan_id, token) {
  const config = {
      method: 'POST',
      headers: new Headers({'Authorization': 'JWT ' + token, 'Content-Type': 'application/json' })
    },
    resource = 'books',
    subResource = 'loans',
    action = 'return';


  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    // dispatch(requestLogin(action.creds));

    dispatch({
      type: BOOKS.RETURN.REQUEST
    });

    return fetch( API_URL + resource
      + '/' + book._id
      + '/' + subResource
      + '/' + loan_id
      + '/' + action, config)
      .then((resp) => {
        return resp.json()
      })
      .then(
      ({ item }) => {
        dispatch(returnSuccess(item));
      },
      (error) => {
        dispatch(returnError(error));
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

    dispatch({
      type: BOOKS.LIST.REQUEST
    });

    return fetch(API_URL + resource, config)
      .then((resp) => {
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
    ).catch((err) => {
          console.log('Error: ', err)
        });
  }
}

function listSuccess(items) {
  return {
    type: BOOKS.LIST.RESPONSE,
    ok: true,
    books: items
  }
}

function listError(error) {
  return {
    type: BOOKS.LIST.RESPONSE,
    ok: false,
    message: error
  }
}




function add(book, token) {

  return (dispatch)=> {

    dispatch({
      type: BOOKS.ADD.REQUEST
    });

    const request = new Request(API_URL + 'books', {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: 'JWT ' + token,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(book)
    });

    return fetch(request).then((response) => {
              return response.json();
            }).then(
              ({book}) => {
                dispatch(addSuccess(book));
              },
              (error)=> {
                dispatch(addError(error));
              }
          );
    }
}

function addSuccess(book) {
  return {
    type: BOOKS.ADD.RESPONSE,
    ok: true,
    book: book
  }
}

function addError(error) {
  return {
    type: BOOKS.ADD.RESPONSE,
    ok: false,
    message: error
  }
}

export default {
  borrow,
  returnBook,
  list,
  add
}
