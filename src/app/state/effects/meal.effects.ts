import { FoodService } from '../../food.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, } from 'rxjs';
import { selectMealError, selectMealRequest, selectMealSuccess } from '../actions/meal.actions';
import { MealList } from '../../meal-list';

@Injectable()
export class MealEffects {

    selectMeal$ = createEffect(() => this.actions$.pipe(
        ofType(selectMealRequest), // Se escucha la acción y esto desencadena el flujo
        //exhaustMap evita las peticiones duplicadas
        exhaustMap((action) =>
            this.foodService.getMealFromName(action.meal.strMeal)
                .pipe( // se tratan los datos obtenidos
                    map((resp: MealList) => {
                        // Se retorna la acción getTodosSuccess con los TODOS obtenidos
                        return selectMealSuccess({ meal: resp.meals[0] });
                    }),
                    catchError((err) => {
                        let errorMessage = 'Error al obtener el meal de nombre :'+ action.meal.strMeal + err.message;
                        console.log(errorMessage);
                        // Se retorna la acción getTodosError con un error en caso de que la petición falle
                        return [selectMealError({ error: errorMessage })]
                    })
                )
        )
    ))

    constructor(
        private actions$: Actions,
        private foodService: FoodService
    ) { }
}
