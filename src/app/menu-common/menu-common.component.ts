import {AfterViewInit, Component, OnInit} from '@angular/core';
import M from 'materialize-css';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-menu-common',
  templateUrl: './menu-common.component.html',
  styleUrls: ['./menu-common.component.css']
})
export class MenuCommonComponent implements OnInit, AfterViewInit {
  options = { fullWidth: false, padding: 200, numVisible: 6, shift: 300};
  items = [{name: 'Coffee', price: '15', pic_class: 'cup', splash_class: 'coffee-splash'},
    {name: 'Tea', price: '10', pic_class: 'cup', splash_class: 'tea-splash'},
    {name: 'Drinks', price: '15', pic_class: 'juice-cup', splash_class: 'juice-splash'},
    {name: 'Sweets', price: '8', pic_class: 'twix-right', splash_class: 'choco-splash'},
    {name: 'Sandwiches', price: '15', pic_class: 'sandwich', splash_class: 'vegi-splash'},
    {name: 'Bakery', price: '5', pic_class: 'donut', splash_class: 'sprinkling-splash'},
    ];
  constructor(private http: HttpClient,  private router: Router, public dialog: MatDialog) {
    if (window.screen.width <= 1024) {
      console.log('SCREEN LESS THAN 1024 DETECTED');
      this.options = { fullWidth: false, padding: 10, numVisible: 4, shift: 10};
    }
  }

  ngOnInit() {}
  goToCategory(c) {
    this.router.navigate(['/menu_category', c]);
  }
  ngAfterViewInit() {
    const elems = document.querySelectorAll('.carousel');
    const instances = M.Carousel.init(elems, this.options);
  }
}
