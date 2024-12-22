import { Router } from '@angular/router';
import { FoodService } from '../food.service';
import { Category } from './../category';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent {

  @Input() category! : Category;

}
