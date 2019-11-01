export const SOCKET = 'SOCKET'

export const _setSocket = (socket) => ({ type: SOCKET, socket, })

export function setSocket(socket)
{
	return (dispatch) => {
		dispatch(_setSocket(socket));
	}
}

export function deleteSocket()
{
	return (dispatch) => {
		dispatch(_setSocket(null));
	}
}
