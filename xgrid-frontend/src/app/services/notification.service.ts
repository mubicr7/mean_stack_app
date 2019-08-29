import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {NotificationTypes, NotificationModel} from '../model/notification.model';




@Injectable()
export class NotificationService {
  public subject = new Subject<NotificationModel>();
  public maintain = true;

  constructor(public router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.maintain) {
          this.maintain = false;
        } else {
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  showNotification(type: NotificationTypes, title: string, message: string, timeOut = 4000, maintain = false) {
    this.maintain = maintain;
    const temp: NotificationModel = new NotificationModel();
    temp.type = type;
    temp.title = title;
    temp.message = message;
    temp.timeOut = timeOut;
    this.subject.next(temp);
  }

  error(title: string, message: string, timeOut = 4000, maintain = false) {
    this.showNotification(NotificationTypes.Error, title, message, timeOut, maintain);
  }

  success(title: string, message: string, timeOut = 4000, maintain = false) {
    this.showNotification(NotificationTypes.Success, title, message, timeOut, maintain);
  }

  warn(title: string, message: string, timeOut = 4000, maintain = false) {
    this.showNotification(NotificationTypes.Warning, title, message, timeOut, maintain);
  }

  info(title: string, message: string, timeOut = 4000, maintain = false ) {
    this.showNotification(NotificationTypes.Info, title, message, timeOut, maintain);
  }





  clear() {
    this.subject.next();
  }
}
