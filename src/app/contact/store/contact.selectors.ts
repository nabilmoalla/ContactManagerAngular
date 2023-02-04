import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ContactState, selectAll} from "./contact.reducers";

export const contactFeatureSelector = createFeatureSelector<ContactState>('contacts');

export const getAllContacts = createSelector(
  contactFeatureSelector,
  selectAll
);

export const areContactsLoaded = createSelector(
  contactFeatureSelector,
  state => state.contactsLoaded
);
