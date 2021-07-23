import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

export interface Item {
  prodId: number;
  title: string;
  menuCategory: string;
  price: number;
  desc: string;
  img: string;
  ingredients: Ingredient[];
  nutr: string;
}
export interface SoldItem extends Item {
  sold: number;
  date: Date;
}
export interface Ingredient {
  ing: string;
  ingClass: string;
}
export interface MenuCategory {
  categoryName: string;
  text: string;
  products: Item[];
}
@Injectable({
  providedIn: 'root'
})
export abstract class ItemsService {
  abstract AddItem(item: Item): Observable<boolean>;
  abstract DeleteItem(item: Item): Observable<boolean>;
  abstract GetItem(): Observable<Item>;
  abstract GetSoldItems(): Observable<SoldItem[]>;
  abstract SoldTheItem(item: Item): boolean;
  abstract GetItemsByCategory(categoryName): Observable<Item[]>;
}
