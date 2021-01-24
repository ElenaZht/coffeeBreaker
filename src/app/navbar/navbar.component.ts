import { Component, OnInit } from '@angular/core';
import {LanguagesDialigComponent} from '../languages-dialig/languages-dialig.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {faBars, faInfoCircle, faMapMarkerAlt, faShoppingBasket, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
library.add(faMapMarkerAlt);
library.add(faShoppingBasket);
library.add(faUserCircle);
library.add(faInfoCircle);
library.add(faBars);
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.detectActiveNav();
  }
  chooseTheLang() {
    const dialogRef = this.dialog.open(LanguagesDialigComponent, {panelClass: 'custom-dialog-container', height: '40vmin',
      width: '30vmax'});
    document.getElementById('languages').classList.add('active-tab');
    dialogRef.afterClosed().subscribe(result => {
      console.log('The lang dialog was closed', result);
      document.getElementById('languages').classList.remove('active-tab');
    });
  }
  detectActiveNav() {
    console.log(this.router.url);
    if (this.router.url.includes('menu')) {
      document.getElementById('menu').classList.add('active-tab');
    } else if (this.router.url.includes('branches')) {
      document.getElementById('branches').classList.add('active-tab');
    } else if (this.router.url.includes('tray')) {
      document.getElementById('tray').classList.add('active-tab');
    } else if (this.router.url.includes('account')) {
      document.getElementById('account').classList.add('active-tab');
    } else if (this.router.url.includes('contacts')) {
      document.getElementById('contacts').classList.add('active-tab');
    } else if (this.router.url.includes('help')) {
      document.getElementById('help').classList.add('active-tab');
    }
    }
  }
