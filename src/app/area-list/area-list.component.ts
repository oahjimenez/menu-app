import { getSelectedMeal } from './../state/selectors/meal.selectors';
import { FoodService } from './../food.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { Area } from '../area';
import { map } from 'rxjs/operators';
import { NgClass, NgFor } from '@angular/common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-area-list',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './area-list.component.html',
  styleUrl: './area-list.component.scss'
})
export class AreaListComponent {

  @Output() updateAreaEvent = new EventEmitter<Area>();

  areas!: Area[];
  selectedAreaName!: string | undefined;

  constructor(private foodService: FoodService, private store: Store) { }

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

    this.store.select(getSelectedMeal).subscribe({
      next: (meal) => {
        if (meal) {
          this.selectedAreaName = meal.strArea;
        }
      },
      error:
        error => console.log("An erreor occured getting the selected meal ", error)
    });
  }

  updateArea(area: Area) {
    this.selectedAreaName = area.name;
    this.updateAreaEvent.emit(area);
  }

}
