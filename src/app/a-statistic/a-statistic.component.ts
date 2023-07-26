import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OrdersService} from '../orders.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-a-statistic',
  templateUrl: './a-statistic.component.html',
  styleUrls: ['./a-statistic.component.css']
})
export class AStatisticComponent implements OnInit, OnDestroy {
  soldOrders = [];
  soldItems = [];
  itemPop: object;
  itemProf: object;
  totalPerday = 0;
  titleWidthPermition = 20;
  sortedItems = {};
  private destroy$ = new Subject();
  constructor(private router: Router, private ordersServise: OrdersService) {}

  ngOnInit() {
    if (window.screen.width <= 500) {
      this.titleWidthPermition = 7;
    } else if (window.screen.width <= 1024) {
      this.titleWidthPermition = 10;
    } else if (window.screen.width <= 1400) {
      this.titleWidthPermition = 15;
    }
    this.ordersServise.getTodaysOrders().pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        this.soldOrders = res;
        for (const ord of this.soldOrders) {
          this.soldItems.push(...ord.ordered);

        }

        for (const item of this.soldItems) {
          if (this.sortedItems[item.prodId]) {
            this.sortedItems[item.prodId].sold += item.sold;
          } else {
            this.sortedItems[item.prodId] = Object.assign({}, item);
          }
        }
        this.CountTotal();
        this.FindPopular();
        this.FindProfible();
      }
    );
  }
  CountTotal() {
    for (const item of this.soldItems) {
      this.totalPerday += item.sold * item.price;

    }
    return this.totalPerday;
  }
  FindPopular() {
    this.itemPop = this.soldItems[this.soldItems.reduce((iMax, x, i, arr) => x.sold > arr[iMax].sold ? i : iMax, 0)];
  }
  FindProfible() {
    this.itemProf = this.soldItems[this.soldItems.reduce((iMax, x, i, arr) => x.sold * x.price > arr[iMax].sold *
    arr[iMax].price ? i : iMax, 0)];
  }

  goToItem(item) {
    const c = item.menuCategory;
    this.router.navigate(['/menu_category', c], {queryParams: { itemId: item.prodId }});
  }
  sortingPerTotal(a, b) {
    return (a.value.sold * a.value.price) > (b.value.sold * b.value.price) ? -1 : 1;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
