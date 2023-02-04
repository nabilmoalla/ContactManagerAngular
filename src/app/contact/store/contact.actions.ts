import {createAction, props} from "@ngrx/store";
import {Contact} from "../model/contact.model";
import {Update} from "@ngrx/entity";

export const loadContacts = createAction(
  '[Contacts List] Load Contacts via Service',
);

export const contactsLoaded = createAction(
  '[Contacts Effect] Contacts Loaded Successfully',
  props<{contacts: Contact[]}>()
);

export const createContact = createAction(
  '[Create Contact Component] Create Contact',
  props<{contact: Contact}>()
);

export const deleteContact = createAction(
  '[Contacts List Operations] Delete Contact',
  props<{contactId: string}>()
);

export const getOneContact = createAction(
  '[Contacts List Operations] get One Contact',
  props<{contactId: string}>()
);

export const updateContact = createAction(
  '[Contacts List Operations] Update Contact',
  props<{update: Update<Contact>}>()
);

export const contactActionTypes = {
  loadContacts,
  contactsLoaded,
  createContact,
  deleteContact,
  getOneContact,
  updateContact
};
