import {Component, HostListener, Input, OnInit} from '@angular/core';
import {faChevronLeft, faChevronRight, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {ActivatedRoute} from '@angular/router';
import {ItemsService} from '../items.service';

library.add(faChevronUp);
library.add(faChevronRight);
library.add(faChevronLeft);
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {MenuItemDialogComponent} from '../menu-item-dialog/menu-item-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css']
})
export class MenuCategoryComponent implements OnInit  {
  category: any;
  choosedItem: any;
  categories = [];
  isEmpty = false;
  windowScrolled: boolean;
  constructor(private route: ActivatedRoute,  private router: Router, public dialog: MatDialog, private itemsService: ItemsService, private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.itemsService.GetAllTheItems().subscribe(
      res => {
        this.spinner.hide();
        this.categories = res;
        if (this.categories.length === 0) {
          this.isEmpty = true;
          // console.log('this.categories.length === 0');
        } else {
          // console.log('this.categories.length !=== 0');
          // console.log('this.categories = ', this.categories);
          this.category = this.categories[0];
          // console.log('this category [0] ', this.category);
          const categoryName = this.route.snapshot.paramMap.get('category_name');
          // console.log('category name: ', categoryName);
          this.category = this.categories.find(c => {
            // console.log('category name find: ', c);
            return c.categoryName === categoryName;
          });
          // console.log('this.category after find: ', this.category);
          // console.log('category ', this.category);
          // console.log('categories length ', this.categories.length);

          const queryParams = this.route.snapshot.queryParams;
          const itemId = queryParams.itemId;
          this.choosedItem = this.category.products.find(i => {
          return i.prodId === parseInt(itemId, 10);
        });
          // console.log('choosed item is ', this.choosedItem);
        }
      }, err => {
        this.spinner.hide();
        console.log('error', err);
      }
    );


  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 1) {
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
    if (this.choosedItem) {
      setTimeout(() => {
      console.log('before onItem ');
      this.onItem(this.choosedItem);
      }, 500);
    }
  }


  go(c) {
    let curCategory = this.categories.findIndex(i => {
      return i.categoryName === this.category.categoryName;
    });
    if (curCategory === 0 && c < 0) {
      curCategory = this.categories.length - 1;
    } else if (curCategory === this.categories.length - 1 && c > 0) {
      curCategory = 0;
    } else {
      curCategory = curCategory + c;
    }
    this.category = this.categories[curCategory];
  }
  onItem(item) {
    const dialogRef = this.dialog.open(MenuItemDialogComponent, {panelClass: 'custom-dialog-container', height: '60vmin',
      width: '55vmax', data: item});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The lang dialog was closed', result);
    });
  }


}
