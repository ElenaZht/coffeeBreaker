import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-languages-dialig',
  templateUrl: './languages-dialig.component.html',
  styleUrls: ['./languages-dialig.component.css']
})
export class LanguagesDialigComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LanguagesDialigComponent>,
              private translate: TranslateService) {
    translate.setDefaultLang('en');
    const curLang = localStorage.getItem('lang');
    this.useLanguage(curLang);

  }

  ngOnInit() {
  }
  exit() {
    this.dialogRef.close();
  }
  useLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem('lang', language);
    console.log('language is ', localStorage.getItem('lang'));
  }
}
