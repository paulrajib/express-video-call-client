import {
	LocalStream as LocalStreamAction
} from '../actions'

const initialState = {
	localStream: null
}

function LocalStream(state = initialState, action) {
	switch (action.type) {
		case LocalStreamAction.LOCALSTREAM:
			return Object.assign({}, state, {
				localStream: action.localStream
			});
	}
	return state;
}

export default LocalStream;