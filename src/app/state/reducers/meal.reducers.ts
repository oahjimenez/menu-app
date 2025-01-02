import { createReducer, on } from "@ngrx/store";
import { selectMealError, selectMealRequest, selectMealSuccess } from "../actions/meal.actions";
import { MealState } from "../../core/interfaces/meal-state";

export const initialState: MealState = {
    selectedMeal: undefined,
    loading: false,
    error: ''
};

export const _mealReducers = createReducer(
    initialState,
    on(selectMealRequest, (state,  { meal }) => ({
        ...state,
        requestMeal : meal,
        loading: true,
    })),

    on(selectMealSuccess, (state, { meal }) => ({
        ...state, // Se regresa el mismo estado
        selectedMeal : meal,
        loading: false // Se cambia el estado para indicar que se terminó de cargar los TODOS desde la API
    })),

    on(selectMealError, (state) => ({
        ...state, // Se regresa el mismo estado
        selectedMealName: 'no selected meal yet',
        loading: false, // Se cambia el estado para indicar que se están cargando los TODOS desde la API
        error: 'Error lors de la sélection du plat'
    }))

);
