import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {UsersService} from '../users.service';
import {ItemsService} from '../items.service';
import { AnimationOptions } from 'ngx-lottie';

library.add(faTimes);

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent implements OnInit, OnDestroy {
  total = 0;
  userName: string;
  address: string;
  options: AnimationOptions = {
    path: '/assets/animation.json',
    loop: true
  };
  private subscription;




  constructor(public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,  @Inject(MAT_DIALOG_DATA) public data: any,
              private usersSevice: UsersService, private itemsService: ItemsService) {}

  ngOnInit() {
    const ordArray = this.data.ordered;
    this.userName = this.usersSevice.getCurrentUser().name;
    this.subscription = this.itemsService.getBranchById(this.data.branch).subscribe(
      res => {
        this.address = res.address;
      }
    );
    for (const or of ordArray) {
      const subSum = or.price * or.sold;
      this.total += subSum;
    }

  }
  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
