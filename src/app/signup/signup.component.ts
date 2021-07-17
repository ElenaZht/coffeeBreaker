import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {UsersService} from '../users.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorText: string;

  constructor(public dialogRef: MatDialogRef<SignupComponent>, private usersService: UsersService) {
    this.errorText = '';

  }

  ngOnInit() {
  }
  exit() {
    this.dialogRef.close();
  }
  onSubmit(SignupForm: NgForm) {
    return true;
  }
}
