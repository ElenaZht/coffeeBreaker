import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayformDialogComponent } from './payform-dialog.component';

describe('PayformDialogComponent', () => {
  let component: PayformDialogComponent;
  let fixture: ComponentFixture<PayformDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayformDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayformDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
