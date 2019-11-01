export const CALLSTATUS = 'CALLSTATUS';
export const NONE = 'NONE';
export const INITIATED = 'INITIATED';
export const RECEIVED = 'RECEIVED';
export const ANSWERED = 'ANSWERED';
export const ENDED = 'ENDED';

export const _setCallStatus = (callStatus) => ({ type: CALLSTATUS, callStatus, })

export function setCallStatus(callStatus)
{
	return (dispatch) => {
		dispatch(_setCallStatus(callStatus));
	}
}

export function resetCallStatus()
{
	return (dispatch) => {
		dispatch(_setCallStatus(NONE));
	}
}
