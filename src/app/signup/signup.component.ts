import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {User, UsersService} from '../users.service';
import {NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  errorText: string;
  email: string;
  birthday: Date;
  password: string;
  phone: string;
  user = {email: '', birthday: '', password: '', phone: ''};
  private destroy$ = new Subject();

    constructor(public dialogRef: MatDialogRef<SignupComponent>, private usersService: UsersService, private toastr: ToastrService,
                private spinner: NgxSpinnerService) {}

    ngOnInit() {
      this.errorText = '';
    }
    exit(ans = false) {
      this.dialogRef.close(ans);
    }
    onSubmit(SignupForm: NgForm) {
      this.spinner.show();
      const user = SignupForm.value as User;
      this.usersService.AddUser(user).subscribe(
        () => {
          this.exit(true);
          this.usersService.logIn(user.email, user.password).subscribe(
            res => {
              this.spinner.hide();
              this.showSuccess(user);
            }
          );
          }, err => {
          this.spinner.hide();
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

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

  }
