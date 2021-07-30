import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {faChevronLeft, faHeartbeat, faListUl, faPlus, faShoppingCart, faTrashAlt, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {Router} from '@angular/router';
import {ItemsService, Item} from '../items.service';
import {UsersService} from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

library.add(faPlus);
library.add(faShoppingCart);
library.add(faChevronLeft);
library.add(faHeartbeat);
library.add(faListUl);
library.add(faTrashAlt);
library.add(faPencilAlt);


@Component({
  selector: 'app-menu-item-dialog',
  templateUrl: './menu-item-dialog.component.html',
  styleUrls: ['./menu-item-dialog.component.css']
})
export class MenuItemDialogComponent implements OnInit {

  isAdmine = false;
  constructor(public dialogRef: MatDialogRef<MenuItemDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private itemService: ItemsService, private userService: UsersService, private toastr: ToastrService, private spinner: NgxSpinnerService) {
    if (this.userService.getCurrentUser().role === 0) {
      this.isAdmine = true;
    }
  }
  ings = false;
  nutrs = false;
  ngOnInit() {
  }

  goBack() {
    this.dialogRef.close();
  }
  goTray() {
    this.dialogRef.close();
    this.router.navigate(['/tray']);
  }
  goIngs() {
    this.ings = !this.ings;
  }
  goNutrs() {
    this.nutrs = !this.nutrs;
  }

  toTray() {
    this.dialogRef.close();
    this.router.navigate(['tray']);
  }

  edit(data: Item) {}

  delete(data: Item) {
    this.spinner.show();
    if (confirm('Are you sure to delete ' + data.title + '?')) {
      this.itemService.DeleteItem(data).subscribe(
        res => {
          this.spinner.hide();
          this.showSuccess(data.title + ' was deleted successfuly!');
          this.goBack();
        }, err => {
          this.spinner.hide();
          this.showError(err.statusText, data.title + ' not deleted!');
        }
      );
    }

  }
  showSuccess(msg) {
    this.toastr.success(msg);
  }

  showError(msg, title) {
    this.toastr.error(msg, title);

  }
}
