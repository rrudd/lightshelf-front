import CONSTANTS from '../constants.js';
const { PERMISSION, AUTHENTICATION } = CONSTANTS;

const initState = {
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
			return {
				type: AUTHENTICATION.WAITING,
				isAuthorized: false
			};
		case AUTHENTICATION.RESPONSE:
			if(action.ok) {

				localStorage.setItem('token', action.token);

				return {
					type: PERMISSION.GRANTED,
					isAuthorized: true,
					message: '',
					token: action.token
				};
			}
			return {
				type: PERMISSION.DENIED,
				isAuthorized: false,
				message: action.message
			};
		default:
			return state;
	}
}

export default auth;

