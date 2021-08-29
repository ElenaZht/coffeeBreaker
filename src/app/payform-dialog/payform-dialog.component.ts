import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {OrdersService, CreditCard} from '../orders.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {UsersService, User} from '../users.service';

@Component({
  selector: 'app-payform-dialog',
  templateUrl: './payform-dialog.component.html',
  styleUrls: ['./payform-dialog.component.css']
})
export class PayformDialogComponent implements OnInit {
  card: CreditCard;
  first4: number;
  second4: number;
  thirthd4: number;
  last4: number;
  exp: string;
  payMethod: string;
  cvv: number;
  user: User;

  constructor(public dialogRef: MatDialogRef<PayformDialogComponent>, private ordersService: OrdersService,
              private toastr: ToastrService, private spinner: NgxSpinnerService, private usersService: UsersService) {
    this.card = {
      userId: undefined,
      cardNumber: undefined,
      estDate: '',
      cvv: undefined,
      lastNumber: undefined,
      payMethod: ''
    };
    this.user = this.usersService.getCurrentUser();
    console.log('user for pay ', this.user);
  }

  ngOnInit() {
      const dob = document.getElementById('dob') as HTMLInputElement;
      dob.addEventListener('keydown', () => {
      dob.value = dob.value.replace(/^(\d\d)(\d)$/g, '$1/$2');
});
  }
  onDigitInput(event, id) {
    const element = event.target;
    if (element.value.length === 4 && id < 3) {
      const cardNumberContainaer = document.getElementsByClassName('card-number')[0];
      const children = cardNumberContainaer.children ;
      const el = children[id + 1]  as HTMLInputElement;
      el.focus();
    } else if (id === 3 && element.value.length === 4) {
      const dob = document.getElementById('dob') as HTMLInputElement;
      dob.focus();
    } else if (id === 4 && element.value.length === 5) {
      const cvv = document.getElementById('cvv') as HTMLInputElement;
      cvv.focus();
    } else if (id === 5 && element.value.length === 3) {
      const visa = document.getElementById('visa') as HTMLInputElement;
      visa.focus();
    }
    console.log(element.value, id);
  }

  async pay() {
    this.card.userId = this.user.id;
    this.card.cardNumber = this.first4 + this.second4 + this.thirthd4 + this.last4;
    this.card.estDate = this.exp;
    this.card.cvv = this.cvv;
    this.card.lastNumber = this.last4;
    this.card.payMethod = document.querySelector('input[name="payMethod"]:checked').id;

    console.log('card info ', this.card);
    this.spinner.show();
    const cardChecked = await this.ordersService.mockCardChecking().toPromise();
    await this.spinner.hide();
    console.log('cardChecked ', this.card);
    if (cardChecked && window.confirm('Save this credit card for your account? It will help you pay more fast the next time. This option it safety.')) {
      this.ordersService.saveCreditCard(this.card).subscribe(
        res => {
          if (res) {
            this.showSuccess('You card ****-****-****-' + this.card.lastNumber + ' was saved successfuly!');
          }


        }, err => {
          this.showError(err.statusText, 'Credit card not saved!');
        }
      );
    }
    this.dialogRef.close(cardChecked);
  }
  showSuccess(msg) {
    this.toastr.success(msg);
  }

  showError(msg, title) {
    this.toastr.error(msg, title);

  }
}
