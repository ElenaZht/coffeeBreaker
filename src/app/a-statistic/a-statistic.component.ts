import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-a-statistic',
  templateUrl: './a-statistic.component.html',
  styleUrls: ['./a-statistic.component.css']
})
export class AStatisticComponent implements OnInit {
  soldItems = [
    {itemTitle: 'Capuchino', price: 13, sold: 19, img: '../../assets/coffee-cup.png'},
    {itemTitle: 'Latte', price: 15, sold: 18, img: '../../assets/coffee-cup.png'},
    {itemTitle: 'Latte Maciata', price: 17, sold: 15, img: '../../assets/coffee-cup.png'},
    {itemTitle: 'Tea green with lemon, menta and herbs', price: 10, sold: 100, img: '../../assets/coffee-cup.png'},
    {itemTitle: 'Donut Choco', price: 8, sold: 10, img: '../../assets/donut.jpg'},
    {itemTitle: 'Shake apple and honey', price: 15, sold: 9, img: '../../assets/juice-cup.jpg'},
    {itemTitle: 'Shake orange and menta', price: 15, sold: 3, img: '../../assets/juice-cup.jpg'},
    {itemTitle: 'Cupcake vanilla', price: 13, sold: 2, img: '../../assets/cupcake.png'},
    {itemTitle: 'Sandwich with cheece', price: 18, sold: 1, img: '../../assets/sandwich.jpg'}
  ];
  itemPop: object;
  itemProf: object;
  totalPerday: number;
  titleWidthPermition = 20;
  constructor(private router: Router) {
    if (window.screen.width <= 500) {
      this.titleWidthPermition = 7;
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
    this.FindPopular();
    this.FindProfible();
  }
  CountTotal() {
    this.totalPerday = this.soldItems.reduce((sum, elem) => sum + elem.sold * elem.price, 0);
  }
  FindPopular() {
    this.itemPop = this.soldItems[this.soldItems.reduce((iMax, x, i, arr) => x.sold > arr[iMax].sold ? i : iMax, 0)];
  }
  FindProfible() {
    this.itemProf = this.soldItems[this.soldItems.reduce((iMax, x, i, arr) => x.sold * x.price > arr[iMax].sold * arr[iMax].price ? i : iMax, 0)];
  }

  goToItem(item) {
    const c = item.menuCategory;
    this.router.navigate(['/menu_category', c], {queryParams: { itemId: item.prodId }});
  }
}
