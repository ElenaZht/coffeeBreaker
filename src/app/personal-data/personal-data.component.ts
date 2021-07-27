import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, UsersService} from '../users.service';
import {NgForm} from '@angular/forms';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPencilAlt, faCheck, faUndo} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


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
  firstname: string;
  secondname: string;
  email: string;
  phone: string;
  birthday: Date;
  subscription;

  constructor(private userService: UsersService, private toastr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.subscription = this.userService.getUser().subscribe(user => {
        this.user = user;
        console.log('accaunt of user ', this.user);
        if (user) {
          if (this.user.role === 0) {
            this.isAdmin = true;
          }
          this.firstname = this.user.firstname;
          this.firstname = this.user.firstname;
          this.secondname = this.user.secondname;
          this.email = this.user.email;
          this.phone = this.user.phone;
          this.birthday = this.user.birthday;
        } else {
          this.firstname = '';
          this.firstname = '';
          this.secondname = '';
          this.email = '';
          this.phone = '';
          this.birthday = new Date();
        }
      }
    );
  }

  onSubmit(dataForm: NgForm) {
    this.spinner.show();
    const user = dataForm.value as User;
    const edition = this.userService.editUser(this.user.id, user.firstname, user.secondname, user.email, user.birthday, user.phone);
    console.log('data from form ', user);
    console.log('component send name to array service as ', user.firstname);
    edition.subscribe(
      answer => {
            this.spinner.hide();
            console.log('answer from array service ', answer);
            console.log('finily this.user is ', this.user);
            this.editData();
            this.showSuccess('Your data edited successfully!');
          }, err => {
            this.spinner.hide();
            this.showError('Please, try again.', 'Your data not edited!');
            console.log('error from array service', err);
          }
    );
  }

  editData() {
    this.isButtonsShown = !this.isButtonsShown;
    this.isDisabled = !this.isDisabled;
  }

  undo() {
    this.firstname = this.user.firstname;
    this.secondname = this.user.secondname;
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
    if (confirm('Are you sure you wont to delete your account? ')) {
      this.spinner.show();
      this.userService.RemoveUser(user.id).subscribe(
        res => {
          if (res) {
            this.userService.logout();
            this.spinner.hide();
            this.showSuccess('Your account deleted successfully!');
          }
        }, err => {
          this.spinner.hide();
          this.showError(err.statusText, 'Your account not deleted');
        }
      );
    }
  }
}
