import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {metaReducers, reducers} from './store/reducers';
import {HeaderComponent} from './header/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {AppRoutingModule} from "./app-routing.module";
import {EffectsModule} from "@ngrx/effects";
import {ContactModule} from "./contact/contact.module";
import {HttpClientModule} from "@angular/common/http";
import {MatTabsModule} from "@angular/material/tabs";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
    imports: [
        BrowserModule,
        ContactModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({maxAge: 25}),
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatNativeDateModule
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
