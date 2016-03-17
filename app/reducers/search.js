import CONSTANTS from '../constants';
const { SEARCH } = CONSTANTS;

const initstate = {
	status: '',
	results: [],
	message: ''
};

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function search(state = initstate, action = {}) {
	switch (action.type) {
		case SEARCH.REQUEST:
			return {
				action: SEARCH.REQUEST,
				status: 'loading',
				query: action.query
			};
		case SEARCH.RESPONSE:
			if(action.ok) {
				return {
					status: SEARCH.SUCCESS,
					results: action.results,
					query: state.query,
					message: ''
				};
			}
			return {
				status: SEARCH.FAILED,
				results: state.results,
				query: state.query,
				message: action.message
			};

		default:
			return state;
	}
}

export default search;
