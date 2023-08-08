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
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

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
  private destroy$ = new  Subject();
  isLogged = false;
  isAdmin = false;
  constructor(public dialog: MatDialog, private router: Router, private userService: UsersService, private toastr: ToastrService,
              private  translator: TranslateService) {}

  ngOnInit() {
    this.userService.getUser().pipe(takeUntil(this.destroy$)).subscribe(user => {
        if (user && user.token) {
          this.isLogged = true;
        }
        if (user && user.role === Roles.admin) {
          this.isAdmin = true;
        }
    }
    );
  }
  ngAfterViewInit(): void {
    this.detectActiveNav();
  }

  chooseTheLang() {
    const dialogRef = this.dialog.open(LanguagesDialigComponent, {panelClass: 'custom-dialog-container', height: '40vmin',
      width: '30vmax'});
    document.getElementById('languages').classList.add('active-tab');
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      document.getElementById('languages').classList.remove('active-tab');
    });
  }
  detectActiveNav() {
    if (this.router.url.includes('menu_common')) {
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

  logOut() {
    const element = document.getElementById('logout');
    element.classList.add('active-tab');
    setTimeout( () => {
      this.translator.get('confirm.wantlogout').pipe(takeUntil(this.destroy$)).subscribe((text: string) => {
        if (confirm(text)) {
          this.isLogged = false;
          this.isAdmin = false;
          this.userService.logout();
          this.showSuccess();
          if (this.router.url.includes('account') ||
            this.router.url.includes('personal_data') ||
            this.router.url.includes('my_orders') ||
            this.router.url.includes('my_cards') ||
            this.router.url.includes('statistic') ||
            this.router.url.includes('tray') ||
            this.router.url.includes('orders_control')) {
            this.router.navigate(['/homepage']);
          } else if (this.router.url.includes('contacts')) {
            window.location.reload();
          }
        }
      });
      document.getElementById('logout').classList.remove('active-tab');
    }, 500);
}

  logIn() {
    document.getElementById('login').classList.add('active-tab');
    const dialogRef = this.dialog.open(LoginComponentComponent, {panelClass: 'custom-dialog-container', height: '300px',
      width: '300px'});
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(
      result => {
        if (this.router.url.includes('tray') && this.isAdmin) {
          this.router.navigate(['/homepage']);
        } else if (this.router.url.includes('contacts')) {
          window.location.reload();
        }
        if (document.getElementById('login')) {
          document.getElementById('login').classList.remove('active-tab');
        }
      }
    );
  }
  showSuccess() {
    let msg = '';
    let title = '';
    this.translator.get('confirm.logformore').pipe(takeUntil(this.destroy$)).subscribe(res => msg = res);
    this.translator.get('Logged out successfully!').pipe(takeUntil(this.destroy$)).subscribe(res => title = res);
    this.toastr.success(msg, title );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
