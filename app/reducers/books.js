import CONSTANTS from '../constants';
const { BOOKS } = CONSTANTS;

const initstate = {
  status: 'nothing',
  books: []
};

function _updateItems(books, newBook) {

  if(typeof(newBook) === 'undefined' || !Array.isArray(books)) return;

  function correctItem(item) {
    return (item._id === newBook._id);
  }
  const idx = books.findIndex(correctItem);
  books[idx] = newBook;
}

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function books(state = initstate, action = {}) {
  switch (action.type) {
    case BOOKS.FILTER:
      return {
        status: BOOKS.FILTER.SUCCESS,
        books: action.books,
        message: ''
      };
    // list
    case BOOKS.LIST.RESPONSE:
      if(action.ok) {
        return {
          status: BOOKS.LIST.SUCCESS,
          books: action.books,
          message: ''
        };
      }
      return {
        status: BOOKS.LIST.FAILED,
        message: action.message || 'Unknown error',
        books: state.books || []
      };

    case BOOKS.LIST.REQUEST:
      return {
        action: BOOKS.LIST.REQUEST,
        status: 'loading'
      };


    // add
    case BOOKS.ADD.RESPONSE:
      if(action.ok) {

        _updateItems(state.books, action.item);

        return {
          status: BOOKS.ADD.SUCCESS,
          books: state.books,
          message: ''
        };
      }

      return {
        status: BOOKS.ADD.FAILED,
        message: action.message || 'Unknown error',
        books: state.books || []
      };
    case BOOKS.ADD.REQUEST:
      return {
        action: BOOKS.ADD.REQUEST,
        status: 'loading',
        books: state.books,
        target: action.book
      };



    // loan borrow
    case BOOKS.BORROW.RESPONSE:
      if(action.ok) {

        _updateItems(state.books, action.item);

        return {
          status: BOOKS.BORROW.SUCCESS,
          books: state.books,
          message: ''
        };
      }

      return {
        status: BOOKS.BORROW.FAILED,
        message: action.message || 'Unknown error',
        books: state.books || []
      };
    case BOOKS.BORROW.REQUEST:
      return {
        action: BOOKS.BORROW.REQUEST,
        status: 'loading',
        books: state.books,
        target: action.book
      };



    // loan return
    case BOOKS.RETURN.RESPONSE:
      if(action.ok) {

        _updateItems(state.books, action.item);

        return {
          status: BOOKS.BORROW.SUCCESS,
          books: state.books,
          message: ''
        };
      }

      return {
        status: BOOKS.BORROW.FAILED,
        message: action.message || 'Unknown error',
        books: state.books || []
      };
    case BOOKS.RETURN.REQUEST:
      return {
        action: BOOKS.RETURN.REQUEST,
        status: 'loading',
        books: state.books,
        target: action.book
      };

    default:
      return state;
  }
}

export default books;
