import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {faChevronLeft, faHeartbeat, faListUl, faPlus, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {Router} from '@angular/router';
library.add(faPlus);
library.add(faShoppingCart);
library.add(faChevronLeft);
library.add(faHeartbeat);
library.add(faListUl);


@Component({
  selector: 'app-menu-item-dialog',
  templateUrl: './menu-item-dialog.component.html',
  styleUrls: ['./menu-item-dialog.component.css']
})
export class MenuItemDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MenuItemDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }
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
}
