import { MatDialog } from '@angular/material/dialog';
import { Category } from './../category';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../food.service';
import { MealList } from '../meal-list';
import { NgFor } from '@angular/common';
import { MealDetailsDialogComponent } from '../meal-details-dialog/meal-details-dialog.component';
import { Meal } from '../meal';

@Component({
  selector: 'app-meal-list',
  standalone: true,
  imports: [NgFor, MealDetailsDialogComponent],
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.scss'
})
export class MealListComponent {

  meals!: MealList;
  @Input() category! : Category;

  constructor(private router: ActivatedRoute, private foodService: FoodService, private dialog: MatDialog) { }

  ngOnInit() {
    console.log("on init meals component");
    console.log("category-name",this.category.strCategory);
  // REVIEW PIPE DOCS
  // this.foodService.getDishes(this.category).pipe(
  //     map(
  //       (data: Dish) => {
  //         console.log(data);
  //         this.dishes = data;
  //       }
  //     ));
  this.foodService.getMeals(this.category.strCategory).subscribe(data => {
    console.log(data);
    this.meals = data;
  });
  }

  openDialog(meal : Meal) {
    console.log("clicked meal dialog", meal);
    this.dialog.open(MealDetailsDialogComponent, {
      data: {
        meal: meal
      },
    });
  }
}
