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
import {TranslateService} from '@ngx-translate/core';

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
  delQ: string;
  delSuc: string;
  delErr: string;
  remIngQ1: string;
  remIngQ2: string;
  subSuc: string;
  subErr: string;
  addSuc: string;
  constructor(public dialogRef: MatDialogRef<MenuItemDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
              private itemService: ItemsService, private userService: UsersService, private toastr: ToastrService, private spinner: NgxSpinnerService,
              private ordersService: OrdersService, private  translator: TranslateService) {
    if (this.userService.getCurrentUser() && this.userService.getCurrentUser().role === 0) {
      this.isAdmine = true;
    }
    this.nutrValue.url = data.nutr;
    this.visualValue.url = data.img;
    this.price = data.price;
    this.desc = data.desc;
    this.title = data.title;
    this.ingredients = data.ingredients;

    this.translator.get('confirm.suredel').subscribe(res => this.delQ = res);
    this.translator.get('confirm.delsuc').subscribe(res => this.delSuc = res);
    this.translator.get('confirm.notdel').subscribe(res => this.delErr = res);
    this.translator.get('confirm.suredel').subscribe(res => this.remIngQ1 = res);
    this.translator.get('confirm.fromrecipe').subscribe(res => this.remIngQ2 = res);
    this.translator.get('confirm.editsuc').subscribe(res => this.subSuc = res);
    this.translator.get('confirm.notedited').subscribe(res => this.subErr = res);
    this.translator.get('confirm.addedtotray').subscribe(res => this.addSuc = res);

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
    thisSelectedFile = event.target.files[0] as File;
    const reader = new FileReader();
    reader.readAsDataURL(thisSelectedFile);
    reader.onload = (_) => {
      photoValue.url = reader.result.toString();
    };
  }
  showAddEngWindow() {
    this.addEngWindow  = !this.addEngWindow;
  }

  delete(data: Item) {
    this.spinner.show();
    if (confirm(this.delQ + ' ' + data.title + '?')) {
      this.itemService.DeleteItem(data).subscribe(
        res => {
          this.spinner.hide();
          this.showSuccess(data.title + ' ' + this.delSuc);
          this.goBack(data);
        }, err => {
          this.spinner.hide();
          this.showError(err.statusText, data.title + ' ' + this.delErr);
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
    if (confirm(this.remIngQ1 + ' ' + i.ing.toLowerCase() + ' ' + this.remIngQ2)) {
      const idx = this.ingredients.indexOf(i);
      this.ingredients.splice(idx, 1);
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
    this.itemService.EditItem(item).subscribe(
      res => {
        this.spinner.hide();
        this.showSuccess(item.title + ' ' + this.subSuc);
        this.nutrValue.url = res.nutr;
        this.visualValue.url = res.img;
        this.price = res.price;
        this.desc = res.desc;
        this.title = res.title;
        this.ingredients = res.ingredients;
      }, err => {
        this.spinner.hide();
        this.showError(err.statusText, item.title + ' ' + this.subErr);
      }
    );
  }

  addToTray(data) {
    this.spinner.show();
    this.ordersService.addToCart(data).subscribe(
      res => {
        this.spinner.hide();
        this.showSuccess(data.title + ' ' + this.addSuc);
      }, err => {
        this.spinner.hide();
      }
    );
  }
}
