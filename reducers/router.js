import { hashHistory } from 'react-router'
import CONSTANTS from '../constants';
const { ROUTING } = CONSTANTS;

const initstate = {
	current: ''
};

function router( state = initstate, action = {} ) {

	switch (action.type) {
		case ROUTING.GO:
			hashHistory.push('/' + action.destination);
			return {
				current: action.destination
			};
		default:
			return state;
	}
}

export default router;

