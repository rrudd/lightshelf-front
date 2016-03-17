import CONSTANTS from '../constants';
const { ROUTING } = CONSTANTS;

function go(destination) {
	return {
		type: ROUTING.GO,
		destination
	}
}

export default go;
