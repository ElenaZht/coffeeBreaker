import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-payform-dialog',
  templateUrl: './payform-dialog.component.html',
  styleUrls: ['./payform-dialog.component.css']
})
export class PayformDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PayformDialogComponent>) { }

  ngOnInit() {
  }
  pay() {
    this.dialogRef.close();
    return true;
  }
}
