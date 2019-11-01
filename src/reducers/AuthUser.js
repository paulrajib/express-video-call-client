import {
	AuthUser as AuthUserAction
} from '../actions'

const initialState = {
	authUser: null
}

function AuthUser(state = initialState, action) {
	switch (action.type) {
		case AuthUserAction.AUTH_USER:
			return Object.assign({}, state, {
				authUser: action.authUser
			});
	}
	return state;
}

export default AuthUser;

