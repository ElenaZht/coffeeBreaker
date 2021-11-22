import {AfterViewInit, Component, OnInit, OnDestroy} from '@angular/core';
import M from 'materialize-css';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ItemsService} from '../items.service';


@Component({
  selector: 'app-menu-common',
  templateUrl: './menu-common.component.html',
  styleUrls: ['./menu-common.component.css']
})
export class MenuCommonComponent implements OnInit, AfterViewInit, OnDestroy {
  options = { fullWidth: false, padding: 200, numVisible: 6, shift: 300};
  items = [];
  subscription;
  constructor(private http: HttpClient,  private router: Router, public dialog: MatDialog, private itemsService: ItemsService) {
    if (window.screen.width <= 1024) {
      this.options = { fullWidth: false, padding: 10, numVisible: 4, shift: 10};
    }
  }

  ngOnInit() {}
  goToCategory(c) {
    this.router.navigate(['/menu_category', c]);
  }
  ngAfterViewInit() {
    this.subscription = this.itemsService.GetCommonCategories().subscribe(
      res => {
        this.items = res;
        setTimeout(() => {
          const elems = document.querySelectorAll('.carousel');
          const instances = M.Carousel.init(elems, this.options);
          }, 150);

      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
