import { Meal } from "../../meal";

export interface MealState {
    selectedMeal?: Meal,
    loading: boolean,
    error?: string,
}
