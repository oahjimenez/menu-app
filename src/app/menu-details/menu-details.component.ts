import { NgIf } from '@angular/common';
import { AreaDetailComponent } from './../area-detail/area-detail.component';
import { CategoryDetailComponent } from './../category-detail/category-detail.component';
import { Category } from './../category';
import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MealListComponent } from "../meal-list/meal-list.component";
import { Area } from '../area';

@Component({
  selector: 'app-menu-details',
  standalone: true,
  imports: [MatTabsModule, CategoryDetailComponent, MealListComponent, AreaDetailComponent, NgIf],
  templateUrl: './menu-details.component.html',
  styleUrl: './menu-details.component.scss'
})
export class MenuDetailsComponent {

  @Input() selectedCategory! : Category | undefined;
  @Input() selectedArea! : Area | undefined;

  @Input() showCategory : boolean = false;
  @Input() showArea : boolean = false;

  selectedIndex = 0;

  openMealListTab(event : any){
    this.selectedIndex = 1;
  }

}
