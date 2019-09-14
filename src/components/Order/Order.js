import React from 'react';
import Classes from './Order.css'

const order = (props) => {

    const ingredientArray=[];

    for(let ingredient in props.ingredients){
        ingredientArray.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        });
    }

    const ingrdientOutput = ingredientArray.map(i=>{
            return <span style=
            {{textTransform:'capitalize',display:'inline-block',margin:'0 8px',padding:'5px',border:'1px solid #ccc'}}>
            {i.name} ({i.amount})</span>
    });

 return (
     <div className={Classes.Order}>
         <p>Ingredients: {ingrdientOutput}</p>
         <p>Price: <strong>USD {props.price}</strong></p>
     </div>
 );
}

export default order;