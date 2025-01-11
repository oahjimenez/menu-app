import { NgIf } from '@angular/common';
import { Category } from '../category';
import { CategoryListComponent } from '../category-list/category-list.component';
import { Component } from '@angular/core';
import { MenuDetailsComponent } from "../menu-details/menu-details.component";
import { AreaListComponent } from '../area-list/area-list.component';
import { MealSearchComponent } from '../meal-search/meal-search.component';
import { Area } from '../area';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CategoryListComponent, NgIf, MenuDetailsComponent, AreaListComponent, MealSearchComponent, MatTabsModule, CategoryListComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  selectedCategory!: Category | undefined;
  selectedArea!: Area | undefined;
  showCategory: boolean = false;
  showArea: boolean = false;
  selectedIndex = 0;

  constructor() { }

  updateCategory(category: Category) {
    this.selectedCategory = category;
    this.selectedArea = undefined;
    this.showCategory = true;
    this.showArea = !this.showCategory;
  }

  updateArea(area: Area) {
    this.selectedArea = area;
    this.selectedCategory = undefined;
    this.showArea = true;
    this.showCategory = !this.showArea;
  }

}
