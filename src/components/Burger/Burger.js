import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
//props.ingredients contains the ingredient details
//Now we have to convert the ingredient details into BurgerIngredients elements

//In below code we are transforming ingredients objects to burger ingredient component
let transformedIngredients = Object.keys(props.ingredients)
.map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_,i) =>{
        return <BurgerIngredient key = {igKey+i} type = {igKey} />
    });
})
.reduce((arr,el) =>{
 return arr.concat(el)
},[]);

//Check if transformedIngredients is empty
if(transformedIngredients.length===0){
    transformedIngredients = <p>Please Start Adding Ingredients</p>
}

    return (
            <div className={classes.Burger} >
                <BurgerIngredient type="bread-top" />
                {transformedIngredients}
                <BurgerIngredient type="bread-bottom" />
            </div>
    );
};

export default burger; 