import {
	AccessToken as AccessTokenAction
} from '../actions'
import { getAccessToken } from '../utils/AuthService'

const initialState = {
	accessToken: getAccessToken()
}

function AccessToken(state = initialState, action) {
	switch (action.type) {
		case AccessTokenAction.ACCESS_TOKEN:
			return Object.assign({}, state, {
				accessToken: action.accessToken
			});
	}
	return state;
}

export default AccessToken;