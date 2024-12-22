import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDetailsDialogComponent } from './meal-details-dialog.component';

describe('MealDetailsDialogComponent', () => {
  let component: MealDetailsDialogComponent;
  let fixture: ComponentFixture<MealDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealDetailsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
