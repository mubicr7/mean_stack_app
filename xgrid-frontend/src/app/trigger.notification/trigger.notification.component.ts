import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NotificationModel, NotificationTypes} from '../model/notification.model';
import {NotificationService} from '../services/notification.service';
import {UserNotificationService} from '../services/user-notification.service';

@Component({
  selector: 'app-trigger-notification',
  templateUrl: './trigger.notification.component.html',
  styleUrls: ['./trigger.notification.component.css']
})
export class TriggerNotificationComponent implements OnInit {

  @Output() saveNotification = new EventEmitter();
  model: NotificationModel = new NotificationModel();
  types = [
    { value: NotificationTypes.Success, label: 'Success' },
    { value: NotificationTypes.Info, label: 'Info'},
    { value: NotificationTypes.Warning, label: 'Warning'},
    { value: NotificationTypes.Error, label: 'Error'}
  ];
  constructor(private notificationService: NotificationService, private usernotificationService: UserNotificationService) { }

  triggerNotification() {
    let timeOut;
    if (this.model.timeOut) {
      timeOut = this.model.timeOut * 1000;
    }
    if (this.model.type === NotificationTypes.Success) {
      this.notificationService.success(this.model.title, this.model.message, timeOut);
    } else if (this.model.type === NotificationTypes.Info) {
      this.notificationService.info(this.model.title, this.model.message, timeOut);
    } else if (this.model.type === NotificationTypes.Warning) {
      this.notificationService.warn(this.model.title, this.model.message, timeOut);
    } else if (this.model.type === NotificationTypes.Error) {
      this.notificationService.error(this.model.title, this.model.message, timeOut);
    }
  }

  save() {
    this.saveNotification.emit(this.model);
    this.model = new NotificationModel();
  }
  ngOnInit() {
  }

}
