export const AUTH_USER = 'AUTH_USER'

export const _setAuthUser = (authUser) => ({ type: AUTH_USER, authUser, })

export function setAuthUser(authUser)
{
	return (dispatch) => {
		dispatch(_setAuthUser(authUser));
	}
}

export function deleteAuthUser()
{
	return (dispatch) => {
		dispatch(_setAuthUser(null));
	}
}
