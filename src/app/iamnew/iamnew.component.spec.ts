import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamnewComponent } from './iamnew.component';

describe('IamnewComponent', () => {
  let component: IamnewComponent;
  let fixture: ComponentFixture<IamnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IamnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
