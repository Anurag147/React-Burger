import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../Layout/UI/Button/Button';
import Classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
 return (
     <div className={Classes.CheckoutSummary}>
         <h1>We hope it tastes well!</h1>
         <div style={{width:'100%', margin:'auto'}}>
            <Burger ingredients={props.ingredients} />
         </div>
         <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
         <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
     </div>
 );
}

export default checkoutSummary;