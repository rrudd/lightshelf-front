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
    case BOOKS.FIND:
    case BOOKS.SEARCH:
    case BOOKS.LIST:
      return {
        status: 'loading',
        books: []
      };
    case BOOKS.RESPONSE:
      if(action.ok) {

        let newState = {
          status: 'done'
        };

        newState.searchResults = action.searchResults || state.searchResults || [];
        newState.books = action.books || state.books || [];

        return newState;
      }
      return {
        status: 'done',
        message: action.message
      };
    case LOAN.REQUEST:
      return Object.assign({}, state, { status: 'loading' });
    case LOAN.RESPONSE:
      if(action.ok) {
        return _updateItems(state, action.item)
      }
      return Object.assign({}, state, {
        status: 'done',
        message: action.message
      });
    case BOOKS.LOADING:
    case LOAN.LOADING:
      return Object.assign({}, state, { status: 'loading' });
    default:
      return state;
  }
}

export default books;
