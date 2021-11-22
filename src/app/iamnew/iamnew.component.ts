import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import M from 'materialize-css';
import {Router} from '@angular/router';
import {ItemsService} from '../items.service';

@Component({
  selector: 'app-iamnew',
  templateUrl: './iamnew.component.html',
  styleUrls: ['./iamnew.component.css']
})
export class IamnewComponent implements OnInit, AfterViewInit, OnDestroy {
  options = { fullWidth: false, padding: 200, numVisible: 3, shift: 150};
  interval: any;
  cInstance: any;
  promoItems = [];
  subscription;
  constructor( private router: Router, private itemsService: ItemsService) {
    if (window.screen.width <= 1500) {
      this.options = { fullWidth: false, padding: 10, numVisible: 3, shift: 100};
    } else if (window.screen.width <= 1024) {
      this.options = { fullWidth: false, padding: 10, numVisible: 1, shift: 10};
    }
  }

  ngOnInit() {}
  goToItem(item) {
    this.router.navigate(['/menu_category', item.menuCategory], {queryParams: {itemId: item.prodId}});
  }
  ngAfterViewInit() {
    this.subscription = this.itemsService.GetNewItems().subscribe(
      res => {
        this.promoItems = res;
        setTimeout( () => {
          const elems = document.querySelectorAll('#carusel111');
          const instances = M.Carousel.init(elems, this.options);
          this.cInstance = instances[0];
        }, 150);
      }
    );


    this.interval = setInterval(
      () => {
        if (this.cInstance) {
          this.cInstance.next();
        }
      }, 5000
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
