import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FastValidModule } from 'fast-valid';

import { AppComponent } from './app.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { EmailComponent } from './components/email/email.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    EmailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FastValidModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
