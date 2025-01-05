import { Component, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FoodService } from '../food.service';
import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meal } from '../meal';
import { Store } from '@ngrx/store';
import { selectMealRequest } from '../state/actions/meal.actions';

@Component({
  selector: 'app-meal-search',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatIcon, MatAutocompleteModule, AsyncPipe, MatButtonModule],
  templateUrl: './meal-search.component.html',
  styleUrl: './meal-search.component.scss'
})
export class MealSearchComponent {

  myControl = new FormControl('');
  filteredOptions!: Observable<Meal[]>;
  @ViewChild('autoCompleteInput', { static: false, read: MatAutocompleteTrigger }) trigger!: MatAutocompleteTrigger;

  searchField?: string;

  meals: Meal[] = new Array();

  constructor(private foodService: FoodService, private store: Store) { }

  ngOnInit() {
    console.log("meal-search component initialized");
    this.foodService.getAllMealNames().subscribe(mealList => {
      mealList.meals.forEach(meal => this.meals.push(meal));
      console.log("meal names", this.meals);
    }
    );

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: any): Meal[] {
    console.log("filter value", value, " this.meals", this.meals);

    //ceci ne devrait pas arriver, on recoit le type meal au lieu de la chaine nom
    if (value && typeof value !== 'string' && 'strMeal' in value) {
      value = value.strMeal;
    }
    const filterValue = value.trim().toLowerCase();

    return this.meals.filter(meal => meal.strMeal.trim().toLowerCase().includes(filterValue));
  }

  mealSelected(meal: Meal): void {
    console.log("Meal Search - Meal selected: " + meal.strMeal);
    console.log("Meal Search -  Lancement de l'action selectMealRequest");
    this.store.dispatch(selectMealRequest({ meal: meal }));
  }

  displayMeal(meal: Meal): string {
    return meal.strMeal;
  }

}
