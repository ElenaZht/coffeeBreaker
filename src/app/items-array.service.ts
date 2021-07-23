import {Injectable} from '@angular/core';
import {Contacts, Item, ItemsService, SoldItem} from './items.service';
import {Observable, of} from 'rxjs';
import {environment} from './environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ItemsArrayService implements ItemsService {
  soldItems: SoldItem[] = [
    {prodId: 1007, title: 'Capuchino', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
        'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
      ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}], nutr: '../../assets/nutritions.png',
      sold: 30, date: new Date()
    },
    {prodId: 1009, title: 'Ristretto', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
        'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
      // tslint:disable-next-line:max-line-length
      ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}], nutr: '../../assets/nutritions.png',
      sold: 4, date: new Date()
    },
    {prodId: 1014, title: 'Tea Lady Gray', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
        'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: '../../assets/coffee-cup.png', menuCategory: 'Tea',
      // tslint:disable-next-line:max-line-length
      ingredients: [{ing: 'Mineral Water', ingClass: 'water-splash'}, {ing: 'Black tea', ingClass: 'black-tea'}, {ing: 'Bergamonia', ingClass: 'bergamonia'}], nutr: '../../assets/nutritions.png',
      sold: 1, date: new Date()
    },
    {prodId: 1025, title: 'Cookie', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
        'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: '../../assets/cookie.png', menuCategory: 'Bakery',
      // tslint:disable-next-line:max-line-length
      ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Butter', ingClass: 'butter'}, {ing: 'Chocolate', ingClass: 'chocolate'}], nutr: '../../assets/nutritions.png',
      sold: 15, date: new Date()
    },
    {prodId: 1035, title: 'Chicken Sandwich', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
        'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: '../../assets/sandwich3.png', menuCategory: 'Sandwiches',
      // tslint:disable-next-line:max-line-length
      ingredients: [{ing: 'Baguette', ingClass: 'baget'}, {ing: 'Lettuce', ingClass: 'letuce'}, {ing: 'Tomatoes', ingClass: 'tomatoes'}, {ing: 'Onion', ingClass: 'onion'}, {ing: 'Chicken Breast', ingClass: 'chiken'}], nutr: '../../assets/nutritions.png',
      sold: 18, date: new Date()
    }
  ];
  contacts: Contacts;
  constructor(private http: HttpClient) {
    this.GetContacts().subscribe(
      res => {
        this.contacts = res;
      }
    );
    // const a = {prodId: 1007, title: 'Capuchino', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
    //     'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    //   img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
    //   ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}], nutr: '../../assets/nutritions.png'
    // } as Item;
    // setTimeout(
    //   () => {
    //     this.SoldTheItem(a);
    //   }
    //   , 5000);
  }

  AddItem(item: Item): Observable<boolean> {
    return undefined;
  }

  DeleteItem(item: Item): Observable<boolean> {
    return undefined;
  }

  GetItem(): Observable<Item> {
    return undefined;
  }

  GetItemsByCategory(categoryName): Observable<Item[]> {
    return undefined;
  }

  GetSoldItems(): Observable<SoldItem[]> {
    return of(this.soldItems);
  }

  SoldTheItem(item: Item): boolean {
    const sItem = {...item, sold: 2, date: new Date()} as SoldItem;
    console.log('sold item is ', sItem);
    this.soldItems.push(sItem);
    return true;
  }

  GetContacts(): Observable<Contacts> {
    return this.http.get<Contacts>(`${environment.apiUrl}/api/contacts/0`);
  }

  EditContacts(instagram, facebook, email, phone1, phone2, phone3, address): Observable<Contacts> {
    return this.http.patch<Contacts>(`${environment.apiUrl}/api/contacts/0`, {instagram, facebook, email, phone1, phone2, phone3, address}).pipe(map( res => {
        if (res) {
          console.log('change data status', res);
          this.contacts.instagram = res.instagram;
          this.contacts.facebook = res.facebook;
          this.contacts.email = res.email;
          this.contacts.phone1 = res.phone1;
          this.contacts.phone2 = res.phone2;
          this.contacts.phone3 = res.phone3;
          this.contacts.address = res.address;
        } else {
          console.log('we have no res from server');
        }
        return res;
      }, err => {
        console.log('items service got error from server', err);
      }
    ));
  }

}
