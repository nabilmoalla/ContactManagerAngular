import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Contact} from "../model/contact.model";
import {createReducer, on} from "@ngrx/store";
import {contactActionTypes} from "./contact.actions";

export interface ContactState extends EntityState<Contact> {
  contactsLoaded: boolean;
}

export const adapter: EntityAdapter<Contact> = createEntityAdapter<Contact>();

export const initialState = adapter.getInitialState({
  contactsLoaded: false
});

export const contactReducer = createReducer(
  initialState,

  on(contactActionTypes.contactsLoaded, (state, action) => {
    return adapter.setAll(
      action.contacts,
      {...state, contactsLoaded: true}
    );
  }),

  on(contactActionTypes.createContact, (state, action) => {
    return adapter.addOne(action.contact, state);
  }),

  on(contactActionTypes.deleteContact, (state, action) => {
    return adapter.removeOne(action.contactId, state);
  }),

  on(contactActionTypes.updateContact, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();
