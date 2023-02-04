import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactService} from "./services/contact.service";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {ContactEffects} from "./store/contact.effects";
import {contactReducer} from "./store/contact.reducers";
import { ContactListComponent } from './component/contact-list/contact-list.component';
import { CreateContactComponent } from './component/create-contact/create-contact.component';



@NgModule({
  declarations: [
    ContactListComponent,
    CreateContactComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('contacts', contactReducer),
    EffectsModule.forFeature([ContactEffects])
  ],
  providers: [ContactService],
  exports: [ContactListComponent, CreateContactComponent]
})
export class ContactModule { }
