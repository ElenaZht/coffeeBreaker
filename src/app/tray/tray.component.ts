import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Order, OrdersService, Statuses} from '../orders.service';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {User, UsersService} from '../users.service';
import {LoginComponentComponent} from '../login-component/login-component.component';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ChooseBranchDialogComponent} from '../choose-branch-dialog/choose-branch-dialog.component';
import {OrderDetailsDialogComponent} from '../order-details-dialog/order-details-dialog.component';
import {ItemsService} from '../items.service';



library.add(faTimes);

@Component({
  selector: 'app-tray',
  templateUrl: './tray.component.html',
  styleUrls: ['./tray.component.css']
})
export class TrayComponent implements OnInit, OnDestroy {
  myItems = [];
  order: Order;
  totalPerday: number;
  totalItems: number;
  titleWidthPermition = 20;
  user: User;
  isLogged: boolean;
  subscription;
  constructor(public dialog: MatDialog, private ordersService: OrdersService, private itemsService: ItemsService,
              private toastr: ToastrService, private spinner: NgxSpinnerService,
              private usersService: UsersService) {
    if (window.screen.width <= 500) {
      this.titleWidthPermition = 150;
      console.log('screen less 500');
    } else if (window.screen.width <= 1024) {
      this.titleWidthPermition = 10;
      console.log('screen less 1024');
    } else if (window.screen.width <= 1400) {
      this.titleWidthPermition = 15;
      console.log('screen less 1400');
    }
    this.ordersService.getCart().subscribe(
      res => {
        console.log('cart comes as ', res);
        this.myItems = res;
        console.log('my items are ', this.myItems);
      }
    );
    this.order = {id: undefined, ordered: [], status: undefined, branch: undefined, date: undefined, user: undefined};
  }

  ngOnInit() {
    this.CountTotal();
    this.CountItems();
    this.subscription = this.usersService.getUser().subscribe(user => {
      console.log('nav has user', user);
      if (user && user.token) {
        this.isLogged = true;
        this.user = user;
      } else {
        this.isLogged = false;
      }
    });

  }
  CountTotal() {
    this.totalPerday = this.myItems.reduce((sum, elem) => sum + elem.sold * elem.price, 0);
  }
  CountItems() {
    this.totalItems = this.myItems.reduce((sum, elem) => sum + elem.sold, 0);

  }
  Clear() {
    this.ordersService.cleanTheCart();
  }
  async Order(myItems) {
    if (this.totalItems !== 0) {
      try {
        const logginSuccess = await this.checkIsLogged().toPromise();
        const branchSuccess = await this.chooseBranch().toPromise();
        const payed = await this.payment().toPromise();
        this.order.date = new Date();
        this.order.branch = branchSuccess;
        this.order.status = Statuses.confirmed;
        this.order.ordered = myItems;
        this.order.user = this.user.id;
        if (logginSuccess && branchSuccess && payed) {
          this.spinner.show();
          const result = await this.ordersService.addOrder(this.order).toPromise();
          if (result) {
            this.spinner.hide();
            this.itemsService.SoldTheItem(myItems).subscribe(
              res => {
                if (res) {
                  return res;
                }
              }
            );
            console.log('my items from cart ', myItems);
            this.Clear();
            this.showOrderDetails(result);
          }

        }
      } catch (err) {
        this.spinner.hide();
        this.showError(err.statusText, 'Order not confirmed! Pleace, try again.');
        console.log(err);
      }
      }

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

    payment(): Observable<boolean> {
    return this.ordersService.goPayment(this.user);

    }

  checkIsLogged(): Observable<boolean> {
    if (!this.isLogged) {
      console.log('user not logged');
      const dialogRef = this.dialog.open(LoginComponentComponent, {panelClass: 'custom-dialog-container', height: '40vmin',
        width: '20vmax'});
      return dialogRef.afterClosed().pipe(map(
        res => {
          return res;
        }
      ));

    } else {
      return of(true);
    }
  }
  Decrease(i) {
    if (i.sold !== 0) {i.sold--;
                       this.CountTotal();
                       this.CountItems();
                       console.log('after decrease ', i);

    }
  }
  Increase(i) {
    i.sold++;
    this.CountTotal();
    this.CountItems();
    console.log('after increase ', i);
  }

  remFromCart(i: any) {
    if (confirm('Do you wont to remove ' + i.title + ' from the tray?')) {
      this.spinner.show();
      this.ordersService.remFromCart(i).subscribe(
        res => {
          this.spinner.hide();
          this.showSuccess(i.title + ' removed from the tray.');
          console.log(i.title + ' removed from cart');
        }
      );
    }

  }
  showSuccess(msg) {
    this.toastr.success(msg);
  }

  showError(msg, title) {
    this.toastr.error(msg, title);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  showOrderDetails(order) {
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {panelClass: 'custom-dialog-container', height: '50vmin',
      width: '60vmax', data: order});
    dialogRef.afterClosed().subscribe(
      res => console.log(res)
    );
  }
}
