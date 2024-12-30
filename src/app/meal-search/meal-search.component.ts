import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FoodService } from '../food.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Meal } from '../meal';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-meal-search',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIcon, MatAutocompleteModule, AsyncPipe, ReactiveFormsModule ],
  templateUrl: './meal-search.component.html',
  styleUrl: './meal-search.component.scss'
})
export class MealSearchComponent {

  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;

  mealNames: string[] = new Array();

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    console.log("meal-search component initialized");
    this.foodService.getAllMealNames().subscribe(mealListObservable =>
      mealListObservable.subscribe(mealList => {
        mealList.meals.forEach(meal => this.mealNames.push(meal.strMeal));
        console.log("meal names", this.mealNames);
      }
      ));

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.trim().toLowerCase();

    return this.mealNames.filter(mealName => mealName.trim().toLowerCase().includes(filterValue));
  }

}
