import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-a-orders',
  templateUrl: './a-orders.component.html',
  styleUrls: ['./a-orders.component.css']
})
export class AOrdersComponent implements OnInit {
  newOrders = [{id: 1, prods: [{name: 'Cappuccino', img: '../../assets/coffee-cup.png', numb: 2}, {name: 'Cruasan', img: '../../assets/cruasan.png', numb: 2},
      {name: 'Twix', img: '../../assets/twix.png', numb: 1}]},
    {id: 2, prods: [{name: 'Cappuccino', img: '../../assets/coffee-cup.png', numb: 1}, {name: 'Tea', img: '../../assets/coffee-cup.png', numb: 1}]},
    {id: 3, prods: [{name: 'Latte', img: '../../assets/coffee-cup.png', numb: 1}]}];
  processing = [];
  readyOrders = [];
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  constructor() { }

  ngOnInit() {
  }
  done(item) {
    const index = this.readyOrders.indexOf(item);
    this.readyOrders.splice(index, 1);
    console.log('deleted: ', item);
  }
}
