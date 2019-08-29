export enum NotificationTypes {
  Error,
  Info,
  Warning,
  Success
}

export class NotificationModel {
  _id: string;
  type: NotificationTypes;
  title: string;
  message: string;
  timeOut: number;
}
