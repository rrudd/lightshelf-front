import CONSTANTS from '../constants';
const { AUTHENTICATION } = CONSTANTS;
import go from './router.js';
import errorHandler from './error';

function loginSuccess(token) {
	return {
		type: AUTHENTICATION.LOGIN.RESPONSE,
		ok: true,
		token: token
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
				(resp) => {
					let w = 1;
					dispatch( loginSuccess(resp.token) );
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
		body: `username=${creds.username}&password=${creds.password}`
	};

	return (dispatch)=> {
		return fetch(API_URL + 'auth/register', config)
			.then(response =>
				response.json().then(user => ({ user, response }))
		).then(({ user, response }) => {
				if (!response.ok) {
					// If there was a problem, we want to
					// dispatch the error condition
					dispatch(registerError(user.message));
					return Promise.reject(user);
				}
				// Dispatch the success action
				dispatch(registerSuccess(user.token));
				dispatch(go('library'));
			}).catch(err => console.log('Error: ', err));
	}
}

function registerError(message) {
	return {
		type: AUTHENTICATION.REGISTER.RESPONSE,
		ok: false,
		message
	}
}

function registerSuccess() {
	return {
		type: AUTHENTICATION.REGISTER.RESPONSE,
		ok: true,
		token
	}
}

export default {
	login,
	logout,
	register,
	loginSuccess
}
