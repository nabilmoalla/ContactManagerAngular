import { Component } from '@angular/core';
import {AppState} from "../../../store/reducers";
import {Store} from "@ngrx/store";
import {createContact, loadContacts} from "../../store/contact.actions";
import {Contact} from "../../model/contact.model";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent {

  constructor(private store: Store<AppState>,public datepipe: DatePipe,private router: Router) { }

  ngOnInit() {
  }

  onSubmit(submittedForm: any) {
    console.log(submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }


    const contact: Contact = {
      firstName: submittedForm.value.firstName,
      lastName: submittedForm.value.lastName,
      birthDate: this.datepipe.transform(submittedForm.value.birthDate, 'yyyy-MM-dd')!,
      address: submittedForm.value.address
    };
    this.store.dispatch(createContact({contact}));
    this.store.dispatch(loadContacts());
  }
}
