import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesDialigComponent } from './languages-dialig.component';

describe('LanguagesDialigComponent', () => {
  let component: LanguagesDialigComponent;
  let fixture: ComponentFixture<LanguagesDialigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagesDialigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesDialigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
