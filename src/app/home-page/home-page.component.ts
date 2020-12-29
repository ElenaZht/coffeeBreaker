import {Component, HostListener, Inject, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {icon, library} from '@fortawesome/fontawesome-svg-core';
import {LanguagesDialigComponent} from '../languages-dialig/languages-dialig.component';
import {MatDialog} from '@angular/material';
const up = icon({ prefix: 'fas', iconName: 'chevron-up' });
library.add(faChevronUp);


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  windowScrolled: boolean;
  constructor(@Inject(DOCUMENT) private document: Document, public dialog: MatDialog) { }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
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
  }
  chooseTheLang() {
    const dialogRef = this.dialog.open(LanguagesDialigComponent, {panelClass: 'custom-dialog-container', height: '40vmin',
      width: '30vmax'});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The lang dialog was closed', result);
    });
  }
}
