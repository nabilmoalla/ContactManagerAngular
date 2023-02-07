import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {contactActionTypes} from "./contact.actions";
import {concatMap, map, tap} from "rxjs";
import {ContactService} from "../services/contact.service";
import {Router} from "@angular/router";

@Injectable()
export class ContactEffects {

  loadContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contactActionTypes.loadContacts),
      concatMap(() => this.contactService.getAllContacts()),
      map(contacts => contactActionTypes.contactsLoaded({contacts}))
    )
  );

  createContact$ = createEffect(() =>
      this.actions$.pipe(
        ofType(contactActionTypes.createContact),
        concatMap((action) => this.contactService.createContact(action.contact))
      ),
    {dispatch: false}
  );

  deleteContact$ = createEffect(() =>
      this.actions$.pipe(
        ofType(contactActionTypes.deleteContact),
        concatMap((action) => this.contactService.deleteContact(action.contactId))
      ),
    {dispatch: false}
  );

  getOneContact$ = createEffect(() =>
      this.actions$.pipe(
        ofType(contactActionTypes.getOneContact),
        concatMap((action) => this.contactService.getOneContact(action.contactId))
      ),
    {dispatch: false}
  );

  updateContact$ = createEffect(() =>
      this.actions$.pipe(
        ofType(contactActionTypes.updateContact),
        concatMap((action) => this.contactService.updateContact(action.update.id, action.update.changes))
      ),
    {dispatch: false}
  );

  constructor(private contactService: ContactService, private actions$: Actions, private router: Router) {}
}
