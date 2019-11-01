export const LOCALSTREAM = 'LOCALSTREAM'

export const _setLocalStream = (localStream) => ({ type: LOCALSTREAM, localStream, })

export function setLocalStream(localStream)
{
	return (dispatch) => {
		dispatch(_setLocalStream(localStream));
	}
}

export function deleteLocalStream()
{
	return (dispatch) => {
		dispatch(_setLocalStream(null));
	}
}
