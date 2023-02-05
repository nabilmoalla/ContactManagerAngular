import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Contact} from "../../model/contact.model";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent {
  constructor(public dialogRef: MatDialogRef<ContactDetailsComponent>,@Inject(MAT_DIALOG_DATA) public data: Contact) {}

}
