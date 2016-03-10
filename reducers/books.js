import CONSTANTS from '../constants';
const { BOOKS, LOAN } = CONSTANTS;

const initstate = {
		status: 'nothing'
	};

function _updateItems(state, book) {

}
// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function books( state = initstate, action = {} ) {

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
			return {
				status: 'loading'
			};
		case LOAN.RESPONSE:
			if(action.ok) {
				return _updateItems(state, action.item)
			}
			return {
				status: 'done',
				message: action.message
			};
		case BOOKS.LOADING:
		case LOAN.LOADING:
			return  {
				status: 'loading'
			};
		default:
			return state;
	}
}

export default books;
