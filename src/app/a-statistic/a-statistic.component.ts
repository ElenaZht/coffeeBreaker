import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ItemsService, SoldItem} from '../items.service';

@Component({
  selector: 'app-a-statistic',
  templateUrl: './a-statistic.component.html',
  styleUrls: ['./a-statistic.component.css']
})
export class AStatisticComponent implements OnInit {
  soldItems: SoldItem[] = [];
  itemPop: object;
  itemProf: object;
  totalPerday: number;
  titleWidthPermition = 20;
  constructor(private router: Router, private itemServise: ItemsService) {
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
    this.itemServise.GetSoldItems().subscribe(
      res => {
        this.soldItems = res;
        console.log('statistics get sold items');
      }
    );
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
    console.log('this item id is ', item.prodId, 'and category is ', item.menuCategory);
    this.router.navigate(['/menu_category', c], {queryParams: { itemId: item.prodId }});
  }
}
