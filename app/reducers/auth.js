import CONSTANTS from '../constants.js';
const { AUTHENTICATION } = CONSTANTS;

const initState = {
		status: localStorage.hasOwnProperty('token') ? AUTHENTICATION.PERMISSION.GRANTED : AUTHENTICATION.PERMISSION.DENIED,
		isAuthorized: localStorage.hasOwnProperty('token'),
		token: localStorage.getItem('token') || ''
	};
// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth( state = initState, action = {} ) {

	switch (action.type) {
		// login
		case AUTHENTICATION.LOGIN.REQUEST:
			return {
				action: AUTHENTICATION.LOGIN.REQUEST,
				status: 'loading',
				isAuthorized: false
			};
		case AUTHENTICATION.LOGIN.RESPONSE:
			if(action.ok) {

				localStorage.setItem('token', action.token);

				return {
					status: AUTHENTICATION.PERMISSION.GRANTED,
					isAuthorized: true,
					message: '',
					token: action.token
				};
			}
			return {
				status: AUTHENTICATION.PERMISSION.DENIED,
				isAuthorized: false,
				message: action.message
			};

		// logout
		case AUTHENTICATION.LOGOUT:

			localStorage.removeItem('token');

			return {
				status: AUTHENTICATION.PERMISSION.DENIED,
				isAuthorized: false,
				token: '',
			};

		// register
		case AUTHENTICATION.REGISTER.RESPONSE:
			if(action.ok) {
				return {
					status: AUTHENTICATION.PERMISSION.DENIED,
					isAuthorized: false
				}
			}
			return {
				status: AUTHENTICATION.PERMISSION.DENIED,
				isAuthorized: false,
				message: action.message
			};
		case AUTHENTICATION.REGISTER.REQUEST:
			return {
				action: AUTHENTICATION.REGISTER.REQUEST,
				status: 'loading'
			};
		default:
			return state;
	}
}

export default auth;

