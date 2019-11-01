export const RINGING = 'RINGING'
	
export const _setRinging = (ringing) => ({ type: RINGING, ringing, })

export function startRinging()
{
	return (dispatch) => {
		dispatch(_setRinging(true));
	}
}

export function stopRinging()
{
	return (dispatch) => {
		dispatch(_setRinging(false));
	}
}