import CONSTANTS from '../constants.js';
const { PERMISSION, AUTHENTICATION } = CONSTANTS;

const initState = {
		isFetching: false,
		isAuthorized: localStorage.getItem('token') ? true : false,
		message: '',
		token: localStorage.getItem('token') || ''
	};
// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth( state = initState, action = {} ) {

	switch (action.type) {
		case AUTHENTICATION.REQUEST:
			return Object.assign({}, state, {
				type: AUTHENTICATION.WAITING,
				isFetching: true
			});
		case AUTHENTICATION.RESPONSE:
			if(action.ok) {

				localStorage.setItem('token', action.token);

				return Object.assign({}, state, {
					type: PERMISSION.GRANTED,
					isFetching: false,
					message: '',
					token: action.token
				});
			}
			return Object.assign({}, state, {
				type: PERMISSION.DENIED,
				isFetching: false,
				message: action.message
			});
		default:
			return state;
	}
}

export default auth;

