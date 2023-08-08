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
import {User, UsersService} from '../users.service';
import {AddNewItemComponent} from '../add-new-item/add-new-item.component';

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
  user: User;
  isAdmin: boolean;
  constructor(private route: ActivatedRoute,  private router: Router, public dialog: MatDialog,
              private itemsService: ItemsService, private spinner: NgxSpinnerService, private userService: UsersService) {}
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
      this.onItem(this.choosedItem);
      }, 500);
    }
    this.spinner.show();
    this.user = this.userService.getCurrentUser();
    if (this.user && this.user.role === 0) {
      this.isAdmin = true;
    }
    this.itemsService.GetAllTheItems().subscribe(
      res => {
        this.spinner.hide();
        this.categories = res;
        if (this.categories.length === 0) {
          this.isEmpty = true;
        } else {
          this.category = this.categories[0];
          const categoryName = this.route.snapshot.paramMap.get('category_name');
          this.category = this.categories.find(c => {
            return c.categoryName === categoryName;
          });

          const queryParams = this.route.snapshot.queryParams;
          const itemId = queryParams.itemId;
          this.choosedItem = this.category.products.find(i => {
            return i.prodId === parseInt(itemId, 10);
          });
        }
      }, err => {
        this.spinner.hide();
      }
    );

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
    const dialogRef = this.dialog.open(MenuItemDialogComponent, {panelClass: 'custom-dialog-container', height: '600px',
      width: '800px', data: item});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.category.products.splice(result.prodId, 1);
      }
    });
  }


  goAdd() {
    this.dialog.open(AddNewItemComponent, {panelClass: 'custom-dialog-container', height: '60vmin',
      width: '55vmax', data: {category: this.category}});
  }
}
