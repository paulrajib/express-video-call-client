import {
	CallStatus as CallStatusAction
} from '../actions'

const initialState = {
	callStatus: CallStatusAction.NONE
}

function CallStatus(state = initialState, action) {
	switch (action.type) {
		case CallStatusAction.CALLSTATUS:
			return Object.assign({}, state, {
				callStatus: action.callStatus
			});
	}
	return state;
}

export default CallStatus;