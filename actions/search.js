import CONSTANTS from '../constants';
const { SEARCH } = CONSTANTS;
const BASE_URL = 'http://localhost:3333/api/';
const GOOGLE_BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

function searchSuccess(items) {
	return {
		type: SEARCH.RESPONSE,
		ok: true,
		items
	}
}

function searchError(error) {
	return {
		type: SEARCH.RESPONSE,
		ok: false,
		message: error
	}
}

function searching() {
	return {
		type: SEARCH.LOADING
	}
}

function searchGoogle(query) {
	const config = {
			method: 'GET'
		},
		searchType = '&printType=books';

	return (dispatch) => {
		// We dispatch requestLogin to kickoff the call to the API
		// dispatch(requestLogin(action.creds));

		dispatch(searching());

		return fetch(GOOGLE_BASE_URL + encodeURIComponent(query) + searchType, config)
			.then((resp)=> {
				return resp.json()
			})
			.then(
				({items}) => {
					dispatch(searchSuccess(items));
				},
				(error)=> {
					dispatch(searchError(error));
				}
		).catch(err => console.log('Error: ', err));
	};
}

export default {
	searchGoogle
}