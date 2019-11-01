import {
	Peer as PeerAction
} from '../actions'

const initialState = {
	peer: null
}

function Peer(state = initialState, action) {
	switch (action.type) {
		case PeerAction.PEER:
			return Object.assign({}, state, {
				peer: action.peer
			});
	}
	return state;
}

export default Peer;