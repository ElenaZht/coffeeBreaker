import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {faChevronLeft, faHeartbeat, faListUl, faShoppingCart, faTrashAlt, faPencilAlt, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {Router} from '@angular/router';
import {ItemsService, Item, Ingredient} from '../items.service';
import {UsersService} from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {NgForm} from '@angular/forms';
import {OrdersService} from '../orders.service';

library.add(faShoppingCart);
library.add(faChevronLeft);
library.add(faHeartbeat);
library.add(faListUl);
library.add(faTrashAlt);
library.add(faPencilAlt);
library.add(faTimes);
library.add(faTrash);


@Component({
  selector: 'app-menu-item-dialog',
  templateUrl: './menu-item-dialog.component.html',
  styleUrls: ['./menu-item-dialog.component.css']
})
export class MenuItemDialogComponent implements OnInit {

  isAdmine = false;
  isEdit  = false;
  nutrValue = {url: ''};
  visualValue = {url: ''};
  visualIng = {url: ''};
  selectedFileNutr: File = null;
  selectedFileIng: File = null;
  price: number;
  desc = '';
  title = '';
  x = true;
  ingNewName = '';
  ingredients: Ingredient[] = [{ing: 'No ingredients.', ingClass: ''}];
  addEngWindow = false;
  constructor(public dialogRef: MatDialogRef<MenuItemDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
              private itemService: ItemsService, private userService: UsersService, private toastr: ToastrService, private spinner: NgxSpinnerService,
              private ordersService: OrdersService) {
    if (this.userService.getCurrentUser() && this.userService.getCurrentUser().role === 0) {
      this.isAdmine = true;
    }
    this.nutrValue.url = data.nutr;
    this.visualValue.url = data.img;
    this.price = data.price;
    this.desc = data.desc;
    this.title = data.title;
    this.ingredients = data.ingredients;
  }
  ings = false;
  nutrs = false;
  ngOnInit() {
  }

  goBack(item) {
    this.dialogRef.close(item);
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
  goEdit() {
    this.isEdit = !this.isEdit;
  }
  onSelectFile(event: any, thisSelectedFile, photoValue) {
    console.log('photoVAlue is ', typeof photoValue);
    thisSelectedFile = event.target.files[0] as File;
    console.log('photo before  is ', thisSelectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(thisSelectedFile);
    reader.onload = (_) => {
      photoValue.url = reader.result.toString();
      console.log('photo after is ', photoValue);
    };
  }
  showAddEngWindow() {
    this.addEngWindow  = !this.addEngWindow;
  }

  delete(data: Item) {
    this.spinner.show();
    if (confirm('Are you sure to delete ' + data.title + '?')) {
      this.itemService.DeleteItem(data).subscribe(
        res => {
          this.spinner.hide();
          this.showSuccess(data.title + ' was deleted successfuly!');
          this.goBack(data);
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

  undo() {
    this.price = this.data.price;
    this.title = this.data.title;
    this.desc = this.data.desc;
    this.visualValue.url = this.data.img;
    this.nutrValue.url = this.data.nutr;
    this.ingredients = this.data.ingredients;
  }

  remIng(i: Ingredient) {
    if (confirm('Do you wont to delete ' + i.ing.toLowerCase() + ' from recipe?')) {
      const idx = this.ingredients.indexOf(i);
      this.ingredients.splice(idx, 1);
      console.log('ingedients length ', this.ingredients.length);
    }
    if (this.ingredients.length === 0) {
      this.ingredients = [{ing: 'No ingredients.', ingClass: ''}];
      this.x = false;
    }
  }

  remNewIng() {
    this.visualIng = {url: ''};
    this.ingNewName = '';
  }

  addNewIng() {
    if (this.ingNewName) {
      const ingred = {ing: this.ingNewName, ingClass: this.visualIng.url};
      console.log('ingred after form ', ingred);
      this.ingredients.push(ingred);
      this.visualIng = {url: ''};
      this.ingNewName = '';
    }

  }

  onSubmit(itemForm: NgForm) {
    this.spinner.show();
    const item = itemForm.value as Item;
    item.prodId = this.data.prodId;
    item.menuCategory = this.data.menuCategory;
    item.img = this.visualValue.url;
    item.ingredients = this.ingredients;
    item.nutr = this.nutrValue.url;
    console.log('item from form ', item);
    this.itemService.EditItem(item).subscribe(
      res => {
        this.spinner.hide();
        this.showSuccess(item.title + ' was edited successfuly!');
        this.nutrValue.url = res.nutr;
        this.visualValue.url = res.img;
        this.price = res.price;
        this.desc = res.desc;
        this.title = res.title;
        this.ingredients = res.ingredients;
      }, err => {
        this.spinner.hide();
        this.showError(err.statusText, item.title + ' was not edited!');
      }
    );
  }

  addToTray(data) {
    this.spinner.show();
    this.ordersService.addToCart(data).subscribe(
      res => {
        this.spinner.hide();
        console.log(data.title + ' added to cart');
        this.dialogRef.close();
        this.showSuccess(data.title + ' added to your tray!');
      }, err => {
        this.spinner.hide();
        console.log('error ', err.statusText);
      }
    );
  }
}
