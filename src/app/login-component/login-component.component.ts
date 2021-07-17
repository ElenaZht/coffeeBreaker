import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User, UsersService} from '../users.service';
import {SignupComponent} from '../signup/signup.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-signup-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  errorText: string;
  constructor(public dialogRef: MatDialogRef<LoginComponentComponent>, private usersService: UsersService,  private router: Router, public dialog: MatDialog, private toastr: ToastrService) {
    this.errorText = '';
  }

  ngOnInit() {}
  onSubmit(loginForm: NgForm) {
    const user = loginForm.value as User;
    console.log('email is ', user.email, ', password is ', user.password);
    this.usersService.logIn(user.email, user.password)
      .subscribe(answer => {
        if (answer) {
            if (answer === true) {
              loginForm.reset();
              this.exit(true);
            }
            console.log('user received', user);
            this.showSuccess(user);
          } else {
            this.errorText = 'Wrong login or password.';
          }
        }, err => {
          console.log(err);
          this.showError(user);
        }
      );
  }
  exit(bool) {
    this.dialogRef.close(bool);
  }

  toSignUp() {
    this.exit(true);
    const dialogRef = this.dialog.open(SignupComponent, {panelClass: 'custom-dialog-container', height: '50vmin',
      width: '20vmax'});
  }
  showSuccess(u) {
    this.toastr.success('You logged in as ' + u.email, 'Logged in successfully!' );
  }

  showError(u) {
    this.toastr.error('There is no user with email: ' + u.email + ' or password is wrong. Please, try again.', 'Not authorized!');

  }
}
