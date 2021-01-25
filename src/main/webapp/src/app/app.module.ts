import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LoginModule} from './login/login.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './login/AuthInterceptor';
import {HitterGuard} from './hitter/HitterGuard';
import {HitterComponent} from './hitter/hitter.component';
import {HitterModule} from './hitter/hitter.module';
import {LoginService} from './login/login.service';
import {APP_BASE_HREF} from "@angular/common";

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'hitter', component: HitterComponent, canActivate: [HitterGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    LoginModule,
    HitterModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: APP_BASE_HREF, useValue: '/api'},
    LoginService,
    HitterGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
