import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompositionsComponent } from './my-compositions.component';

describe('MyCompositionsComponent', () => {
  let component: MyCompositionsComponent;
  let fixture: ComponentFixture<MyCompositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCompositionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCompositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
