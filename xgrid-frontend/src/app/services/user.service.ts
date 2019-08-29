import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {serverUrl} from '../app.configuration';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(user: User) {
    return this.http.post(serverUrl.url + '/users/register', user);
  }

}
