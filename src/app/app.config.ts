import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MealEffects } from './state/effects/meal.effects';
import { _mealReducers } from './state/reducers/meal.reducers';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideAnimationsAsync(), provideStore({ selectedMeal : _mealReducers}), provideEffects([MealEffects]), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
