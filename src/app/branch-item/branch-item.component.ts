import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UsersService} from '../users.service';
import {faPencilAlt, faCheck, faUndo, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {Branch, ItemsService} from '../items.service';
import {NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

library.add(faPencilAlt);
library.add(faCheck);
library.add(faUndo);
library.add(faTrashAlt);

@Component({
  selector: 'app-branch-item',
  templateUrl: './branch-item.component.html',
  styleUrls: ['./branch-item.component.css']
})
export class BranchItemComponent implements OnInit, OnDestroy {
  isAdmin: boolean;
  isShowEdit = false;
  address = '';
  desc = '';
  photo = '';
  branch: Branch;
  selectedFile: File = null;
  delQ: string;
  delSuc1: string;
  delSuc2: string;
  delErrTitle: string;
  subSuc: string;
  subErrMsg: string;
  subErrTitle: string;
  remPopQ: string;
  addPopQ: string;
  private destroy$ = new Subject();

  constructor(public dialogRef: MatDialogRef<BranchItemComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UsersService, private itemService: ItemsService, private toastr: ToastrService,
              private spinner: NgxSpinnerService, private  translator: TranslateService) {}

  ngOnInit() {
    if (this.userService.getCurrentUser() && this.userService.getCurrentUser().role === 0) {
      this.isAdmin = true;
    }
    this.branch = this.data;
    this.address = this.data.address;
    this.photo = this.data.photo;
    this.desc = this.data.desc;

    this.translator.get('confirm.deletebranch').pipe(takeUntil(this.destroy$)).subscribe(res => this.delQ = res);
    this.translator.get('branch').pipe(takeUntil(this.destroy$)).subscribe(res => this.delSuc1 = res);
    this.translator.get('confirm.deleted').pipe(takeUntil(this.destroy$)).subscribe(res => this.delSuc2 = res);
    this.translator.get('confirm.nobranch').pipe(takeUntil(this.destroy$)).subscribe(res => this.delErrTitle = res);
    this.translator.get('confirm.branchsuc').pipe(takeUntil(this.destroy$)).subscribe(res => this.subSuc = res);
    this.translator.get('confirm.try').pipe(takeUntil(this.destroy$)).subscribe(res => this.subErrMsg = res);
    this.translator.get('confirm.branchnosuc').pipe(takeUntil(this.destroy$)).subscribe(res => this.subErrTitle = res);
    this.translator.get('confirm.branchnotpop').pipe(takeUntil(this.destroy$)).subscribe(res => this.remPopQ = res);
    this.translator.get('confirm.makebranchpop').pipe(takeUntil(this.destroy$)).subscribe(res => this.addPopQ = res);
  }
  editData() {
    this.isShowEdit = !this.isShowEdit;
  }
  undo() {
    this.address = this.data.address;
    this.desc = this.data.desc;
    this.photo = this.data.photo;
  }
  onSelectFile(event: any) {
    this.selectedFile = event.target.files[0] as File;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_) => {
      this.photo = reader.result.toString();
    };
  }
  delete(branch) {
    const question = confirm(this.delQ + ' ' + branch.address + '?');
    if (question) {
      this.spinner.show();
      this.itemService.DeleteBranch(this.data).pipe(takeUntil(this.destroy$)).subscribe(
        res => {
          this.spinner.hide();
          if (res) {
            this.showSuccess(this.delSuc1 + ' ' + branch.address + ' ' + this.delSuc2);
            this.dialogRef.close(true);
          }
        }, err =>  {
          this.spinner.hide();
          this.showError('', this.delErrTitle);
        }
      );
    }

  }

  onSubmit(brachForm: NgForm) {
    this.spinner.show();
    const branch = brachForm.value as Branch;
    branch.photo = this.photo;
    branch.id = this.branch.id;
    this.itemService.EditBranch(branch).pipe(takeUntil(this.destroy$)).subscribe(
      answer => {
        this.spinner.hide();
        this.editData();
        this.showSuccess(this.subSuc);
        this.branch = answer;
      }, err => {
        this.spinner.hide();
        this.showError(this.subErrMsg, this.subErrTitle);
      }
    );
  }
  showSuccess(msg) {
    this.toastr.success(msg );
  }

  showError(m, t) {
    this.toastr.error(m, t);

  }

  removeFromPop(branch: Branch) {
    if (confirm(this.remPopQ)) {
      this.itemService.ChangeBranchStatus(branch, false).pipe(takeUntil(this.destroy$)).subscribe();
    }
  }
  addToPop(branch: Branch) {
    if (confirm(this.addPopQ)) {
      this.itemService.ChangeBranchStatus(branch, true).pipe(takeUntil(this.destroy$)).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
