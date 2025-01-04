import { getSelectedMeal } from './../state/selectors/meal.selectors';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Category } from './../category';
import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../food.service';
import { MealList } from '../meal-list';
import { NgFor } from '@angular/common';
import { MealDetailsDialogComponent } from '../meal-details-dialog/meal-details-dialog.component';
import { Meal } from '../meal';
import { Area } from '../area';

@Component({
  selector: 'app-meal-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.scss'
})
export class MealListComponent implements OnChanges {

  meals!: MealList;
  @Input() category!: Category | undefined;
  @Input() area!: Area | undefined;

  @Output() selectMealEvent = new EventEmitter<any>();

  selectedMeal: Meal | undefined;

  constructor(private foodService: FoodService, private dialog: MatDialog, private store: Store) { }

      
  ngOnChanges(changes: SimpleChanges) {
        
    if (this.category && changes['category'].currentValue) {
      this.updateMealsOfCategory(changes['category'].currentValue.strCategory);
    }
    if (this.area && changes['area'].currentValue) {
      this.updateMealsOfArea(changes['area'].currentValue.name);
    }
    
}

  ngOnInit() {
    console.log("on init meals component");
    if (this.category) {
      console.log("category-name", this.category.strCategory);
      this.updateMealsOfCategory(this.category.strCategory);
    }
    if (this.area) {
      console.log("area-name", this.area.name);
      this.updateMealsOfArea(this.area.name);
    }


    this.store.select(getSelectedMeal).subscribe((meal: Meal | undefined) => {
      if (meal) {
        this.selectedMeal = meal;

        if (this.category) {
          console.log("category-name",meal.strCategory);
          this.updateMealsOfCategory(meal.strCategory);
        }
        if (this.area) {
          console.log("area-name", meal.strArea);
          this.updateMealsOfArea(meal.strArea);
        }

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

  updateMealsOfCategory(categoryName: string) {
    this.foodService.getMealsOfCategory(categoryName).subscribe(data => {
      console.log(data);
      this.meals = data;
    });
  }


  updateMealsOfArea(areaName: string) {
    this.foodService.getMealsOfArea(areaName).subscribe(data => {
      console.log(data);
      this.meals = data;
    });
  }

}
