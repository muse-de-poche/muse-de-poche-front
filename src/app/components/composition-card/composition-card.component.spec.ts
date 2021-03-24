import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionCardComponent } from './composition-card.component';

describe('CompositionCardComponent', () => {
  let component: CompositionCardComponent;
  let fixture: ComponentFixture<CompositionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompositionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
