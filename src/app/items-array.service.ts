import {Injectable} from '@angular/core';
import {Branch, CommonCategory, Contacts, Item, ItemsService, MenuCategory, SoldItem} from './items.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from './environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ItemsArrayService implements ItemsService {
  contacts: Contacts;
  branches$ = new BehaviorSubject<Branch[]>([]);
  items$ = new BehaviorSubject<MenuCategory[]>([]);
  items;
  constructor(private http: HttpClient) {
    this.GetContacts().subscribe(
      res => {
        this.contacts = res;
      }
    );

    this.http.get<Branch[]>(`${environment.apiUrl}/api/branches`).subscribe(
      res => {
        this.branches$.next(Object.assign([], res));
      }
    );
    this.http.get<[]>(`${environment.apiUrl}/api/items`).subscribe(
      res => {
        this.items$.next(Object.assign([], res));
      }
    );
  }

  AddItem(item: Item, categoryName: string): Observable<Item> {
    this.items = this.items$.value;
    const category = this.items.find(c => c.categoryName === categoryName);
    category.products.push(item);
    return this.http.put<Item>(`${environment.apiUrl}/api/items/${category.id}`, category);
  }

  DeleteItem(item: Item): Observable<boolean> {
    this.items = this.items$.value;
    const category: MenuCategory = this.items.find(c =>  item.menuCategory === c.categoryName);
    const itIndx = category.products.findIndex(i => (i.prodId) === (item.prodId));
    category.products.splice(itIndx, 1);
    return this.http.put<MenuCategory>(`${environment.apiUrl}/api/items/${category.id}`, category).pipe(map(
      res => {
        if (res) {
          this.items$.next(this.items);
          return true;
        }
      }
    ));
  }

  EditItem(item: Item): Observable<Item> {
    this.items = this.items$.value;
    const category: MenuCategory = this.items.find(c =>  item.menuCategory === c.categoryName);
    const idx = category.products.findIndex(i => i.prodId === item.prodId);
    category.products[idx] = item;
    return this.http.put<MenuCategory>(`${environment.apiUrl}/api/items/${category.id}`, category).pipe(map(
      res => {
        if (res) {
          this.items$.next(this.items);
          return item;
        }
      }
    ));
  }


  GetContacts(): Observable<Contacts> {
    return this.http.get<Contacts>(`${environment.apiUrl}/api/contacts/0`);
  }

  EditContacts(instagram, facebook, email, phone1, phone2, phone3, address): Observable<Contacts> {
    return this.http.patch<Contacts>(`${environment.apiUrl}/api/contacts/0`, {instagram, facebook, email, phone1, phone2, phone3, address}).pipe(map( res => {
        if (res) {
          this.contacts.instagram = res.instagram;
          this.contacts.facebook = res.facebook;
          this.contacts.email = res.email;
          this.contacts.phone1 = res.phone1;
          this.contacts.phone2 = res.phone2;
          this.contacts.phone3 = res.phone3;
          this.contacts.address = res.address;
        }
        return res;
      }, err => {
        console.error('error from server', err);
      }
    ));
  }

  DeleteBranch(branch): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/api/branches/${branch.id}`).pipe(map(
      res => {
        const branches = this.branches$.value;
        const brIndx = branches.findIndex(b => b.id === branch.id);
        branches.splice(brIndx, 1);
        this.branches$.next(branches);
        return true;
      }, err => {
        return false;
      }
    ));
  }

  GetBranches(): Observable<Branch[]> {
    return this.branches$.asObservable();
  }

  EditBranch(branch): Observable<Branch> {
    return this.http.patch<Branch>(`${environment.apiUrl}/api/branches/${branch.id}`, {address: branch.address, desc: branch.desc, photo: branch.photo}).pipe(map(
      res => {
        const branches = this.branches$.value;
        const brIndx = branches.findIndex(b => b.id === branch.id);
        branches[brIndx] = res;
        this.branches$.next(branches);
        return branch;
      }
    ));
  }

  ChangeBranchStatus(branch: Branch, newStatus: boolean): Observable<boolean> {
    return this.http.patch<boolean>(`${environment.apiUrl}/api/branches/${branch.id}`, {popular: newStatus}).pipe(map(
      res => {
        const branches = this.branches$.value;
        const brIndx = branches.findIndex(b => b.id === branch.id);
        if (!branch.popular) {
          branch.popular = true;
          this.branches$.next(branches);
          return true;
        }
        branches[brIndx].popular = !branches[brIndx].popular;
        this.branches$.next(branches);
        return true;
      }
    ));
  }

  AddNewBranch(newBranch: Branch): Observable<boolean> {
    return this.http.post<Branch>(`${environment.apiUrl}/api/branches`, newBranch).pipe(map(
      res => {
        const branches = this.branches$.value;
        branches.push(res);
        this.branches$.next(branches);
        return true;
      }, err => {
        return err;
      }
  ));
  }

  GetCommonCategories(): Observable<CommonCategory[]> {
    return this.http.get<CommonCategory[]>(`${environment.apiUrl}/api/common_categories`);
  }

  GetAllTheItems(): Observable<MenuCategory[]> {
    return this.items$.asObservable();
  }

  getBranchById(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${environment.apiUrl}/api/branches/${id}`);
  }

  GetPromoItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${environment.apiUrl}/api/promoItems`);
  }
  GetNewItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${environment.apiUrl}/api/newItems`);
  }

  SoldTheItem(sItem: SoldItem): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/api/sold`, sItem);
  }

}
