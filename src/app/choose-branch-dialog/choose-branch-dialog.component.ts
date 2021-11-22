import { Component, OnInit } from '@angular/core';
import {Branch, ItemsService} from '../items.service';
import {Observable} from 'rxjs';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-choose-branch-dialog',
  templateUrl: './choose-branch-dialog.component.html',
  styleUrls: ['./choose-branch-dialog.component.css']
})
export class ChooseBranchDialogComponent implements OnInit {
  branches$: Observable<Branch[]>;
  branches: Branch[] = [];

  constructor(private itemsService: ItemsService, public dialogRef: MatDialogRef<ChooseBranchDialogComponent>) {
    this.branches$ = this.itemsService.GetBranches();

  }

  ngOnInit() {
  }

  getBranch() {
    const val = document.querySelector('input[name="branch"]:checked');
    this.dialogRef.close(val.id);
  }
}
