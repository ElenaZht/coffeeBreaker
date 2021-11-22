import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter} from '@angular/cdk/drag-drop';
import {OrdersService, Statuses} from '../orders.service';
import {OrderDetailsComponent} from '../order-details/order-details.component';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {ChooseBranchDialogComponent} from '../choose-branch-dialog/choose-branch-dialog.component';
import {map} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

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
  sucMsg1: string;
  sucMsg2: string;

  constructor(private ordersService: OrdersService, public dialog: MatDialog,  private toastr: ToastrService, private  translator: TranslateService) {
    this.chooseBranch().subscribe(
      res => {
        if (res) {
          this.workBranch = res;
          this.ordersService.getTodaysOrders().subscribe(
            result => {

              if (res) {
                this.newOrders = result.filter(o => o.branch === this.workBranch);
                this.readyOrders = this.newOrders.filter(o => o.status === 2);
                this.processing = this.newOrders.filter(o => o.status === 1);
                this.newOrders = this.newOrders.filter(o => o.status === 0);
              }
            }
          );
        }
      }
    );

    this.translator.get('tray.order').subscribe(res => this.sucMsg1 = res);
    this.translator.get('confirm.mooved').subscribe(res => this.sucMsg2 = res);

  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.moveStatusNext(event.container.data[event.currentIndex]['id'], event.container.data[event.currentIndex]['status'] + 1);
    }
  }

  ngOnInit() {}
  done(item) {
    const index = this.readyOrders.indexOf(item);
    this.readyOrders.splice(index, 1);
  }

  details(i) {
    const dialogRef = this.dialog.open(OrderDetailsComponent, {panelClass: 'custom-dialog-container', height: '50vmin',
      width: '20vmax', data: i});
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
    this.toastr.success(  this.sucMsg1 + '  ' + id + ' ' +  this.sucMsg2 + Statuses[status] );
  }
}
