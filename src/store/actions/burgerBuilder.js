import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

//Action creator for adding an ingredient
export const addIngredient = (name) => {
 return {
    type:actionTypes.ADD_INGREDIENT,
    ingredientName:name
 };
}

//Action creator for removing an ingredient
export const removeIngredient = (name) => {
    return {
       type:actionTypes.REMOVE_INGREDIENT,
       ingredientName:name
    };
}

//This action is called from initIngredients action when data is recieved from firebase
export const setIngredients = (ingredients) => {
   return { 
      type:actionTypes.SET_INGREDIENTS,
      ingredients:ingredients
   };
}

//This action is called for updating the error state in reducer
export const fetchIngredientsFailed = () => {
   return { 
      type:actionTypes.FETCH_INGREDIENTS_FAILED,
   };
}

//Dispatch a new action when data is recieved from firebase
//This is possible using package redux thunk
export const initIngredients = () => {
   return dispatch => {
      axios.get('/ingredients.json')
        .then(response => {
                dispatch(setIngredients(response.data)); 
                //Dispatch action when data is successfully retrieved
                //this action will eventually call the reducer and set will be set 
        })
        .catch(error=>{
           dispatch(fetchIngredientsFailed())
        })
   };
}