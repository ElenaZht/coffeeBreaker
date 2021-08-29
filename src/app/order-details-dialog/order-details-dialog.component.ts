import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {UsersService} from '../users.service';
import {ItemsService} from '../items.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

library.add(faTimes);

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent implements OnInit {
  total = 0;
  userName: string;
  address: string;
  options: AnimationOptions = {
    path: '/assets/animation.json',
    loop: true
  };




  constructor(public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,  @Inject(MAT_DIALOG_DATA) public data: any,
              private usersSevice: UsersService, private itemsService: ItemsService) {
    console.log(data);
    const ordArray = this.data.ordered;
    this.userName = this.usersSevice.getCurrentUser().name;
    this.itemsService.getBranchById(data.branch).subscribe(
      res => {
        this.address = res.address;
      }
    );
    for (const or of ordArray) {
      console.log('item ', or);
      const subSum = or.price * or.sold;
      this.total += subSum;
    }

  }

  ngOnInit() {
  }
  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  close() {
    this.dialogRef.close();
  }

}
