import React, {Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../Layout/UI/Button/Button';

class OrderSummary extends Component{

    componentDidUpdate(){
        console.log("Order Summary Did Update");
    }
    
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey=>{
            return <li key={igKey}><span>{igKey}: {this.props.ingredients[igKey]}</span></li>
        }) ;

        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Purchase Cost: {this.props.price}</strong></p>
                <p>Continue to check out ?</p>
                <Button btnType= "Success" clicked = {this.props.purchaseContinue}>CONTINUE</Button>
                <Button btnType= "Danger" clicked = {this.props.purchaseCanceled}>CANCEL</Button>
            </Auxiliary>
);
    }
}

export default OrderSummary;