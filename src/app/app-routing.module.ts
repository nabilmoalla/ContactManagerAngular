import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {ContactListComponent} from "./contact/component/contact-list/contact-list.component";
import {ContactResolver} from "./contact/contact.resolver";

const routes = [
  {
    path: 'contacts',
    component: ContactListComponent,
    resolve: {
      contacts: ContactResolver
    }
  },
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
