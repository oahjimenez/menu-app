import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MealState } from "../../core/interfaces/meal-state";
import { Meal } from "../../meal";

// Selector pour récupérer le plat sélectionné
export const getMealState = (state: MealState) => state;

export const getSelectedMealFeature = createFeatureSelector<MealState>('selectedMeal');

export const getSelectedMeal= createSelector(
    getSelectedMealFeature,
    state => state.selectedMeal
);
