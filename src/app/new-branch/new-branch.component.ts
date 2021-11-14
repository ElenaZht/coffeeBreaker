import { Component, OnInit } from '@angular/core';
import {faImages, faTimes} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {NgForm} from '@angular/forms';
import {Branch} from '../items.service';
import {ItemsService} from '../items.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
library.add(faImages);
library.add(faTimes);

@Component({
  selector: 'app-new-branch',
  templateUrl: './new-branch.component.html',
  styleUrls: ['./new-branch.component.css']
})
export class NewBranchComponent implements OnInit {
  photo = '../../assets/branch-photo.png';
  address = '';
  desc = '';
  selectedFile: File = null;
  gray = true;
  sucMsg1: string;
  sucMsg2: string;
  errMsg: string;

  constructor(private itemsService: ItemsService,  private toastr: ToastrService, private spinner: NgxSpinnerService,
              private  translator: TranslateService) {
    this.translator.get('confirm.brwithaddr').subscribe(res => this.sucMsg1 = res);
    this.translator.get('confirm.addedsuc').subscribe(res => this.sucMsg2 = res);
    this.translator.get('confirm.brnotadd').subscribe(res => this.errMsg = res);

  }

  ngOnInit() {
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
    console.log('new branch data gone to server as ', newBranch);
    this.itemsService.AddNewBranch(newBranch).subscribe(
      res => {
        this.showSuccess(newBranch.address);
        this.spinner.hide();
        console.log('res from adding new branch', res);
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
}
