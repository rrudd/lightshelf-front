import CONSTANTS from '../constants';
const { AUTHENTICATION } = CONSTANTS;
const BASE_URL = 'http://localhost:3333/api/';
import go from './router.js';

function requestLogin(creds) {
	return {
		type: AUTHENTICATION.REQUEST,
		isRequest: true,
		isFetching: true,
		isAuthenticated: false,
		creds,
		resource: 'auth',
		method: 'POST'
	};
}

function loginSuccess(token) {
	return {
		type: AUTHENTICATION.RESPONSE,
		ok: true,
		isRequest: false,
		isFetching: false,
		isAuthenticated: true,
		token: token
	};
}

function loginRedirect() {
	return
}

function loginError(message) {
	return {
		type: AUTHENTICATION.RESPONSE,
		ok: false,
		isRequest: false,
		isFetching: false,
		isAuthenticated: false,
		message
	};
}

function authenticate(action) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${action.creds.username}&password=${action.creds.password}`
  };

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    // dispatch(requestLogin(action.creds));

    return fetch(BASE_URL + 'auth/login', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) => {
              if (!response.ok) {
                // If there was a problem, we want to
                // dispatch the error condition
                dispatch(loginError(user.message));
                return Promise.reject(user);
              }
              // Dispatch the success action
              dispatch(loginSuccess(user.token));
			  dispatch(go('library'));
            }).catch(err => console.log('Error: ', err));
  };
}

export default {
	requestLogin,
	loginSuccess,
	loginError,
	authenticate
}
