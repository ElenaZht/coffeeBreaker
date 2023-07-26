import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Order, OrdersService, Statuses} from '../orders.service';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {User, UsersService} from '../users.service';
import {LoginComponentComponent} from '../login-component/login-component.component';
import {Observable, of, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {ChooseBranchDialogComponent} from '../choose-branch-dialog/choose-branch-dialog.component';
import {OrderDetailsDialogComponent} from '../order-details-dialog/order-details-dialog.component';
import {ItemsService} from '../items.service';
import {TranslateService} from '@ngx-translate/core';



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
  orderErr: string;
  remCartQ1: string;
  remCartQ2: string;
  remCartSuc: string;
  orderLogInFor: string;
  orderChooseBr: string;
  orderPay: string;
  private destroy$ = new Subject();
  constructor(public dialog: MatDialog, private ordersService: OrdersService, private itemsService: ItemsService,
              private toastr: ToastrService, private spinner: NgxSpinnerService,
              private usersService: UsersService, private  translator: TranslateService) {}

  ngOnInit() {
    if (window.screen.width <= 500) {
      this.titleWidthPermition = 150;
    } else if (window.screen.width <= 1024) {
      this.titleWidthPermition = 10;
    } else if (window.screen.width <= 1400) {
      this.titleWidthPermition = 15;
    }
    this.ordersService.getCart().pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        this.myItems = res;
      }
    );

    this.order = {id: undefined, ordered: [], status: undefined, branch: undefined, date: undefined, user: undefined};

    this.translator.get('confirm.ordnotconfirm').pipe(takeUntil(this.destroy$)).subscribe(res => this.orderErr = res);
    this.translator.get('confirm.suredel').pipe(takeUntil(this.destroy$)).subscribe(res => this.remCartQ1 = res);
    this.translator.get('confirm.fromtray').pipe(takeUntil(this.destroy$)).subscribe(res => this.remCartQ2 = res);
    this.translator.get('confirm.trayrem').pipe(takeUntil(this.destroy$)).subscribe(res => this.remCartSuc = res);
    this.translator.get('confirm.logformore').pipe(takeUntil(this.destroy$)).subscribe(res => this.orderLogInFor = res);
    this.translator.get('choosebranch.choose').subscribe(res => this.orderChooseBr = res);
    this.translator.get('confirm.pay').pipe(takeUntil(this.destroy$)).subscribe(res => this.orderPay = res);
    this.CountTotal();
    this.CountItems();
    this.usersService.getUser().pipe(takeUntil(this.destroy$)).subscribe(user => {
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
        if (logginSuccess) {
          const branchSuccess = await this.chooseBranch().toPromise();
          if (branchSuccess) {
            const payed = await this.payment().toPromise();
            if (payed) {
              this.order.date = new Date().toISOString();
              this.order.branch = branchSuccess;
              this.order.status = Statuses.confirmed;
              this.order.ordered = myItems;
              this.order.user = this.user.id;
              if (logginSuccess && branchSuccess && payed) {
                this.spinner.show();
                const result = await this.ordersService.addOrder(this.order).toPromise();
                if (result) {
                  this.spinner.hide();
                  this.itemsService.SoldTheItem(myItems).pipe(takeUntil(this.destroy$)).subscribe(
                    res => {
                      if (res) {
                        return res;
                      }
                    }
                  );
                  this.Clear();
                  this.showOrderDetails(result);
                }

              }
            } else {
              this.showError(this.orderErr, this.orderPay);
            }

          } else {
            this.showError(this.orderErr, this.orderChooseBr);
          }

        } else {
          this.showError(this.orderErr, this.orderLogInFor);
        }

      } catch (err) {
        this.spinner.hide();
        this.showError(err.statusText, this.orderErr);
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
      if (i.sold !== 0) {
        i.sold--;
        this.CountTotal();
        this.CountItems();

      }
    }
    Increase(i) {
      i.sold++;
      this.CountTotal();
      this.CountItems();
    }

    remFromCart(i: any) {
      if (confirm(this.remCartQ1 + ' ' + i.title + ' ' + this.remCartQ2)) {
        this.spinner.show();
        this.ordersService.remFromCart(i).pipe(takeUntil(this.destroy$)).subscribe(
          res => {
            this.spinner.hide();
            this.showSuccess(i.title + ' ' + this.remCartSuc);
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

    showOrderDetails(order) {
      const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {panelClass: 'custom-dialog-container', height: '55vmin',
        width: '60vmax', data: order});
    }
    ngOnDestroy(): void {
     this.destroy$.next();
     this.destroy$.complete();
    }
}
