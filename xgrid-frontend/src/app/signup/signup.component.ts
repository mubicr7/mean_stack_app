import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {User} from '../model/user';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  loading = false;

  model: User = new User();

  ngOnInit(): void {
  }



  constructor(
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) { }

  signUp() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
        data => {
          this.notificationService.success('Success','Registration successful');
          this.router.navigate(['/login']);
        },
        error => {
          this.notificationService.error('Error', 'Duplicate User Id');
          this.loading = false;
        });
  }


}
