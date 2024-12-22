import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealList } from './meal-list';
import { CategoryList } from './menu';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  readonly API_CATEGORIES = "https://www.themealdb.com/api/json/v1/1/categories.php";
  readonly API_CATEGORY_MEALS = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
  readonly API_MEAL_DETAILS = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  constructor(private httpClient : HttpClient) { }

  getAllCategories() :  Observable<CategoryList> {
    return this.httpClient.get<CategoryList>(this.API_CATEGORIES);
  }

  getMeals(categoryName : string) : Observable<MealList> {
    let dishUrl = `${this.API_CATEGORY_MEALS}${categoryName}`;
    console.log("Calling getMeals url:" + dishUrl);
    return this.httpClient.get<MealList>(dishUrl);
  }

  getMealDetails(mealId : string) : Observable<MealList>{
    console.log("Calling getMealDetails url:" + `${this.API_MEAL_DETAILS}${mealId}`);
    return this.httpClient.get<MealList>(`${this.API_MEAL_DETAILS}${mealId}`);
  }

}
