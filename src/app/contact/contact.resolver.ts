import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {filter, first, Observable, tap} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AppState} from "../store/reducers";
import {areContactsLoaded} from "./store/contact.selectors";
import {loadContacts} from "./store/contact.actions";

@Injectable()
export class ContactResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(areContactsLoaded),
        tap((contactsLoaded) => {
          if (!contactsLoaded) {
            this.store.dispatch(loadContacts());
          }

        }),
        filter(contactsLoaded => contactsLoaded),
        first()
      );
  }
}
