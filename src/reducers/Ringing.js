import {
	Ringing as RingingAction
} from '../actions'

const initialState = {
	ringing: false
}

function Ringing(state = initialState, action) {
	switch (action.type) {
		case RingingAction.RINGING:
			return Object.assign({}, state, {
				ringing: action.ringing
			});
	}
	return state;
}

export default Ringing;
