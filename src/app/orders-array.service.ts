import {Injectable} from '@angular/core';
import {CreditCard, Order, OrdersService} from './orders.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Item, SoldItem} from './items.service';
import {User, UsersService} from './users.service';
import {HttpClient} from '@angular/common/http';
import {environment} from './environments/environment';
import {delay, map} from 'rxjs/operators';
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
    const localStorageCart = localStorage.getItem('cart');
    if (localStorageCart && localStorageCart.length !== 0) {
      this.cart$.next(JSON.parse(localStorageCart));
    }
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.apiUrl}/api/orders`, order).pipe(map(
      res => {
        const allOrders = this.allOrders$.value;
        allOrders.push(res);
        this.allOrders$.next(allOrders);
        return res;
      }
      )
      );
  }

  getCart(): Observable<SoldItem[]> {
    return this.cart$.asObservable();
  }

  addToCart(item: Item): Observable<boolean> {
    const sItem: SoldItem = {...item, date: new Date(), sold: 1};
    this.cart = this.cart$.value;
    const oldItem = this.cart.find(i => sItem.prodId === i.prodId);
    if (oldItem) {
      const idx = this.cart.indexOf(oldItem);
      sItem.sold = oldItem.sold + sItem.sold;
      this.cart[idx] = sItem;
    } else {
      this.cart.push(sItem);
    }
    this.cart$.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    return of(true);
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
    return of(true).pipe(delay(5000));
  }

  saveCreditCard(card: CreditCard): Observable<boolean> {
    return of(true);
  }


  remFromCart(item: Item): Observable<boolean> {
    this.cart = this.cart$.value;
    const idx = this.cart.findIndex(i => i.prodId === item.prodId);
    this.cart.splice(idx, 1);
    this.cart$.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    return of(true);
  }

  cleanTheCart(): void {
    this.cart = [];
    this.cart$.next(this.cart);
    localStorage.setItem('cart', '');
  }

  getMyOrders(): Observable<Order[]> {
    const user = this.usersService.getCurrentUser();
    return this.allOrders$.pipe(map(or => or.filter(o => o.user === user.id)));
  }

  getTodaysOrders(): Observable<Order[]> {
    const today = new Date().toISOString().slice(0, 10);
    return this.allOrders$.pipe(map(or => or.filter(o => o.date.slice(0, 10) === today)));
  }

  changeOrderStatus(id, status): Observable<boolean> {
    return this.http.patch<Order>(`${environment.apiUrl}/api/orders/${id}`, {status}).pipe(map(
      res => {
        if (res) {
          const tempOrders = this.allOrders$.value;
          const curOrdInd = tempOrders.findIndex(o => o.id === id);
          tempOrders[curOrdInd] = res;
          this.allOrders$.next(tempOrders);
          return true;
        }
      }, err => {
        return false;
      }
    )

    );
  }
}
