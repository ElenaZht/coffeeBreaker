import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, UsersService} from '../users.service';
import {NgForm} from '@angular/forms';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPencilAlt, faCheck, faUndo} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

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
  subscription;
  subSuc: string;
  subErrMsg: string;
  subErrTitle: string;
  delUserQ: string;
  delSuc: string;
  delErr: string;

  constructor(private userService: UsersService, private toastr: ToastrService, private spinner: NgxSpinnerService, public datepipe: DatePipe,
              private  translator: TranslateService) {
    this.translator.get('confirm.dataedited').subscribe(res => this.subSuc = res);
    this.translator.get('confirm.try').subscribe(res => this.subErrMsg = res);
    this.translator.get('confirm.datanotedited').subscribe(res => this.subErrTitle = res);
    this.translator.get('confirm.suredelaccount').subscribe(res => this.delUserQ = res);
    this.translator.get('confirm.accountdelsuc').subscribe(res => this.delSuc = res);
    this.translator.get('confirm.accountnotdel').subscribe(res => this.delErr = res);

  }

  ngOnInit() {
    this.subscription = this.userService.getUser().subscribe(user => {
        this.user = user;
        console.log('accaunt of user ', this.user);
        if (user) {
          if (this.user.role === 0) {
            this.isAdmin = true;
          }
          this.name = this.user.name;
          this.email = this.user.email;
          this.phone = this.user.phone;
          this.birthday = this.user.birthday;
          this.birthday = this.datepipe.transform(this.birthday, 'dd MMMM yyyy');
          console.log('bd', this.birthday);

        } else {
          this.name = '';
          this.email = '';
          this.phone = '';
          this.birthday = '';
        }
      }
    );
  }

  onSubmit(dataForm: NgForm) {
    this.spinner.show();
    const user = dataForm.value as User;
    const edition = this.userService.editUser(this.user.id, user.name, user.email, user.birthday, user.phone);
    console.log('data from form ', user);
    console.log('component send name to array service as ', user.name);
    edition.subscribe(
      answer => {
            this.spinner.hide();
            console.log('answer from array service ', answer);
            console.log('finily this.user is ', this.user);
            this.editData();
            this.showSuccess(this.subSuc);
          }, err => {
            this.spinner.hide();
            this.showError(this.subErrMsg, this.subErrTitle);
            console.log('error from array service', err);
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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteUser(user: User) {
    if (confirm(this.delUserQ)) {
      this.spinner.show();
      this.userService.RemoveUser(user.id).subscribe(
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
}
