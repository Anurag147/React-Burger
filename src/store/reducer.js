import * as actionTypes from './actions';
import { stat } from 'fs';

const INGREDIENT_PRICES  = {
    salad:0.5,
    cheese: 1,
    bacon: 2,
    meat: 3
}

const initialState= {
    ingredients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice:4
};

const reducuer = (state=initialState,action) =>{
    if(action.type==actionTypes.ADD_INGREDIENT){

        //Below syntax is used for achieving immutability
        return{
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]:state.ingredients[action.ingredientName]+1 //Syntax to update property value
            },
            totalPrice: state.totalPrice+INGREDIENT_PRICES[action.ingredientName]
        }
    }
    if(action.type==actionTypes.REMOVE_INGREDIENT){

         //Below syntax is used for achieving immutability
         return{
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]:state.ingredients[action.ingredientName]-1 //Syntax to update property value
            },
            totalPrice: state.totalPrice+INGREDIENT_PRICES[action.ingredientName]
        }
    }
    return state;
};

export default reducuer;