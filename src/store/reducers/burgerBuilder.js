import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES  = {
    salad:0.5,
    cheese: 1,
    bacon: 2,
    meat: 3
}

const initialState= {
    ingredients:null,
    totalPrice:1,
    error:false
};

const reducer = (state=initialState,action) =>{
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

    //Reducer to set ingredients initially
    if(action.type==actionTypes.SET_INGREDIENTS){
        //Below syntax is used for achieving immutability
        return{
           ...state,
           ingredients:action.ingredients,
           totalPrice:1,
           error:false
       }
    }

   //Reducer to set error status
   if(action.type==actionTypes.FETCH_INGREDIENTS_FAILED){
        //Below syntax is used for achieving immutability
        return{
        ...state,
        error:true
    }
   }
    return state;
};

export default reducer;