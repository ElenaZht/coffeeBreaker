import {Component, HostListener, Inject, OnInit, OnDestroy} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {icon, library} from '@fortawesome/fontawesome-svg-core';
import {MatDialog} from '@angular/material';
import {UsersService} from '../users.service';

const up = icon({ prefix: 'fas', iconName: 'chevron-up' });
library.add(faChevronUp);
import {faInfoCircle, faMapMarkerAlt, faShoppingBasket, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {LanguagesDialigComponent} from '../languages-dialig/languages-dialig.component';
import {Router} from '@angular/router';
library.add(faMapMarkerAlt);
library.add(faShoppingBasket);
library.add(faUserCircle);
library.add(faInfoCircle);


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  windowScrolled: boolean;
  interval: any;
  startIndex = 0;
  promoItems = [
    {prodId: 1002, title: 'Latte Makiata', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
        'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
      // tslint:disable-next-line:max-line-length
      ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}, {ing: 'Chocolate', ingClass: 'chocolate'}], nutr: '../../assets/nutritions.png'
    },
    {prodId: 1008, title: 'Americano', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
        'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
      // tslint:disable-next-line:max-line-length
      ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Mineral Water', ingClass: 'water-splash'}], nutr: '../../assets/nutritions.png'
    },
    {prodId: 1016, title: 'Cool Orange', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
        'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: '../../assets/orange-cup.png', menuCategory: 'Drinks',
      // tslint:disable-next-line:max-line-length
      ingredients: [{ing: 'Oranges', ingClass: 'oranges'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Mint Leaves', ingClass: 'mint'}], nutr: '../../assets/nutritions.png'
    }
  ];
  constructor(@Inject(DOCUMENT) private document: Document, public dialog: MatDialog, private router: Router, private userService: UsersService) { }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }
  ngOnInit() {
    this.interval = setInterval(() => {
      this.changePromoItem();
    }, 10000);
  }

  changePromoItem() {
    if (this.startIndex < this.promoItems.length - 1) {
      this.startIndex++;
    } else {
      this.startIndex = 0;
    }
  }
  chooseTheLang() {
    const dialogRef = this.dialog.open(LanguagesDialigComponent, {panelClass: 'custom-dialog-container', height: '40vmin',
      width: '30vmax'});
    document.getElementById('languages').classList.add('active-tab');
    dialogRef.afterClosed().subscribe(result => {
      console.log('The lang dialog was closed', result);
      document.getElementById('languages').classList.remove('active-tab');
    });
  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  orderThis() {
    const promoItem = this.promoItems[this.startIndex];
    const c = promoItem.menuCategory;
    console.log('order this: ', promoItem);
    this.router.navigate(['/menu_category', c], {queryParams: { itemId: promoItem.prodId }});
  }
}
