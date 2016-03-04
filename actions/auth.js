import CONSTANTS from '../constants';
const { AUTHENTICATE, AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILURE } = CONSTANTS;
const BASE_URL = 'http://localhost:3333/api/';

function requestLogin(creds) {
	return {
		type: AUTHENTICATE,
		isRequest: true,
		isFetching: true,
		isAuthenticated: false,
		creds,
		resource: 'auth',
		method: 'POST'
	};
}

function loginSuccess(user) {
	return {
		type: AUTHENTICATION_SUCCESS,
		isRequest: false,
		isFetching: false,
		isAuthenticated: true,
		token: user.token
	};
}

function loginError(message) {
	return {
		type: AUTHENTICATION_FAILURE,
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
    body: `{username=${action.creds.username}&password=${action.creds.password}`
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
              // If login was successful, set the token in local storage
              localStorage.setItem('id_token', user.id_token);
              // Dispatch the success action
              dispatch(loginSuccess(user));
            }).catch(err => console.log('Error: ', err));
  };
}

export default {
	requestLogin,
	loginSuccess,
	loginError,
	authenticate
}

