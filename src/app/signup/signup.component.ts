import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {User, UsersService} from '../users.service';
import {NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorText: string;
  email: string;
  birthday: Date;
  password: string;
  phone: string;
  user = {email: '', birthday: '', password: '', phone: ''};

  constructor(public dialogRef: MatDialogRef<SignupComponent>, private usersService: UsersService, private toastr: ToastrService, private spinner: NgxSpinnerService) {
    this.errorText = '';

  }

  ngOnInit() {
  }
  exit() {
    this.dialogRef.close();
  }
  onSubmit(SignupForm: NgForm) {
    this.spinner.show();
    const user = SignupForm.value as User;
    console.log('user: ', user);
    this.usersService.AddUser(user).subscribe(
      () => {
        this.spinner.hide();
        this.usersService.logIn(user.email, user.password).subscribe(
          res => {
            this.exit();
            console.log('new user! ', user);
            this.showSuccess(user);
          }
        );
      }, err => {
        this.spinner.hide();
        console.log('error from sign up ', err);
        this.showError(user);

      }
      );

    }
  showSuccess(u) {
    this.toastr.success('You signed up as ' + u.email, 'Signed up successfully!' );
  }

  showError(u) {
    this.toastr.error('User with email: ' + u.email + ' is already exists. Please, try again.', 'Not signed up!');

  }

  }
