import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {PayformDialogComponent} from '../payform-dialog/payform-dialog.component';

@Component({
  selector: 'app-tray',
  templateUrl: './tray.component.html',
  styleUrls: ['./tray.component.css']
})
export class TrayComponent implements OnInit {
  myItems = [
    {itemTitle: 'Latte', price: 15, sold: 2, img: '../../assets/coffee-cup.png'},
    {itemTitle: 'Shake apple and honey', price: 15, sold: 1, img: '../../assets/juice-cup.jpg'},
    {itemTitle: 'Cupcake vanilla', price: 13, sold: 2, img: '../../assets/cupcake.png'},
    {itemTitle: 'Sandwich with cheece', price: 18, sold: 4, img: '../../assets/sandwich.jpg'}
  ];
  totalPerday: number;
  totalItems: number;
  titleWidthPermition = 20;
  constructor(public dialog: MatDialog) {
    if (window.screen.width <= 500) {
      this.titleWidthPermition = 150;
      console.log('screen less 500');
    } else if (window.screen.width <= 1024) {
      this.titleWidthPermition = 10;
      console.log('screen less 1024');
    } else if (window.screen.width <= 1400) {
      this.titleWidthPermition = 15;
      console.log('screen less 1400');
    }
  }

  ngOnInit() {
    this.CountTotal();
    this.CountItems();

  }
  CountTotal() {
    this.totalPerday = this.myItems.reduce((sum, elem) => sum + elem.sold * elem.price, 0);
  }
  CountItems() {
    this.totalItems = this.myItems.reduce((sum, elem) => sum + elem.sold, 0);

  }
  Clear() {
    this.myItems = [];
  }

  Order() {
    if (this.totalItems !== 0) {
      const dialogRef = this.dialog.open(PayformDialogComponent, {panelClass: 'custom-dialog-container', height: '25vmax',
        width: '25vmax'});
      dialogRef.afterClosed().subscribe(result => {
        console.log('The lang dialog was closed', result);
      });
    }
  }
  Decrease(i) {
    if (i.sold !== 0) {i.sold--;
                       this.CountTotal();
                       this.CountItems();
    }
  }
  Increase(i) {
    i.sold++;
    this.CountTotal();
    this.CountItems();
  }

}
