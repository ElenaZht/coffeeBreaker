import {Component, HostListener, Inject, OnInit, OnDestroy} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {icon, library} from '@fortawesome/fontawesome-svg-core';
import {LanguagesDialigComponent} from '../languages-dialig/languages-dialig.component';
import {MatDialog} from '@angular/material';
const up = icon({ prefix: 'fas', iconName: 'chevron-up' });
library.add(faChevronUp);


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
    {title: 'Latte Makiata', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
        'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: '../../assets/coffee-cup.png', menuCategory: 'coffee',
      // tslint:disable-next-line:max-line-length
      ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}],
    },
    {title: 'Americano', price: 8, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
        'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: '../../assets/coffee-cup.png', menuCategory: 'coffee',
      // tslint:disable-next-line:max-line-length
      ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Mineral Water', ingClass: 'water-splash'}],
    },
    {title: 'Orange Fresh', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
        'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: '../../assets/orange-cup.png', menuCategory: 'drinks',
      // tslint:disable-next-line:max-line-length
      ingredients: [{ing: 'Orange juice', ingClass: 'juice-splash'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Mineral Water', ingClass: 'water-splash'}],
    }
  ];
  constructor(@Inject(DOCUMENT) private document: Document, public dialog: MatDialog) { }
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
  chooseTheLang() {
    const dialogRef = this.dialog.open(LanguagesDialigComponent, {panelClass: 'custom-dialog-container', height: '40vmin',
      width: '30vmax'});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The lang dialog was closed', result);
    });
  }
  changePromoItem() {
    if (this.startIndex < this.promoItems.length) {
      this.startIndex++;
    } else {
      this.startIndex = 0;
    }
  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
