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
  constructor( private router: Router, private itemsService: ItemsService) {
    if (window.screen.width <= 1500) {
      console.log('SCREEN LESS THAN 1500 DETECTED');
      this.options = { fullWidth: false, padding: 10, numVisible: 3, shift: 100};
    } else if (window.screen.width <= 1024) {
      console.log('SCREEN LESS THAN 1024 DETECTED');
      this.options = { fullWidth: false, padding: 10, numVisible: 1, shift: 10};
    }
    this.itemsService.GetNewItems().subscribe(
      res => {
        this.promoItems = res;
      }
    );
  }

  ngOnInit() {
  }
  goToItem(item) {
    console.log(item.menuCategory);
    this.router.navigate(['/menu_category', item.menuCategory], {queryParams: {itemId: item.prodId}});
  }
  ngAfterViewInit() {
    const elems = document.querySelectorAll('#carusel111');
    const instances = M.Carousel.init(elems, this.options);
    console.log(instances);
    this.cInstance = instances[0];
    this.interval = setInterval(
      () => {
        this.cInstance.next();
      }, 5000
    );
  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
