import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coffeBreaker';
  constructor(private translate: TranslateService) {
    if (localStorage.getItem('lang')) {
      translate.setDefaultLang(localStorage.getItem('lang'));

    } else {
      translate.setDefaultLang('en');
    }
  }
}
