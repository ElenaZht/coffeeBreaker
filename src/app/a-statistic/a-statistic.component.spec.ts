import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AStatisticComponent } from './a-statistic.component';

describe('AStatisticComponent', () => {
  let component: AStatisticComponent;
  let fixture: ComponentFixture<AStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
