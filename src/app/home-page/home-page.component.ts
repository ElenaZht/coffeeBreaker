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
import {Branch, ItemsService} from '../items.service';
import {Observable} from 'rxjs';
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
  promoItems = [];
  branches$: Observable<Branch[]>;
  subscription;
  private getPromoSubscription;
  private langSubscription;
  myLang: string;


  mostPopular: Branch[] = [];

  constructor(@Inject(DOCUMENT) private document: Document, public dialog: MatDialog, private router: Router,
              private userService: UsersService, private itemsService: ItemsService) {
    this.getPromoSubscription = this.itemsService.GetPromoItems().subscribe(
      res => {
        this.promoItems = res;

      }
    );
    this.branches$ = this.itemsService.GetBranches();
    this.subscription = this.itemsService.GetBranches().subscribe(
      res => {
        this.mostPopular = res.filter(b => b.popular === true);
      }
    );
    this.myLang = localStorage.getItem('lang');
  }
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
    this.langSubscription = dialogRef.afterClosed().subscribe(result => {
      document.getElementById('languages').classList.remove('active-tab');
    });
  }
  orderThis() {
    const promoItem = this.promoItems[this.startIndex];
    const c = promoItem.menuCategory;
    this.router.navigate(['/menu_category', c], {queryParams: { itemId: promoItem.prodId }});
  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.getPromoSubscription.unsubscribe();
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }

  }
}
