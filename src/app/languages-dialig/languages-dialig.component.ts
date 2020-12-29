import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-languages-dialig',
  templateUrl: './languages-dialig.component.html',
  styleUrls: ['./languages-dialig.component.css']
})
export class LanguagesDialigComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LanguagesDialigComponent>) { }

  ngOnInit() {
  }
  exit() {
    this.dialogRef.close();
  }
}
