import { MealState } from './../core/interfaces/meal-state';
import { Category } from './../category';
import { Component, EventEmitter, Output } from '@angular/core';
import { FoodService } from '../food.service';
import { NgClass, NgFor } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { getSelectedMeal, getSelectedMealFeature } from '../state/selectors/meal.selectors';
import { Meal } from '../meal';
import { map } from 'rxjs';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {

  categories!: Category[];
  selectedCategory! : Category | undefined;

  @Output() updateCategoryEvent = new EventEmitter<Category>();

  constructor(private foodService: FoodService, private store: Store) { }

  ngOnInit() {
    this.foodService.getAllCategories().subscribe(categoryList => {
      console.log(categoryList);
      this.categories = categoryList.categories;

      console.log("Récupération du plat sélectionné afin de choisir la category");
      this.store.select(getSelectedMeal).subscribe( (meal: Meal | undefined) => {
        console.log("CategoryList getSelectedMealName Meal name selected:", meal);

        let category = this.categories.find(category => category.strCategory == meal?.strCategory);
        if (category) {
          this.selectedCategory = category;
          console.log("selected category: ", this.selectedCategory);
          this.updateCategory(this.selectedCategory);
        }
      }); // update the category name with the selected meal name when it changes in the store and reflect it in the component as well
      }) // subscribe to selected meal name changes to update it in the component as well
  }

  updateCategory(category: Category) {
    console.log("clicked category list:", category);
    this.selectedCategory = category;
    this.updateCategoryEvent.emit(category);
  }

}
