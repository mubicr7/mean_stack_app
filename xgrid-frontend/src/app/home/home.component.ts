import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../services/user.service';

import {NotificationService} from '../services/notification.service';
import {UserNotificationService} from '../services/user-notification.service';
import {NotificationModel, NotificationTypes} from '../model/notification.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notificatons: NotificationModel[] = [];
  loggedUser: User;


  constructor(private userService: UserService, private userNotificationService: UserNotificationService, private notificationService: NotificationService) {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }

  ngOnInit() {
    this.loadAllNotifications();

  }

  deleteUser(_id: string) {
    //this.userService.delete(_id).subscribe(() => { this.loadAllUsers()});
  }

  getTypeName(type: number) {
    if (type === NotificationTypes.Success) {
      return 'Success';
    } else if (type === NotificationTypes.Info) {
      return 'Info';
    } else if (type === NotificationTypes.Warning) {
      return 'Warning';
    } else if (type === NotificationTypes.Error) {
      return 'Error';
    }
  }
  trigger(notification: NotificationModel) {
    let timeOut;
    if (notification.timeOut) {
      timeOut = notification.timeOut * 1000;
    }
    if (notification.type === NotificationTypes.Success) {
      this.notificationService.success(notification.title, notification.message, timeOut);
    } else if (notification.type === NotificationTypes.Info) {
      this.notificationService.info(notification.title, notification.message, timeOut);
    } else if (notification.type === NotificationTypes.Warning) {
      this.notificationService.warn(notification.title, notification.message, timeOut);
    } else if (notification.type === NotificationTypes.Error) {
      this.notificationService.error(notification.title, notification.message, timeOut);
    }
  }

  delete(_id: string) {
    this.userNotificationService.delete(this.loggedUser.userId, _id).subscribe( (data: any) => {
      for (const notification of this.notificatons) {
        if (data._id === notification._id) {
          this.notificatons.splice(this.notificatons.indexOf(notification), 1);
          break;
        }
      }
      this.notificationService.success('Success', 'Notification deleted');
    }, (error) => {
      this.notificationService.error('Error', 'Some error occured while deleting');
    });
  }
  private loadAllNotifications() {
    // this.userService.getAll().subscribe(users => { this.users = users; });
    this.userNotificationService.getAll(this.loggedUser.userId).subscribe( data => {
      this.notificatons = data as NotificationModel[];
    }, (error) => {
      this.notificationService.error('Error', error.error);
    });
  }

  save(event) {
    const model = event as NotificationModel;
    const userNotification = {
      userId : JSON.parse(localStorage.getItem('loggedUser')).userId,
      notifications : [
        model
      ]
    };
    this.userNotificationService.add(userNotification).subscribe(
      data => {
        if (data) {
          this.notificatons.push(data as NotificationModel);
        }
        this.notificationService.success('Notification Added', 'Notification with title : ' + model.title + ' Added');

      },
      error => {
        this.notificationService.error('Error', model.title + ' Not Added');

      });

  }
}
