import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {OrdersService} from '../orders.service';
import {ItemsService} from '../items.service';
library.add(faChevronLeft);


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  isAdmin = false;
  myOrders = [];
  branchesIdToAddressMap = {};

  constructor(private router: Router, private ordersService: OrdersService, private itemsService: ItemsService) {
    this.ordersService.getMyOrders().subscribe(
      res => {
        this.myOrders = res;
        for (const order of this.myOrders) {
          this.branchesIdToAddressMap[order.branch] = 'Branch no more exist';
        }
        for (const branchId in this.branchesIdToAddressMap) {
          // tslint:disable-next-line:radix
            this.itemsService.getBranchById(parseInt(branchId)).subscribe(
              res => {
                if (res) {
                  this.branchesIdToAddressMap[branchId] = res.address;
                }
              }
            );

        }
      }
    );

  }

  ngOnInit() {

  }
}
