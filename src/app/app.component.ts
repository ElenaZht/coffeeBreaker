import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'coffeBreaker';
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    if (localStorage.getItem('lang')) {
      this.translate.setDefaultLang(localStorage.getItem('lang'));

    } else {
      localStorage.setItem('lang', 'en');
      this.translate.setDefaultLang('en');
    }
  }
}
