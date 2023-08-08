import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User, UsersService} from '../users.service';
import {SignupComponent} from '../signup/signup.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-login-signup-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  errorText: string;
  subErrText: string;
  toastrSucMsg: string;
  toastrSucTitle: string;
  toastrErrMsg1: string;
  toastrErrMsg2: string;
  toastrErrTitle: string;
  constructor(public dialogRef: MatDialogRef<LoginComponentComponent>, private usersService: UsersService,
              private router: Router, public dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService,
              private  translator: TranslateService) {}

  ngOnInit() {
    this.errorText = '';
    this.translator.get('confirm.wrong').subscribe(res => this.subErrText = res);
    this.translator.get('confirm.youlogged').subscribe(res => this.toastrSucMsg = res);
    this.translator.get('confirm.logsuc').subscribe(res => this.toastrSucTitle = res);
    this.translator.get('confirm.nouser').subscribe(res => this.toastrErrMsg1 = res);
    this.translator.get('confirm.orpas').subscribe(res => this.toastrErrMsg2 = res);
    this.translator.get('confirm.notauth').subscribe(res => this.toastrErrTitle = res);
  }
  onSubmit(loginForm: NgForm) {
    this.spinner.show();
    const user = loginForm.value as User;
    this.usersService.logIn(user.email, user.password)
      .subscribe(answer => {
        this.spinner.hide();
        if (answer) {
            if (answer === true) {
              loginForm.reset();
              this.exit(true);
            }
            this.showSuccess(user);
          } else {
            this.errorText = this.subErrText;
          }
        }, err => {
          this.spinner.hide();
          this.showError(user);
        }
      );
  }
  exit(ans = false) {
    this.dialogRef.close(ans);
  }

  toSignUp() {
    const dialogRef = this.dialog.open(SignupComponent, {panelClass: 'custom-dialog-container', height: '400px',
      width: '300px'});
    dialogRef.afterClosed().subscribe(
      res => {
        this.exit(res);
      }
    );
  }
  showSuccess(u) {
    this.toastr.success(this.toastrSucMsg + ' ' + u.email, this.toastrSucTitle );
  }

  showError(u) {
    this.toastr.error(this.toastrErrMsg1 + ' ' + u.email + ' ' + this.toastrErrMsg2, this.toastrErrTitle);

  }
}
