import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comminment',
  templateUrl: './comminment.component.html',
  styleUrls: ['./comminment.component.css']
})
export class ComminmentComponent implements OnInit {
  private isEng = false;

  constructor() { }

  ngOnInit() {
    if (localStorage.lang === 'en') {
      this.isEng = true;
    }
  }

}
