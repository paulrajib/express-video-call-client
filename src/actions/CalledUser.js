export const CALLEDUSER = 'CALLEDUSER'

export const _setCalledUser = (calledUser) => ({ type: CALLEDUSER, calledUser, })

export function setCalledUser(calledUser)
{
	return (dispatch) => {
		dispatch(_setCalledUser(calledUser));
	}
}

export function deleteCalledUser()
{
	return (dispatch) => {
		dispatch(_setCalledUser(null));
	}
}
