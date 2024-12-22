import { Category } from './../category';
import { Component, EventEmitter, Output } from '@angular/core';
import { FoodService } from '../food.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {

  categories! : Category[];

  @Output() updateCategoryEvent = new EventEmitter<Category>();

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.foodService.getAllCategories().subscribe(categoryList => {
      console.log(categoryList);
      this.categories = categoryList.categories;
    });
  }

  updateCategory(category : Category) {
    console.log("clicked category list:",category);
    this.updateCategoryEvent.emit(category);
  }

}
