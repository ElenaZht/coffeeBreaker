import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {OrdersService, CreditCard} from '../orders.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {UsersService, User} from '../users.service';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-payform-dialog',
  templateUrl: './payform-dialog.component.html',
  styleUrls: ['./payform-dialog.component.css']
})
export class PayformDialogComponent implements OnInit, OnDestroy {
  card: CreditCard;
  first4: number;
  second4: number;
  thirthd4: number;
  last4: number;
  exp: string;
  payMethod: string;
  cvv: number;
  user: User;
  confQ: string;
  sucMsg1: string;
  sucMsg2: string;
  errMsg: string;
  private destroy$ = new Subject();

  constructor(public dialogRef: MatDialogRef<PayformDialogComponent>, private ordersService: OrdersService,
              private toastr: ToastrService, private spinner: NgxSpinnerService, private usersService: UsersService,
              private  translator: TranslateService) {}

  ngOnInit() {
      const dob = document.getElementById('dob') as HTMLInputElement;
      dob.addEventListener('keydown', () => {
      dob.value = dob.value.replace(/^(\d\d)(\d)$/g, '$1/$2');
      });


      this.card = {
      userId: undefined,
      cardNumber: undefined,
      estDate: '',
      cvv: undefined,
      lastNumber: undefined,
      payMethod: ''
    };
      this.user = this.usersService.getCurrentUser();
      this.translator.get('confirm.savecredit').pipe(takeUntil(this.destroy$)).subscribe(res => this.confQ = res);
      this.translator.get('confirm.yourcard').pipe(takeUntil(this.destroy$)).subscribe(res => this.sucMsg1 = res);
      this.translator.get('confirm.wassavedsuc').pipe(takeUntil(this.destroy$)).subscribe(res => this.sucMsg2 = res);
      this.translator.get('confirm.notsaved').pipe(takeUntil(this.destroy$)).subscribe(res => this.errMsg = res);
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
  }

  async pay() {
    this.card.userId = this.user.id;
    this.card.cardNumber = this.first4 + this.second4 + this.thirthd4 + this.last4;
    this.card.estDate = this.exp;
    this.card.cvv = this.cvv;
    this.card.lastNumber = this.last4;
    this.card.payMethod = document.querySelector('input[name="payMethod"]:checked').id;

    this.spinner.show();
    const cardChecked = await this.ordersService.mockCardChecking().toPromise();
    await this.spinner.hide();
    if (cardChecked && window.confirm(this.confQ)) {
      this.ordersService.saveCreditCard(this.card).pipe(takeUntil(this.destroy$)).subscribe(
        res => {
          if (res) {
            this.showSuccess(this.sucMsg1 + ' ' + this.card.lastNumber + ' ' + this.sucMsg2);
          }


        }, err => {
          this.showError(err.statusText, this.errMsg);
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
