import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UsersService} from '../users.service';
import {faPencilAlt, faCheck, faUndo, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {Branch, ItemsService} from '../items.service';
import {NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

library.add(faPencilAlt);
library.add(faCheck);
library.add(faUndo);
library.add(faTrashAlt);

@Component({
  selector: 'app-branch-item',
  templateUrl: './branch-item.component.html',
  styleUrls: ['./branch-item.component.css']
})
export class BranchItemComponent implements OnInit {
  isAdmin: boolean;
  isShowEdit = false;
  address = '';
  desc = '';
  photo = '';
  branch: Branch;
  selectedFile: File = null;

  constructor(public dialogRef: MatDialogRef<BranchItemComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UsersService, private itemService: ItemsService, private toastr: ToastrService, private spinner: NgxSpinnerService) {
    if (this.userService.getCurrentUser().role === 0) {
      this.isAdmin = true;
    }
    this.branch = data;
    this.address = data.address;
    this.photo = data.photo;
    this.desc = data.desc;
  }

  ngOnInit() {
  }
  editData() {
    this.isShowEdit = !this.isShowEdit;
  }
  undo() {
    this.address = this.data.address;
    this.desc = this.data.desc;
    this.photo = this.data.photo;
    console.log('undo address to ', this.address, 'and desc to ', this.desc);
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
    const question = confirm('Delete branch ' + branch.address + '?');
    if (question) {
      this.spinner.show();
      this.itemService.DeleteBranch(this.data).subscribe(
        res => {
          console.log('result of delete ', res);
          this.spinner.hide();
          if (res) {
            this.showSuccess('Branch' + branch.address + 'deleted!');
            this.dialogRef.close(true);
          }
        }, err =>  {
          this.spinner.hide();
          this.showError('', 'This branch is not exist.');
        }
      );
    }

  }

  onSubmit(brachForm: NgForm) {
    this.spinner.show();
    const branch = brachForm.value as Branch;
    branch.photo = this.photo;
    branch.id = this.branch.id;
    console.log('data from form ', branch);
    this.itemService.EditBranch(branch).subscribe(
      answer => {
        this.spinner.hide();
        this.editData();
        this.showSuccess('Branch data edited successfuly!');
        this.branch = answer;
      }, err => {
        this.spinner.hide();
        this.showError('Please, try again.', 'Branch data not edited!');
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
    if (confirm('This branch is not popular any more?')) {
      console.log('remove from popular ', branch);
      this.itemService.ChangeBranchStatus(branch, false).subscribe(
        res => {
          console.log('res from remove from pop ', res);
        }
      );
    }
  }
  addToPop(branch: Branch) {
    if (confirm('Make this branch popular?')) {
      console.log('add to popular ', branch);
      this.itemService.ChangeBranchStatus(branch, true).subscribe(
        res => {
          console.log('res from add to pop ', res);
        }
      );
    }
  }
}
