import {
	RemoteStream as RemoteStreamAction
} from '../actions'

const initialState = {
	remoteStream: null
}

function RemoteStream(state = initialState, action) {
	switch (action.type) {
		case RemoteStreamAction.REMOTESTREAM:
			return Object.assign({}, state, {
				remoteStream: action.remoteStream
			});
	}
	return state;
}

export default RemoteStream;