import { Component, OnInit, OnDestroy } from '@angular/core';
import {BranchItemComponent} from '../branch-item/branch-item.component';
import {MatDialog} from '@angular/material';
import {Branch, ItemsService} from '../items.service';
import {Observable} from 'rxjs';
import {UsersService} from '../users.service';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {NewBranchComponent} from '../new-branch/new-branch.component';
library.add(faPlus);

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit, OnDestroy {
  branches$: Observable<Branch[]>;
  mostPopular: Branch[] = [];
  subscription;
  isAdmin = false;
  constructor(public dialog: MatDialog, private itemsService: ItemsService, private userService: UsersService) {
    this.branches$ = this.itemsService.GetBranches();
    this.subscription = this.itemsService.GetBranches().subscribe(
      res => {
        this.mostPopular = res.filter(b => b.popular === true);
      }
    );
    if (this.userService.getCurrentUser().role === 0) {
      this.isAdmin = true;
    }
  }
  // todo: fix branch 14 image format

  ngOnInit() {
  }
  onBranch(b) {
    const dialogRef = this.dialog.open(BranchItemComponent, {panelClass: 'custom-dialog-container', height: '60vmin',
      width: '55vmax', data: b});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The lang dialog was closed', result);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  AddBranch() {
    const dialogRef = this.dialog.open(NewBranchComponent, {panelClass: 'custom-dialog-container', height: '60vmin',
      width: '55vmax'});
    dialogRef.afterClosed().subscribe(result => {
      console.log('data from new branch form ', result);
    });
  }
}
