export const REMOTESTREAM = 'REMOTESTREAM'

export const _setRemoteStream = (remoteStream) => ({ type: REMOTESTREAM, remoteStream, })

export function setRemoteStream(remoteStream)
{
	return (dispatch) => {
		dispatch(_setRemoteStream(remoteStream));
	}
}

export function deleteRemoteStream()
{
	return (dispatch) => {
		dispatch(_setRemoteStream(null));
	}
}
