import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCommonComponent } from './menu-common.component';

describe('MenuCommonComponent', () => {
  let component: MenuCommonComponent;
  let fixture: ComponentFixture<MenuCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
