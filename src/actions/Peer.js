export const PEER = 'PEER'

export const _setPeer = (peer) => ({ type: PEER, peer, })

export function setPeer(peer)
{
	return (dispatch) => {
		dispatch(_setPeer(peer));
	}
}

export function deletePeer()
{
	return (dispatch) => {
		dispatch(_setPeer(null));
	}
}
