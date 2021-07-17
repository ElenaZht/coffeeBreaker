import {Component, OnDestroy, OnInit} from '@angular/core';
import M from 'materialize-css';
import {Router} from '@angular/router';
@Component({
  selector: 'app-iamnew',
  templateUrl: './iamnew.component.html',
  styleUrls: ['./iamnew.component.css']
})
export class IamnewComponent implements OnInit, OnDestroy {
  options = { fullWidth: false, padding: 200, numVisible: 3, shift: 150};
  interval: any;
  cInstance: any;
  promoItems = [
    {prodId: 1012, title: 'Tea Green Mint Lime', price: 12 , desc: 'Lorem ipsum dolor sit amet, consectetur ' +
        'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: '../../assets/coffee-cup.png', menuCategory: 'Tea',
      // tslint:disable-next-line:max-line-length
      ingredients: [{ing: 'Green tea', ingClass: 'tea-leaves'}, {ing: 'Mineral Water', ingClass: 'water-splash'}, {ing: 'Mint Leaves', ingClass: 'mint'}, {ing: 'Lime Peal', ingClass: 'limes'}],
    },
    {prodId: 1013, title: 'Tea 5 herbs', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
        'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: '../../assets/coffee-cup.png', menuCategory: 'Tea',
      // tslint:disable-next-line:max-line-length
      ingredients: [{ing: 'Mineral Water', ingClass: 'water-splash'}, {ing: 'Eucalyptus', ingClass: 'eucalyptus'}, {ing: 'Rosemary', ingClass: 'rosemary'}, {ing: 'Thyme', ingClass: 'thyme'}, {ing: 'Mint Leaves', ingClass: 'mint'}, {ing: 'Chamomile', ingClass: 'chamomile'}],
    },
    {prodId: 1024, title: 'Cruasan & Nutella', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
        'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: '../../assets/cruasan-nutella.png', menuCategory: 'Bakery',
      // tslint:disable-next-line:max-line-length
      ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Yeast', ingClass: 'yeast'}, {ing: 'Butter', ingClass: 'butter'}, {ing: 'Nutella', ingClass: 'nutella'}], nutr: '../../assets/nutritions.png'
    }
  ];
  constructor( private router: Router) {
    if (window.screen.width <= 1500) {
      console.log('SCREEN LESS THAN 1500 DETECTED');
      this.options = { fullWidth: false, padding: 10, numVisible: 3, shift: 100};
    } else if (window.screen.width <= 1024) {
      console.log('SCREEN LESS THAN 1024 DETECTED');
      this.options = { fullWidth: false, padding: 10, numVisible: 1, shift: 10};
    }
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
