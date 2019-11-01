export const CONTACTS = 'CONTACTS'
export const CONTACT = 'CONTACT'

export const _setContacts = (contacts) => ({ type: CONTACTS, contacts, })
export const _pushContact = (contact) => ({ type: CONTACT, contact })

export function setContacts(contacts)
{
	return (dispatch) => {
		dispatch(_setContacts(contacts));
	}
}

export function pushContact(contact)
{
	return (dispatch) => {
		dispatch(_pushContact(contact));
	}
}