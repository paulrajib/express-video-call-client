import {
	Contacts as ContactsAction
} from '../actions'

const initialState = {
	contacts: []
}

function Contacts(state = initialState, action) {
	switch (action.type) {
	case ContactsAction.CONTACTS:
		var contacts = action.contacts;
		return Object.assign({}, state, {
			contacts: [
				...contacts,
				...state.contacts
			]
		})
	case ContactsAction.CONTACT:
		var oldContacts = state.contacts.slice();
		var newContact = action.contact;
		var placed = false;
		for(var i = 0; i < oldContacts.length; i++)
		{
			var currContact = oldContacts[i];
			if(newContact.email == currContact.email)
			{
				oldContacts[i] = newContact;
				placed = true;
				break;
			}
		}
		if(placed == false)
		{
			oldContacts.push(newContact);
		}
		return Object.assign({}, state, {
			contacts: oldContacts
		});
	}
	return state;
}

export default Contacts;