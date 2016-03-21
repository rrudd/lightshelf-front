import CONSTANTS from '../constants';
const { AUTHENTICATION } = CONSTANTS;
import go from './router.js';
import errorHandler from './error';

function loginSuccess(user, token) {
	return {
		type: AUTHENTICATION.LOGIN.RESPONSE,
		ok: true,
		token: token,
		user
	};
}

function loginError(err) {
	return {
		type: AUTHENTICATION.LOGIN.RESPONSE,
		ok: false,
		message: err.message
	};
}

function login(creds) {
	const config = {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: `username=${creds.username}&password=${creds.password}`
	};

	return (dispatch) => {
		// We dispatch requestLogin to kickoff the call to the API
		// dispatch(requestLogin(action.creds));

		return fetch(API_URL + 'auth/login', config)
			.then((response) => {
				return errorHandler(response, dispatch)
			}).then(
				({token, user}) => {
					let w = 1;
					dispatch( loginSuccess(user, token) );
					dispatch( go('library') );
				},
				(error)=> {
					console.log('Error: ', error.message);
					dispatch( loginError(error) )
				}
			);
	};
}


function logout() {

	return (dispatch)=> {
		dispatch({
			type: AUTHENTICATION.LOGOUT
		});
		dispatch(go(''))
	}

}



function register(creds) {

	const config = {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: `username=${creds.username}&password=${creds.password}&fullname=${creds.fullname}`
	};

	return (dispatch)=> {
		return fetch(API_URL + 'auth/register', config)
			.then((response)=> {
				return errorHandler(response, dispatch)
			}
			).then(
				({ user, message }) => {
					// Dispatch the success action
					dispatch(registerSuccess());
					dispatch(go('login'));
				},
				(err)=> {
					// If there was a problem, we want to
					// dispatch the error condition
					dispatch(registerError(err.message));
					}
			).catch(err => console.log('Error: ', err));
	}
}

function registerError(message) {
	return {
		type: AUTHENTICATION.REGISTER.RESPONSE,
		ok: false,
		message
	}
}

function registerSuccess(user, message) {
	return {
		type: AUTHENTICATION.REGISTER.RESPONSE,
		ok: true,
		user,
		message,
	}
}

export default {
	login,
	logout,
	register,
	loginSuccess
}
