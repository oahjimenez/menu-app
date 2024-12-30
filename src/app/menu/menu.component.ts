import { NgIf } from '@angular/common';
import { Category } from '../category';
import { CategoryListComponent } from '../category-list/category-list.component';
import { Component } from '@angular/core';
import { MenuDetailsComponent } from "../menu-details/menu-details.component";
import { AreaListComponent } from '../area-list/area-list.component';
import { MealSearchComponent } from '../meal-search/meal-search.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CategoryListComponent, NgIf, MenuDetailsComponent, AreaListComponent, MealSearchComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {


  selectedCategory!: Category;
  showCategory: boolean = false;

  constructor() { }

  updateCategory(category: Category) {
    this.selectedCategory = category;
    this.showCategory = true;
  }

}
