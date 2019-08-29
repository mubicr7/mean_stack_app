import { NgModule } from '@angular/core';
import {NotificationComponent} from '../notifications.component';
import {BrowserModule} from '@angular/platform-browser';
import {NotificationService} from '../../services/notification.service';



@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    NotificationComponent
  ],
  providers: [
    NotificationService
  ]
})
export class NotificationModule { }
