import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => {
    return (
        <div className = {classes.BuildControls}>
            <p className={classes.Price}><strong>Cost: $ {props.price}</strong></p>
            {controls.map(c=>(
                <BuildControl key={c.label} label = {c.label}  
                addClicked = {()=>props.addClicked(c.type)}
                removeClicked = {()=>props.removeClicked(c.type)}
                disabled={props.disabled[c.type]}/>
            ))}
            <button className={classes.OrderButton}
            disabled={!props.purchaseable} onClick={props.ordered}>ORDER NOW</button>
        </div>
    );
};

export default buildControls;