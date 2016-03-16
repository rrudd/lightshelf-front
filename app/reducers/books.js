import CONSTANTS from '../constants';
const { BOOKS, LOAN } = CONSTANTS;

const initstate = {
  status: 'nothing'
};

function _updateItems(state, book) {
  function correctItem(item) {
    return (item._id === book._id);
  }
  const booksArray = state.books;
  const idx = booksArray.findIndex(correctItem);
  booksArray[idx] = book;
  // const booksObject = Object.assign({}, state.books, { books: booksArray });
  return Object.assign({}, state, { status: 'done', books: booksArray });
}

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function books(state = initstate, action = {}) {
  switch (action.type) {
    case BOOKS.SEARCH:
    case BOOKS.LIST:
    case LOAN.REQUEST:
    case LOAN.RETURN:
      return {
        status: 'loading',
        books: state.books || [],
        searchResults: state.searchResults || [],
        request: {
          type: action.type
        }
      };
    case BOOKS.ADD:
      return {
        status: 'discreteLoading',
        books: state.books || [],
        searchResults: state.searchResults || [],
        request: {
          type: action.type
        }
      };
    case BOOKS.RESPONSE:
      if(action.ok) {

        let newState = {
          status: 'success',
          request: state.request
        };

        newState.searchResults = action.searchResults || state.searchResults || [];
        newState.books = action.books || state.books || [];

        if(action.book) newState.books.push(action.book);

        return newState;
      }
      return {
        status: 'failed',
        message: action.message,
        books: state.books || [],
        searchResults: state.searchResults || [],
        request: state.request
      };
    case LOAN.RESPONSE:
      if(action.ok) {
        return _updateItems(state, action.item)
      }
      return {
        status: 'failed',
        message: action.message,
        books: state.books || [],
        searchResults: state.searchResults || [],
        request: state.request
      };
    default:
      return state;
  }
}

export default books;
