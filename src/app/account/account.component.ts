import { Component, OnInit } from '@angular/core';
import M from 'materialize-css';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  isAdmin = false;
  options = { fullWidth: false, padding: 100, numVisible: 3, shift: 10, dist: -100};
  constructor() {
    if (window.screen.width <= 1024) {
      console.log('SCREEN LESS THAN 1024 DETECTED');
      this.options = { fullWidth: false, padding: 10, numVisible: 3, shift: 10, dist: -300};
    }
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    const elems = document.querySelectorAll('.carousel');
    const instances = M.Carousel.init(elems, this.options);
  }
}
