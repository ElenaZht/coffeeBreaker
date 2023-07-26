import {Component, OnDestroy, OnInit} from '@angular/core';
import {faPencilAlt, faCheck, faUndo} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {UsersService} from '../users.service';
import {Contacts, ItemsService} from '../items.service';
import {NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

library.add(faPencilAlt);
library.add(faCheck);
library.add(faUndo);

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {
  isAdmine: boolean;
  isButtonsShown = false;
  instagram: string;
  facebook: string;
  email: string;
  phone1: string;
  phone2: string;
  phone3: string;
  address: string;
  contacts = {} as Contacts;
  sucMsg: string;
  errMsg: string;
  errTitle: string;
  myLang: string;
  private destroy$ = new Subject();

  constructor(private userService: UsersService, private itemsService: ItemsService, private toastr: ToastrService,
              private spinner: NgxSpinnerService, private  translator: TranslateService) {}

  ngOnInit() {

    if (this.userService.getCurrentUser() && this.userService.getCurrentUser().role === 0) {
      this.isAdmine = true;
    }
    this.itemsService.GetContacts().pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        this.contacts = res;
        if (this.contacts) {
          this.instagram = this.contacts.instagram;
          this.facebook = this.contacts.facebook;
          this.email = this.contacts.email;
          this.phone1 = this.contacts.phone1;
          this.phone2 = this.contacts.phone2;
          this.phone3 = this.contacts.phone3;
          this.address = this.contacts.address;
        } else {
          this.instagram = '';
          this.facebook = '';
          this.email = '';
          this.phone1 = '';
          this.phone2 = '';
          this.phone3 = '';
          this.address = '';
        }

      }
    );

    this.translator.get('confirm.contactsedited').pipe(takeUntil(this.destroy$)).subscribe(res => this.sucMsg = res);
    this.translator.get('confirm.try').pipe(takeUntil(this.destroy$)).subscribe(res => this.errMsg = res);
    this.translator.get('confirm.connotedited').pipe(takeUntil(this.destroy$)).subscribe(res => this.errTitle = res);
    this.myLang = localStorage.getItem('lang');
  }
  onSubmit(contactsForm: NgForm) {
    this.spinner.show();
    const contacts = contactsForm.value;
    const edition = this.itemsService.EditContacts(this.instagram, this.facebook, this.email, this.phone1, this.phone2, this.phone3, this.address);
    edition.pipe(takeUntil(this.destroy$)).subscribe(
      answer => {
        this.spinner.hide();
        this.editData();
        this.showSuccess();
        this.contacts = answer;
      }, err => {
        this.spinner.hide();
        this.showError(err);
      }
    );
  }
  editData() {
    this.isButtonsShown = !this.isButtonsShown;
  }

  undo() {
    this.instagram = this.contacts.instagram;
    this.facebook = this.contacts.facebook;
    this.email = this.contacts.email;
    this.phone1 = this.contacts.phone1;
    this.phone2 = this.contacts.phone2;
    this.phone3 = this.contacts.phone3;
    this.address = this.contacts.address;
  }
  showSuccess() {
    this.toastr.success(this.sucMsg );
  }

  showError(err) {
    this.toastr.error(this.errMsg, this.errTitle, err);

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
