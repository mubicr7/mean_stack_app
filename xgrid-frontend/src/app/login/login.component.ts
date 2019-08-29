import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: User = new User();
  loading = false;
  returnUrl: string;
  constructor(private loginService: LoginService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    this.loginService.signOut();
  }

  signIn() {
    this.loading = true;
    this.loginService.signIn(this.model.userId, this.model.password)
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.notificationService.error('Unable to login', 'User Id/Password do not exist or incorrect');
          this.loading = false;
        });
   }

}
