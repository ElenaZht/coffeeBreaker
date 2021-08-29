import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseBranchDialogComponent } from './choose-branch-dialog.component';

describe('ChooseBranchDialogComponent', () => {
  let component: ChooseBranchDialogComponent;
  let fixture: ComponentFixture<ChooseBranchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseBranchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseBranchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
