import { Meal } from '../../meal';
import { createAction, props } from "@ngrx/store";

// Acción para iniciar la creación de un nuevo elemento todo
export const selectMealRequest = createAction(
    "[Meal] Select Meal Request",  // Identificador del tipo de acción
    props<{ meal: Meal }>()   // Carga útil que contiene los datos necesarios para crear un nuevo todo
)

// Acción para indicar la creación exitosa de un nuevo elemento todo
export const selectMealSuccess = createAction(
    "[Meal] Select Meal Success",  // Identificador del tipo de acción
    props<{meal: Meal  }>()         // Carga útil que contiene el todo creado
)

// Acción para manejar errores que ocurran durante la obtención de elementos todo
export const selectMealError = createAction(
    "[Meal] Select Meal Error",    // Identificador del tipo de acción
    props<{ error: string }>()    // Carga útil que contiene el mensaje de error
)
