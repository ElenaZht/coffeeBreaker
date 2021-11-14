import {Component, Inject, OnInit} from '@angular/core';
import {Ingredient, Item, ItemsService} from '../items.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgForm} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css']
})
export class AddNewItemComponent implements OnInit {
  nutrValue = {url: ''};
  visualValue = {url: ''};
  visualIng = {url: ''};
  price: number;
  desc = '';
  title = '';
  ingredients: Ingredient[] = [];
  selectedFileNutr: File = null;
  selectedFileIng: File = null;
  ingNewName = '';
  addEngWindow = false;
  ings = false;
  nutrs = false;
  remIngQ1: string;
  remIngQ2: string;
  addItemSuc: string;
  addItemErr: string;

  constructor(public dialogRef: MatDialogRef<AddNewItemComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
              private itemService: ItemsService, private toastr: ToastrService, private spinner: NgxSpinnerService, private  translator: TranslateService) {

    this.nutrValue.url = '../../assets/nutrition_icon.png';
    this.visualValue.url = '../../assets/coffee_icon.png';
    this.price = null;
    this.desc = '';
    this.title = '';
    this.ingredients = [{ing: '', ingClass: ''}];

    this.translator.get('confirm.suredel').subscribe(res => this.remIngQ1 = res);
    this.translator.get('confirm.fromrecipe').subscribe(res => this.remIngQ2 = res);
    this.translator.get('confirm.editsuc').subscribe(res => this.addItemSuc = res);
    this.translator.get('confirm.notedited').subscribe(res => this.addItemErr = res);

  }

  ngOnInit() {
  }
  undo() {
    this.price = null;
    this.title = '';
    this.desc = '';
    this.visualValue.url = '../../assets/coffee_icon.png';
    this.nutrValue.url = '../../assets/nutrition_icon.png';
    this.ingredients = [{ing: '', ingClass: ''}];
    this.addEngWindow = false;
  }
  remIng(i: Ingredient) {
    if (confirm(this.remIngQ1 + ' ' + i.ing.toLowerCase() + ' ' + this.remIngQ2)) {
      const idx = this.ingredients.indexOf(i);
      this.ingredients.splice(idx, 1);
      console.log('ingedients length ', this.ingredients.length);
    }
    if (!this.ingredients.length) {
      this.ingredients = [{ing: '', ingClass: ''}];
    }
  }

  remNewIng() {
    this.visualIng = {url: ''};
    this.ingNewName = '';
  }

  addNewIng() {
    if (!this.ingredients[0].ing.length) {
      console.log('removing empty component from array before putting the new one..');
      this.ingredients = [];
    }
    if (this.ingNewName) {
      const ingred = {ing: this.ingNewName, ingClass: this.visualIng.url};
      console.log('ingred after form ', ingred);
      this.ingredients.push(ingred);
      this.visualIng = {url: ''};
      this.ingNewName = '';
    }

  }
  showSuccess(msg) {
    this.toastr.success(msg);
  }

  showError(msg, title) {
    this.toastr.error(msg, title);

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

  addItem(itemForm: NgForm) {
    this.spinner.show();
    const item = itemForm.value as Item;
    item.menuCategory = this.data.category.categoryName;
    item.img = this.visualValue.url;
    item.ingredients = this.ingredients;
    item.nutr = this.nutrValue.url;
    console.log('item from form ', item);
    this.itemService.AddItem(item, item.menuCategory).subscribe(
      res => {
        this.spinner.hide();
        this.showSuccess(item.title + ' ' + this.addItemSuc);
        this.nutrValue.url = res.nutr;
        this.visualValue.url = res.img;
        this.price = res.price;
        this.desc = res.desc;
        this.title = res.title;
        this.ingredients = res.ingredients;
        this.dialogRef.close();
      }, err => {
        this.spinner.hide();
        this.showError(err.statusText, item.title + ' ' + this.addItemErr);
      }
    );
  }

  goBack() {
    this.dialogRef.close();
  }

  goIngs() {
    this.ings = !this.ings;
  }

  goNutrs() {
    this.nutrs = !this.nutrs;
  }
}
