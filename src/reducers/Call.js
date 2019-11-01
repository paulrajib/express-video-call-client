import {
	Call as CallAction
} from '../actions'

const initialState = {
	call: null
}

function Call(state = initialState, action) {
	switch (action.type) {
		case CallAction.CALL:
			return Object.assign({}, state, {
				call: action.call
			});
	}
	return state;
}

export default Call;