import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ServiceInterceptor} from './interceptor/service.interceptor';
import {SignupComponent} from './signup/signup.component';
import {NotificationModule} from './notifications/module/notification.module';
import {TriggerNotificationComponent} from './trigger.notification/trigger.notification.component';
import {AuthGuard} from './authorization/home-auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    TriggerNotificationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NotificationModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: ServiceInterceptor,
      multi   : true,
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
