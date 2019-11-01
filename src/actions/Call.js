export const CALL = 'CALL'

export const _setCall = (call) => ({ type: CALL, call, })

export function setCall(call)
{
	return (dispatch) => {
		dispatch(_setCall(call));
	}
}

export function deleteCall()
{
	return (dispatch) => {
		dispatch(_setCall(null));
	}
}
