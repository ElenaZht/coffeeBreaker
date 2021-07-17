import { Component, OnInit, OnDestroy } from '@angular/core';
import {LanguagesDialigComponent} from '../languages-dialig/languages-dialig.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {
  faBars,
  faInfoCircle,
  faLock,
  faLockOpen,
  faMapMarkerAlt,
  faShoppingBasket,
  faUserCircle, faUserTie
} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {LoginComponentComponent} from '../login-component/login-component.component';
import {User, UsersService} from '../users.service';

library.add(faMapMarkerAlt);
library.add(faShoppingBasket);
library.add(faUserCircle);
library.add(faInfoCircle);
library.add(faBars);
library.add(faLock);
library.add(faLockOpen);
library.add(faUserTie);
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscription;
  constructor(public dialog: MatDialog, private router: Router, private userService: UsersService) {
  }
  isLogged = false;
  isAdmin = false;
  ngOnInit() {
    this.detectActiveNav();
    this.subscription = this.userService.getUser().subscribe(user => console.log('nav has user', user));
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
    // if (this.router.url.includes('menu')) {
    //   document.getElementById('menu').classList.add('active-tab');
    // } else if (this.router.url.includes('branches')) {
    //   document.getElementById('branches').classList.add('active-tab');
    // } else if (this.router.url.includes('tray')) {
    //   document.getElementById('tray').classList.add('active-tab');
    // } else if (this.router.url.includes('account')) {
    //   document.getElementById('account').classList.add('active-tab');
    // } else if (this.router.url.includes('contacts')) {
    //   document.getElementById('contacts').classList.add('active-tab');
    // } else if (this.router.url.includes('help')) {
    //   document.getElementById('help').classList.add('active-tab');
    // }
    }

  logOut() {
    document.getElementById('logout').classList.add('active-tab');
    console.log('class list', document.getElementById('logout').classList);
    if (confirm('Do you want to log out?')) {
      this.isLogged = false;
    }
    document.getElementById('logout').classList.remove('active-tab');
  }

  logIn() {
    const dialogRef = this.dialog.open(LoginComponentComponent, {panelClass: 'custom-dialog-container', height: '40vmin',
      width: '20vmax'});
    dialogRef.afterClosed().subscribe(
      result => {
        console.log('The dialog was closed', result);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
