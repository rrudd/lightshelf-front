import CONSTANTS from '../constants';
const { SEARCH } = CONSTANTS;

function initState() {
	return {
		isFetching: false,
		isAuthenticated: localStorage.getItem('id_token') ? true : false
	};
}
// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function search( state, action ) {

	if (typeof state === 'undefined') state = initState();

	switch (action.type) {
		case SEARCH.BOOK:
		case SEARCH.BOOKS:
			return Object.assign({}, state, {
				status: 'loading',
				items: []
			});
		case SEARCH.RESPONSE:
			if(action.ok) {
				return Object.assign({}, state, {
					status: 'done',
					items: action.items
				});
			}
			return Object.assign({}, state, {
				status: 'done',
				message: action.message
			});
		case SEARCH.LOADING:
			return  {
				status: 'loading'
			};
		default:
			return state;
	}
}

export default search;

