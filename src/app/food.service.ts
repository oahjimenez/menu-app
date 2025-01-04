import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, flatMap, map, mergeMap } from 'rxjs';
import { MealList } from './meal-list';
import { CategoryList } from './menu';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  readonly API_ALL_CATEGORIES = "https://www.themealdb.com/api/json/v1/1/categories.php";
  readonly API_ALL_AREAS = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

  readonly API_MEALS_OF_CATEGORY = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
  readonly API_MEALS_OF_AREA = "https://www.themealdb.com/api/json/v1/1/filter.php?a=";

  readonly API_MEAL_DETAILS_FROM_ID = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  readonly API_MEAL_DETAILS_FROM_NAME = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

  constructor(private httpClient : HttpClient) { }

  getAllCategories() :  Observable<CategoryList> {
    return this.httpClient.get<CategoryList>(this.API_ALL_CATEGORIES);
  }

  getAllAreas() : Observable<MealList> {
    console.log("Calling getAllAreas url:" + this.API_ALL_AREAS);
    return this.httpClient.get<MealList>(this.API_ALL_AREAS);
  }

  getMealsOfCategory(categoryName : string) : Observable<MealList> {
    let mealUrl = `${this.API_MEALS_OF_CATEGORY}${categoryName}`;
    console.log("Calling getMeals url:" + mealUrl);
    return this.httpClient.get<MealList>(mealUrl);
  }

  getMealsOfArea(areaName: string) : Observable<MealList> {
    let mealUrl = `${this.API_MEALS_OF_AREA}${areaName}`;
    console.log("Calling getMealsOfArea url:" + mealUrl);
    return this.httpClient.get<MealList>(mealUrl);

  }

  getMealDetails(mealId : string) : Observable<MealList>{
    console.log("Calling getMealDetails url:" + `${this.API_MEAL_DETAILS_FROM_ID}${mealId}`);
    return this.httpClient.get<MealList>(`${this.API_MEAL_DETAILS_FROM_ID}${mealId}`);
  }

  getMealFromName(mealName : string) : Observable<MealList>{
    console.log("Calling getMealFromName url:" + `${this.API_MEAL_DETAILS_FROM_ID}${mealName}`);
    return this.httpClient.get<MealList>(`${this.API_MEAL_DETAILS_FROM_NAME}${mealName}`);
  }

  //* TODO: fix methods using rxjs more adequate fonctiones *//
  getAllMealNames() : Observable<Observable<MealList>>{
    console.log("Calling getAllMealNames");
    return this.getAllCategories().pipe(
      map(categoryList => categoryList.categories),
      map(categories => categories.map(category => category.strCategory)),
      mergeMap(categoryNames => categoryNames.map(categoryName => { return this.getMealsOfCategory(categoryName) } ))
    )
  }
}
