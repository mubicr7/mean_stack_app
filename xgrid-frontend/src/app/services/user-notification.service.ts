import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../model/user';
import {serverUrl} from '../app.configuration';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {

  constructor(private http: HttpClient) { }

  add(userNotification: any) {
    return this.http.post(serverUrl.url + '/notification/add', userNotification);
  }

  getAll(userId: string) {
    const params = new HttpParams()
      .set('id', userId)
    return this.http.get(serverUrl.url + '/notification', {params});
  }

  delete(userId: string, _id: string) {
    const params = new HttpParams()
      .set('_id', _id)
      .set('userId', userId)
    return this.http.delete(serverUrl.url + '/notification/delete', {params} );
  }
}
