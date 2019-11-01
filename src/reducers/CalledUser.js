import {
	CalledUser as CalledUserAction
} from '../actions'

const initialState = {
	calledUser: null
}

function CalledUser(state = initialState, action) {
	switch (action.type) {
		case CalledUserAction.CALLEDUSER:
			return Object.assign({}, state, {
				calledUser: action.calledUser
			});
	}
	return state;
}

export default CalledUser;