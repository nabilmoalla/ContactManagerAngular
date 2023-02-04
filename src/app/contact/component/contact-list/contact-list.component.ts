import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/reducers";
import {ContactService} from "../../services/contact.service";
import {Observable} from "rxjs";
import {Contact} from "../../model/contact.model";
import {getAllContacts} from "../../store/contact.selectors";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{



  constructor(private contactService: ContactService, private store: Store<AppState>) { }

  ngOnInit(): void {

  }
}
