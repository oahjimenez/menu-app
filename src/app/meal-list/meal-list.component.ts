import { getSelectedMeal } from './../state/selectors/meal.selectors';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Category } from './../category';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../food.service';
import { MealList } from '../meal-list';
import { NgFor } from '@angular/common';
import { MealDetailsDialogComponent } from '../meal-details-dialog/meal-details-dialog.component';
import { Meal } from '../meal';

@Component({
  selector: 'app-meal-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.scss'
})
export class MealListComponent {

  meals!: MealList;
  @Input() category!: Category;
  @Output() selectMealEvent = new EventEmitter<any>();

  selectedMeal: Meal | undefined;

  constructor(private router: ActivatedRoute, private foodService: FoodService, private dialog: MatDialog, private store: Store) { }

  ngOnInit() {
    console.log("on init meals component");
    console.log("category-name", this.category.strCategory);
    this.updateMealsOfCategory(this.category.strCategory);

    this.store.select(getSelectedMeal).subscribe((meal: Meal | undefined) => {
      if (meal) {
        this.selectedMeal = meal;
        this.updateMealsOfCategory(meal.strCategory);
        this.openDialog(this.selectedMeal);
        this.selectMealEvent.emit(null);
      }
    });
  }

  openDialog(meal: Meal) {
    console.log("clicked meal dialog", meal);
    this.dialog.open(MealDetailsDialogComponent, {
      data: {
        meal: meal
      },
    });
  }

  updateMealsOfCategory(categoryName : string){
    this.foodService.getMeals(categoryName).subscribe(data => {
      console.log(data);
      this.meals = data;
    });
  }

}
