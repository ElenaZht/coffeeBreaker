import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComminmentComponent } from './comminment.component';

describe('ComminmentComponent', () => {
  let component: ComminmentComponent;
  let fixture: ComponentFixture<ComminmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComminmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComminmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
