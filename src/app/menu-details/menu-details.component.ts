import { CategoryDetailComponent } from './../category-detail/category-detail.component';
import { Category } from './../category';
import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MealListComponent } from "../meal-list/meal-list.component";

@Component({
  selector: 'app-menu-details',
  standalone: true,
  imports: [MatTabsModule, CategoryDetailComponent, MealListComponent],
  templateUrl: './menu-details.component.html',
  styleUrl: './menu-details.component.scss'
})
export class MenuDetailsComponent {

  @Input() selectedCategory! : Category;
  selectedIndex = 0;

  openMealListTab(event : any){
    this.selectedIndex = 1;
  }

}
