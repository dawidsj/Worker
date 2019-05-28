import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ServicesModule} from './services/services.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import {CounterModule} from 'angular-circle-counter';
import {OwnerBoardsResolver} from './components/dashboard/owner.boards.resolver';
import {ParticipantBoardsResolver} from './components/dashboard/participant.boards.resolver';
import {HttpRequestInterceptor} from './http.request.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ServicesModule,
    NgxSpinnerModule,
    CounterModule,
  ],
  providers: [
    OwnerBoardsResolver,
    ParticipantBoardsResolver,
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
