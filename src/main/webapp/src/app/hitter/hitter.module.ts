import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HitterComponent} from './hitter.component';
import {HitterService} from './hitter.service';

@NgModule({
  declarations: [
    HitterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HitterService
  ],
})
export class HitterModule { }
