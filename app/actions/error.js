import CONSTANTS from '../constants';
const { AUTHENTICATION } = CONSTANTS;
import go from './router.js';

function errorHandler(response, dispatch) {
	const status = response.status,
		resp = response.json();

	if(status >= 200 && status < 300) {
		return resp;
	}

	switch(status) {
		case 401:
			dispatch( go('login') );
			return resp.then(Promise.reject.bind(Promise));
		default:
			return resp.then(Promise.reject.bind(Promise));
	}
}

export default errorHandler;