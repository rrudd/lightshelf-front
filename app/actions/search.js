import CONSTANTS from '../constants';
import go from './router.js';
const { SEARCH } = CONSTANTS;
const GOOGLE_BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

function searchSuccess(items) {
  return {
    type: SEARCH.RESPONSE,
    ok: true,
    results: items,
  };
}

function searchError(error) {
  return {
    type: SEARCH.RESPONSE,
    ok: false,
    message: error,
  };
}

function search(query) {
  const config = {
    method: 'GET',
  };
  const searchType = '&printType=books';

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    // dispatch(requestLogin(action.creds));

    dispatch({
      type: SEARCH.REQUEST,
      query,
    });

    return fetch(GOOGLE_BASE_URL + encodeURIComponent(query) + searchType, config)
      .then((resp) => resp.json())
      .then(
      ({ items }) => {
        dispatch(searchSuccess(items));
      },
      (error) => {
        dispatch(searchError(error));
      }
    ).catch(err => console.log('Error: ', err));
  };
}

export default {
  search,
};
