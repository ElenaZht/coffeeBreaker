import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter} from '@angular/cdk/drag-drop';
import {OrdersService, Statuses} from '../orders.service';
import {OrderDetailsComponent} from '../order-details/order-details.component';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {ChooseBranchDialogComponent} from '../choose-branch-dialog/choose-branch-dialog.component';
import {map} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-a-orders',
  templateUrl: './a-orders.component.html',
  styleUrls: ['./a-orders.component.css']
})
export class AOrdersComponent implements OnInit {
  newOrders = [];
  processing = [];
  readyOrders = [];
  workBranch;

  constructor(private ordersService: OrdersService, public dialog: MatDialog,  private toastr: ToastrService) {
    this.chooseBranch().subscribe(
      res => {
        if (res) {
          this.workBranch = res;
          this.ordersService.getTodaysOrders().subscribe(
            result => {

              if (res) {
                this.newOrders = result.filter(o => o.branch === this.workBranch);
                console.log('new orders on branch ---', this.newOrders);
                this.newOrders = this.newOrders.filter(o => o.date.slice(0, 10) === new Date().toISOString().slice(0, 10));
                console.log('new orders for TODAY-->', this.newOrders);
                this.readyOrders = this.newOrders.filter(o => o.status === 2);
                console.log('ready orders ---', this.readyOrders);
                this.processing = this.newOrders.filter(o => o.status === 1);
                console.log('processing orders ---', this.processing);
                this.newOrders = this.newOrders.filter(o => o.status === 0);
                console.log('new orders -->', this.newOrders);
              }
            }
          );
        }
      }
    );

  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log('container data', event.container.data);
      this.moveStatusNext(event.container.data[event.currentIndex]['id'], event.container.data[event.currentIndex]['status'] + 1);
      console.log('move status func call, id and status are ---', event.container.data[event.currentIndex]['id'], event.container.data[event.currentIndex]['status']);
    }
    console.log('drop ', event);
  }

  ngOnInit() {}
  done(item) {
    const index = this.readyOrders.indexOf(item);
    this.readyOrders.splice(index, 1);
    console.log('deleted: ', item);
  }

  details(i) {
    const dialogRef = this.dialog.open(OrderDetailsComponent, {panelClass: 'custom-dialog-container', height: '50vmin',
      width: '20vmax', data: i});
    dialogRef.afterClosed().subscribe(
      res => console.log(res)
    );
  }
  chooseBranch(): Observable<number> {
    const dialogRef = this.dialog.open(ChooseBranchDialogComponent, {panelClass: 'custom-dialog-container', height: '40vmax',
      width: '30vmax'});
    return dialogRef.afterClosed().pipe(map(
      res => {
        return res;
      }
      )
    );
  }
  moveStatusNext(id, status) {
    console.log('move status func new status ', status);
    if (status > 2) {
      return;
    }
    this.ordersService.changeOrderStatus(id, status).subscribe(
        res => {
          if (res) {
            this.showSuccess(id, status);
          }
        }
      );

  }
  showSuccess(id, status) {
    this.toastr.success('Order ' + id + ' moved to ' + Statuses[status] );
    console.log('status ', Statuses[status]);
  }
}
