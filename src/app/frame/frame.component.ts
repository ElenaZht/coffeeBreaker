import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goHome() {
    this.router.navigate(['homepage']);
  }
}
