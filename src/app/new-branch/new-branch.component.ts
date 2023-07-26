import {Component, OnDestroy, OnInit} from '@angular/core';
import {faImages, faTimes} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {NgForm} from '@angular/forms';
import {Branch} from '../items.service';
import {ItemsService} from '../items.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
library.add(faImages);
library.add(faTimes);

@Component({
  selector: 'app-new-branch',
  templateUrl: './new-branch.component.html',
  styleUrls: ['./new-branch.component.css']
})
export class NewBranchComponent implements OnInit, OnDestroy {
  photo = '../../assets/branch-photo.png';
  address = '';
  desc = '';
  selectedFile: File = null;
  gray = true;
  sucMsg1: string;
  sucMsg2: string;
  errMsg: string;
  private destroy$ = new  Subject();

  constructor(private itemsService: ItemsService,  private toastr: ToastrService, private spinner: NgxSpinnerService,
              private  translator: TranslateService) {}

  ngOnInit() {
    this.translator.get('confirm.brwithaddr').pipe(takeUntil(this.destroy$)).subscribe(res => this.sucMsg1 = res);
    this.translator.get('confirm.addedsuc').pipe(takeUntil(this.destroy$)).subscribe(res => this.sucMsg2 = res);
    this.translator.get('confirm.brnotadd').pipe(takeUntil(this.destroy$)).subscribe(res => this.errMsg = res);
  }
  onSelectFile(event: any) {
    this.selectedFile = event.target.files[0] as File;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_) => {
      this.photo = reader.result.toString();
      this.gray = false;
    };
  }

  onSubmit(brachForm: NgForm) {
    this.spinner.show();
    const newBranch = brachForm.value as Branch;
    newBranch.photo = this.photo;
    this.itemsService.AddNewBranch(newBranch).pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        this.showSuccess(newBranch.address);
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        this.showError(err.statusText);
      }
    );
  }
  showSuccess(adr) {
    this.toastr.success(this.sucMsg1 + ' ' + adr + ' ' + this.sucMsg2);
  }

  showError(m) {
    this.toastr.error(m, this.errMsg);

  }

  undo() {
    this.address = '';
    this.desc = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
