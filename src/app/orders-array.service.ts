import {Injectable} from '@angular/core';
import {CreditCard, Order, OrdersService} from './orders.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Item, SoldItem} from './items.service';
import {User, UsersService} from './users.service';
import {HttpClient} from '@angular/common/http';
import {environment} from './environments/environment';
import {delay, map, filter} from 'rxjs/operators';
import {PayformDialogComponent} from './payform-dialog/payform-dialog.component';
import {MatDialog} from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class OrdersArrayService implements OrdersService {
  cart: SoldItem[] = [];
  cart$ = new BehaviorSubject<SoldItem[]>([]);
  allOrders$ = new BehaviorSubject<Order[]>([]);




  constructor(private http: HttpClient, private dialog: MatDialog, private usersService: UsersService) {
    this.http.get<Order[]>(`${environment.apiUrl}/api/orders`).subscribe(
      res => {
        this.allOrders$.next(res);
      }
    );
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.apiUrl}/api/orders`, order).pipe(map(
      res => {
        console.log('order come backs from server ', res);
        const allOrders = this.allOrders$.value;
        allOrders.push(res);
        this.allOrders$.next(allOrders);
        return res;
      }
      )
      );
  }

  addOrderToUserOrders(order: Order): boolean {
    return false;
  }
  getCart(): Observable<SoldItem[]> {
    return this.cart$.asObservable();
  }

  addToCart(item: Item): Observable<boolean> {
    const sItem: SoldItem = {...item, date: new Date(), sold: 1};
    console.log(sItem);
    this.cart = this.cart$.value;
    const oldItem = this.cart.find(i => sItem.prodId === i.prodId);
    if (oldItem) {
      console.log('FOUND ITEM ', oldItem);
      console.log('sItems old count', sItem.sold);
      const idx = this.cart.indexOf(oldItem);
      sItem.sold = oldItem.sold + sItem.sold;
      console.log('new sItems sold count ', sItem.sold);
      this.cart[idx] = sItem;
      console.log('and now old items count is ', this.cart[idx].sold);
      this.cart$.next(this.cart);
      console.log('and now cart is ', this.cart);
      return of(true);
    }
    console.log('NO DOUBLE ITEMS FOUND');
    this.cart.push(sItem);
    this.cart$.next(this.cart);
    console.log('and now cart is ', this.cart);
    return of(true);
  }

  addToSold(order: Order): boolean {
    return false;
  }

  goPayment(user: User): Observable<boolean> {
    const dialogRef = this.dialog.open(PayformDialogComponent, {panelClass: 'custom-dialog-container', height: '25vmax',
      width: '25vmax'});
    return dialogRef.afterClosed().pipe(map(
      res => {
          return res;
      }
    ));

  }

  mockCardChecking(): Observable<boolean> {
    const obs = of(true).pipe(delay(5000));
    return obs;
  }

  saveCreditCard(card: CreditCard): Observable<boolean> {
    return of(true);
  }

  showToUserStatus(order: Order): boolean {
    return false;
  }

  remFromCart(item: Item): Observable<boolean> {
    this.cart = this.cart$.value;
    const idx = this.cart.findIndex(i => i.prodId === item.prodId);
    this.cart.splice(idx, 1);
    this.cart$.next(this.cart);

    return of(true);
  }

  cleanTheCart(): void {
    this.cart = [];
    this.cart$.next(this.cart);
  }

  getMyOrders(): Observable<Order[]> {
    const user = this.usersService.getCurrentUser();
    return this.allOrders$.pipe(map(or => or.filter(o => o.user === user.id)));
  }

  getTodaysOrders(): Observable<Order[]> {
    return this.allOrders$;
    // return this.allOrders$.pipe(map(or => or.filter(o => o.date === new Date())));
  }

  changeOrderStatus(id, status): Observable<boolean> {
    return this.http.patch<Order>(`${environment.apiUrl}/api/orders/${id}`, {status}).pipe(map(
      res => {
        if (res) {
          const tempOrders = this.allOrders$.value;
          const curOrdInd = tempOrders.findIndex(o => o.id === id);
          tempOrders[curOrdInd] = res;
          this.allOrders$.next(tempOrders);
          console.log('order status changed to ', res.status);
          return true;
        }
      }, err => {
        console.log('order status not changed', err.statusText);
        return false;
      }
    )

    );
  }
}
