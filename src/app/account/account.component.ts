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
  cardClick = false;
  options = { fullWidth: false, padding: 100, numVisible: 3, shift: 10, dist: -100};
  constructor(private usersService: UsersService,  private router: Router) {}

  ngOnInit() {
    this.user = this.usersService.getCurrentUser();
    if (this.user && this.user.role === 0) {
      this.isAdmin = true;
    }
    if (window.screen.width <= 1024) {
      this.options = { fullWidth: false, padding: 10, numVisible: 3, shift: 10, dist: -300};
    }
  }
  ngAfterViewInit() {
    const elems = document.querySelectorAll('.carousel');
    const instances = M.Carousel.init(elems, this.options); // todo
  }

  toMyOrders() {
    void this.router.navigate(['/my_orders']);
  }
}
