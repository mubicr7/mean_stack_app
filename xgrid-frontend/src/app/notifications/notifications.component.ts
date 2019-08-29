

import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../services/notification.service';
import {NotificationModel, NotificationTypes} from '../model/notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.component.html',
  styleUrls: ['notifications.component.css']
})

export class NotificationComponent implements OnInit{
  notifications: NotificationModel[] = [];

  constructor(public notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.getAlert().subscribe((alert: NotificationModel) => {
      // this.notifications = [];
      if (!alert) {
        this.notifications = [];
        return;
      }
      this.notifications.push(alert);
      setTimeout(() => {
        this.notifications = this.notifications.filter(x => x !== alert);
      }, alert.timeOut);
    });
  }

  cssClass(notification: NotificationModel) {
    if (!notification) {
      return;
    }
    switch (notification.type) {
      case NotificationTypes.Success:
        return 'notification-success';
      case NotificationTypes.Error:
        return 'notification-error';
      case NotificationTypes.Info:
        return 'notification-info';
      case NotificationTypes.Warning:
        return 'notification-warning';
    }
  }

  removeNotification(notification: NotificationModel) {
    this.notifications = this.notifications.filter(x => x !== notification);
  }

}
