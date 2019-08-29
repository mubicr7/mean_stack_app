import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {serverUrl} from '../app.configuration';
import {map} from 'rxjs/operators';
import {NotificationService} from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  signIn(userId: string, password: string) {
    return this.http.post<any>(serverUrl.url + '/users/authenticate', { userId: userId, password: password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('loggedUser', JSON.stringify(user));
          this.notificationService.success('Logged In', JSON.parse(localStorage.getItem('loggedUser')).userId + ' Welcome', 4000, true);
        }

        return user;
      })
  );
  }

  signOut() {
    if (localStorage.getItem('loggedUser')) {
      this.notificationService.info('Logged Out', JSON.parse(localStorage.getItem('loggedUser')).userId + ' Goodbye');
      localStorage.removeItem('loggedUser');
    }
  }
}
