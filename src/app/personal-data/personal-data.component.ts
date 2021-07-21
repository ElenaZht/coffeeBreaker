import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, UsersService} from '../users.service';
import {NgForm} from '@angular/forms';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPencilAlt, faCheck, faUndo} from '@fortawesome/free-solid-svg-icons';
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

  constructor(private userService: UsersService) {}

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
        }
      }
    );
  }

  onSubmit(dataForm: NgForm) {
    const user = dataForm.value as User;
    const edition = this.userService.editUser(this.user.id, user.firstname, user.secondname, user.email, user.birthday, user.phone);
    console.log('data from form ', user);
    console.log('component send name to array service as ', user.firstname);
    edition.subscribe(
      answer => {
            console.log('answer from array service ', answer);
            console.log('finily this.user is ', this.user);
            this.editData();
          }, err => {
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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
