import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/reducers";
import {DatePipe} from "@angular/common";
import {NgForm} from "@angular/forms";
import {Contact} from "../../model/contact.model";
import {contactActionTypes, createContact, loadContacts} from "../../store/contact.actions";
import {Update} from "@ngrx/entity";

@Component({
  selector: 'app-create-update-dialog',
  templateUrl: './create-update-dialog.component.html',
  styleUrls: ['./create-update-dialog.component.css']
})
export class CreateUpdateDialogComponent {

  dialogTilte: string
  contactToBeUpdated: Contact;

  constructor(public dialogRef: MatDialogRef<CreateUpdateDialogComponent>,
              private store: Store<AppState>,
              private datepipe: DatePipe,
              @Inject(MAT_DIALOG_DATA) public data: Contact) {
    if(data){
      this.dialogTilte = 'Update Contact';
      this.contactToBeUpdated = {...data};
    }else{
      this.dialogTilte = 'Create a new Contact';
    }

  }

  onSubmit(submittedForm: NgForm) {
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
    this.dialogRef.close()
  }

  updateContact(updateForm: any) {
    console.log(updateForm.value)
    updateForm.value.birthDate= this.datepipe.transform(updateForm.value.birthDate, 'yyyy-MM-dd')!
    const update: Update<Contact> = {
      id: this.contactToBeUpdated.id!.toString(),
      changes: {
        ...this.contactToBeUpdated,
        ...updateForm.value
      }
    };

    this.store.dispatch(contactActionTypes.updateContact({update}));
    this.dialogRef.close()
  }
}
