import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ItemsService, SoldItem} from '../items.service';

@Component({
  selector: 'app-a-statistic',
  templateUrl: './a-statistic.component.html',
  styleUrls: ['./a-statistic.component.css']
})
export class AStatisticComponent implements OnInit {
  soldItems = [];
  itemPop: object;
  itemProf: object;
  totalPerday = 0;
  titleWidthPermition = 20;
  sortedItems = {};
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
        this.soldItems = this.soldItems.flat();

        console.log('sold items comes after getting ', this.soldItems);
        for (const item of this.soldItems) {
          if (item.prodId === 1024) {
            console.log('cruasan sold -----', item.sold, item);
          }
          if (this.sortedItems[item.prodId]) {
            this.sortedItems[item.prodId].sold += item.sold;
          } else {
            this.sortedItems[item.prodId] = Object.assign({}, item);
          }
        }
        console.log('sorted items after circle ', this.sortedItems);
        this.CountTotal();
        this.FindPopular();
        this.FindProfible();
      }
    );
  }

  ngOnInit() {
  }
  CountTotal() {
    for (const item of this.soldItems) {
      this.totalPerday += item.sold * item.price;
      console.log('sold ', item.sold, 'price ', item.price);

    }
    console.log('total per day ', this.totalPerday);
    return this.totalPerday;
  }
  FindPopular() {
    this.itemPop = this.soldItems[this.soldItems.reduce((iMax, x, i, arr) => x.sold > arr[iMax].sold ? i : iMax, 0)];
  }
  FindProfible() {
    // tslint:disable-next-line:max-line-length
    this.itemProf = this.soldItems[this.soldItems.reduce((iMax, x, i, arr) => x.sold * x.price > arr[iMax].sold * arr[iMax].price ? i : iMax, 0)];
  }

  goToItem(item) {
    const c = item.menuCategory;
    console.log('this item id is ', item.prodId, 'and category is ', item.menuCategory);
    this.router.navigate(['/menu_category', c], {queryParams: { itemId: item.prodId }});
  }
  sortingPerTotal(a, b) {
    return (a.value.sold * a.value.price) > (b.value.sold * b.value.price) ? -1 : 1;
  }

}
