import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ContactListComponent} from "./contact/component/contact-list/contact-list.component";
import {CreateContactComponent} from "./contact/component/create-contact/create-contact.component";
import {ContactResolver} from "./contact/contact.resolver";

const routes = [
  {
    path: 'contacts',
    component: ContactListComponent,
    resolve: {
      contacts: ContactResolver
    }
  },
  {path: 'create-contact', component: CreateContactComponent},
  {path: '**', redirectTo: 'contacts'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  providers: [
    ContactResolver
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
