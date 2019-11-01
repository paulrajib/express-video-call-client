import { setAccessToken, getAccessToken, clearAccessToken } from '../utils/AuthService';

export const ACCESS_TOKEN = 'ACCESS_TOKEN'

export const _setAccessToken = (accessToken) => ({ type: ACCESS_TOKEN, accessToken, })

export function setLoggedIn(accessToken)
{
	setAccessToken(accessToken);
	return (dispatch) => {
		dispatch(_setAccessToken(accessToken));
	}
}

export function setLoggedOut()
{
	clearAccessToken();
	return (dispatch) => {
		dispatch(_setAccessToken(null));
	}
}