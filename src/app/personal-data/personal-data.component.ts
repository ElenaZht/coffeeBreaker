import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, UsersService} from '../users.service';
import {NgForm} from '@angular/forms';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPencilAlt, faCheck, faUndo} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

library.add(faPencilAlt);
library.add(faCheck);
library.add(faUndo);


@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit, OnDestroy {
  user: User;
  isAdmin = false;
  isButtonsShown = false;
  isDisabled = true;
  name: string;
  email: string;
  phone: string;
  birthday: any;
  private destroy$ = new Subject();
  subSuc: string;
  subErrMsg: string;
  subErrTitle: string;
  delUserQ: string;
  delSuc: string;
  delErr: string;

  constructor(private userService: UsersService, private toastr: ToastrService, private spinner: NgxSpinnerService,
              public datepipe: DatePipe, private  translator: TranslateService) {}

  ngOnInit() {
    this.userService.getUser().pipe(takeUntil(this.destroy$)).subscribe(user => {
        this.user = user;
        if (user) {
          if (this.user && this.user.role === 0) {
            this.isAdmin = true;
          }
          this.name = this.user.name;
          this.email = this.user.email;
          this.phone = this.user.phone;
          this.birthday = this.user.birthday;
          this.birthday = this.datepipe.transform(this.birthday, 'dd MMMM yyyy');

        } else {
          this.name = '';
          this.email = '';
          this.phone = '';
          this.birthday = '';
        }
      }
    );

    this.translator.get('confirm.dataedited').pipe(takeUntil(this.destroy$)).subscribe(res => this.subSuc = res);
    this.translator.get('confirm.try').pipe(takeUntil(this.destroy$)).subscribe(res => this.subErrMsg = res);
    this.translator.get('confirm.datanotedited').pipe(takeUntil(this.destroy$)).subscribe(res => this.subErrTitle = res);
    this.translator.get('confirm.suredelaccount').pipe(takeUntil(this.destroy$)).subscribe(res => this.delUserQ = res);
    this.translator.get('confirm.accountdelsuc').pipe(takeUntil(this.destroy$)).subscribe(res => this.delSuc = res);
    this.translator.get('confirm.accountnotdel').pipe(takeUntil(this.destroy$)).subscribe(res => this.delErr = res);
  }

  onSubmit(dataForm: NgForm) {
    this.spinner.show();
    const user = dataForm.value as User;
    const edition = this.userService.editUser(this.user.id, user.name, user.email, user.birthday, user.phone);
    edition.pipe(takeUntil(this.destroy$)).subscribe(
      answer => {
            this.spinner.hide();
            this.editData();
            this.showSuccess(this.subSuc);
          }, err => {
            this.spinner.hide();
            this.showError(this.subErrMsg, this.subErrTitle);
          }
    );
  }

  editData() {
    this.isButtonsShown = !this.isButtonsShown;
    this.isDisabled = !this.isDisabled;
  }

  undo() {
    this.name = this.user.name;
    this.email = this.user.email;
    this.phone = this.user.phone;
    this.birthday = this.user.birthday;
  }
  showSuccess(msg) {
    this.toastr.success(msg);
  }

  showError(msg, title) {
    this.toastr.error(msg, title);

  }

  deleteUser(user: User) {
    if (confirm(this.delUserQ)) {
      this.spinner.show();
      this.userService.RemoveUser(user.id).pipe(takeUntil(this.destroy$)).subscribe(
        res => {
          if (res) {
            this.userService.logout();
            this.spinner.hide();
            this.showSuccess(this.delSuc);
          }
        }, err => {
          this.spinner.hide();
          this.showError(err.statusText, this.delErr);
        }
      );
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete();
  }
}
