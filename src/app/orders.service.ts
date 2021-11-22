import { Injectable } from '@angular/core';
import {Item, SoldItem} from './items.service';
import {Observable} from 'rxjs';
import {User} from './users.service';


export enum Statuses {
  confirmed,
  processing,
  ready
}
export interface OrderedItem {
  prodId: number;
  count: number;
}
export interface Order {
  id: number;
  date: string;
  branch: number;
  user: number;
  status: Statuses;
  ordered: OrderedItem[];
}
export interface CreditCard {
  userId: number;
  cardNumber: number;
  estDate: string;
  cvv: number;
  lastNumber: number;
  payMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export abstract class OrdersService {
  abstract addToCart(item: Item): Observable<boolean>;
  abstract remFromCart(item: Item): Observable<boolean>;
  abstract cleanTheCart(): void;
  abstract getCart(): Observable<SoldItem[]>;
  abstract getMyOrders(): Observable<Order[]>;
  abstract saveCreditCard(card: CreditCard): Observable<boolean>;
  abstract mockCardChecking(): Observable<boolean>;
  abstract addOrder(order: Order): Observable<Order>;
  abstract goPayment(user: User): Observable<boolean>;
  abstract getTodaysOrders(): Observable<Order[]>;
  abstract changeOrderStatus(id, newStatus): Observable<boolean>;
}
