import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
  faUserCircle,
  faUserTie
} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {LoginComponentComponent} from '../login-component/login-component.component';
import {Roles, UsersService} from '../users.service';
import { ToastrService } from 'ngx-toastr';


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
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription;
  constructor(public dialog: MatDialog, private router: Router, private userService: UsersService, private toastr: ToastrService) {
  }
  isLogged = false;
  isAdmin = false;
  ngOnInit() {
    console.log('ng on init');
    // this.detectActiveNav();
    this.subscription = this.userService.getUser().subscribe(user => {
        console.log('nav has user', user);
        if (user && user.token) {
          this.isLogged = true;
        }
        if (user && user.role === Roles.admin) {
          console.log('ADMIN IS HERE');
          this.isAdmin = true;
        }
    }
    );
  }
  ngAfterViewInit(): void {
    this.detectActiveNav();
    console.log('after view init');
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
    console.log('detect active nav', this.router.url);
    if (this.router.url.includes('menu_common')) {
      document.getElementById('menu').classList.add('active-tab');
    } else if (this.router.url.includes('branches')) {
      document.getElementById('branches').classList.add('active-tab');
    } else if (this.router.url.includes('tray')) {
      console.log('element by id is ', document.getElementById('tray'));
      document.getElementById('tray').classList.add('active-tab');
    } else if (this.router.url.includes('account')) {
      console.log('element by id is ', document.getElementById('account'));
      document.getElementById('account').classList.add('active-tab');
    } else if (this.router.url.includes('contacts')) {
      document.getElementById('contacts').classList.add('active-tab');
    } else if (this.router.url.includes('help')) {
      document.getElementById('help').classList.add('active-tab');
    }
    }

  logOut() {
    const element = document.getElementById('logout');
    element.classList.add('active-tab');
    console.log('element is detected classlist ->', element);
    setTimeout( () => {
      if (confirm('Do you want to log out?')) {
        this.isLogged = false;
        this.isAdmin = false;
        this.userService.logout();
        this.showSuccess();
        if (this.router.url.includes('account') ||
          this.router.url.includes('personal_data') ||
          this.router.url.includes('my_orders') ||
          this.router.url.includes('my_cards') ||
          this.router.url.includes('statistic') ||
          this.router.url.includes('orders_control')) {
          this.router.navigate(['/homepage']);
        }
      }
      document.getElementById('logout').classList.remove('active-tab');
    }, 500);
}

  logIn() {
    document.getElementById('login').classList.add('active-tab');
    const dialogRef = this.dialog.open(LoginComponentComponent, {panelClass: 'custom-dialog-container', height: '40vmin',
      width: '20vmax'});
    dialogRef.afterClosed().subscribe(
      result => {
        console.log('The dialog was closed', result);
        document.getElementById('login').classList.remove('active-tab');
      }
    );
  }
  showSuccess() {
    this.toastr.success('Log in for more actions. ', 'Logged out successfully!' );
  }

  ngOnDestroy(): void {
    console.log('NavBar ngOnDestroy');
    this.subscription.unsubscribe();
  }
}
