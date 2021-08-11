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
  id: number;
  categoryName: string;
  text: string;
  products: Item[];
}
export interface CommonCategory {
  name: string;
  price: string;
  pic_class: string;
  splash_class: string;
}
export interface Contacts {
  instagram?: string;
  facebook?: string;
  email?: string;
  phone1?: string;
  phone2?: string;
  phone3?: string;
  address?: string;
}
export interface Branch {
  id: number;
  address: string;
  desc: string;
  photo: string;
  popular?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export abstract class ItemsService {
  abstract AddItem(item: Item, category: string): Observable<Item>;
  abstract EditItem(item: Item): Observable<Item>;
  abstract DeleteItem(item: Item): Observable<boolean>;
  abstract GetItem(): Observable<Item>;
  abstract GetAllTheItems(): Observable<MenuCategory[]>;
  abstract GetSoldItems(): Observable<SoldItem[]>;
  abstract SoldTheItem(item: Item): boolean;
  abstract GetItemsByCategory(categoryName): Observable<Item[]>;
  abstract GetContacts(): Observable<Contacts>;
  abstract EditContacts(instagram: string, facebook: string, email: string, phone1: string, phone2: string, phone3: string, address: string): Observable<Contacts>;
  abstract GetBranches(): Observable<Branch[]>;
  abstract DeleteBranch(branch: Branch): Observable<boolean>;
  abstract AddNewBranch(branch: Branch): Observable<boolean>;
  abstract EditBranch(branch: Branch): Observable<Branch>;
  abstract ChangeBranchStatus(branch: Branch, newStatus): Observable<boolean>;
  abstract GetCommonCategories(): Observable<CommonCategory[]>;


}
