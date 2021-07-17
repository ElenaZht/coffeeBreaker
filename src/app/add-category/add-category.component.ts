import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  selectedFile: File = null;
  selectedFileMini: File = null;
  constructor() { }

  ngOnInit() {
  }

  // onSelectFile(event: any) {
  //   this.selectedFile = event.target.files[0] as File;
  //   const reader = new FileReader();
  //   reader.readAsDataURL(this.selectedFile);
  //   reader.onload = (_) => {
  //     this.selectedFile = reader.result.toString();
  // }
  // onSelectFileMini(event: any) {
  //   this.selectedFileMini = <File> event.target.files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(this.selectedFileMini);
  // }
}
