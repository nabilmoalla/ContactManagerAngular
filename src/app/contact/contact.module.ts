import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactService} from "./services/contact.service";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {ContactEffects} from "./store/contact.effects";
import {contactReducer} from "./store/contact.reducers";
import { ContactListComponent } from './component/contact-list/contact-list.component';
import { CreateContactComponent } from './component/create-contact/create-contact.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    ContactListComponent,
    CreateContactComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('contacts', contactReducer),
    EffectsModule.forFeature([ContactEffects]),
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [ContactService],
  bootstrap: [],
  exports: [ContactListComponent, CreateContactComponent]
})
export class ContactModule { }
