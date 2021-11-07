import {AfterViewInit, Component, OnInit} from '@angular/core';
import M from 'materialize-css';
import {User, UsersService} from '../users.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterViewInit {
  isAdmin = false;
  user: User;
  options = { fullWidth: false, padding: 100, numVisible: 3, shift: 10, dist: -100};
  constructor(private usersService: UsersService,  private router: Router) {
    this.user = this.usersService.getCurrentUser();
    if (this.user.role === 0) {
      this.isAdmin = true;
      console.log('account detected admin', this.user);
    }
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

  toMyOrders() {
    this.router.navigate(['/my_orders']);
  }
}
