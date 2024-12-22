import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { FoodService } from '../food.service';
import { Meal } from '../meal';
import { MealList } from '../meal-list';

@Component({
  selector: 'app-meal-details-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './meal-details-dialog.component.html',
  styleUrl: './meal-details-dialog.component.scss'
})
export class MealDetailsDialogComponent {

  meal!: Meal;

  constructor(private foodService: FoodService, @Inject(MAT_DIALOG_DATA) public data: { meal: Meal }) {
    this.foodService = foodService;
    this.meal = data.meal;
  }

  ngOnInit() {
    this.foodService.getMealDetails(this.meal.idMeal).subscribe(res => {
      console.log("meal details of ", this.meal.idMeal, res);
      this.meal = res.meals[0]; //service by Id returns single meal
    });
  }

}
