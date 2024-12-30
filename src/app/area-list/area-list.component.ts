import { FoodService } from './../food.service';
import { Component } from '@angular/core';
import { Area } from '../area';
import { map } from 'rxjs/operators';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-area-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './area-list.component.html',
  styleUrl: './area-list.component.scss'
})
export class AreaListComponent {

  areas!: Area[];

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.foodService.getAllAreas().pipe(
      map(mealList => mealList.meals),
      map(meals => meals.map(meal => {
        return { name: meal.strArea }
      }))
    ).subscribe(areas => {
      console.log("areas", areas);
      this.areas = areas
    }
    );
  }

}
