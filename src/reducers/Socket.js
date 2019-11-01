import {
	Socket as SocketAction
} from '../actions'

const initialState = {
	socket: null
}

function Socket(state = initialState, action) {
	switch (action.type) {
		case SocketAction.SOCKET:
			return Object.assign({}, state, {
				socket: action.socket
			});
	}
	return state;
}

export default Socket;