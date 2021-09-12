import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { XPBetweenComponent } from './pages';

@NgModule({
  declarations: [
    AppComponent,
    XPBetweenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    XPBetweenComponent
  ]
})
export class AppModule { }
