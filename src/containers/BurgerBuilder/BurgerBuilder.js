import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Layout/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/Layout/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component{

    constructor(props){
        super(props)
    }

    state = {
        purchasing:false,
        loading:false
    }

    componentDidMount() {
        this.props.onInitIngredients(); //Initialise ingredients by dispatching actions
    }

    updatePurchaseState = (ingredients) => {   
        const sum = Object.keys(ingredients)
        .map(igKey=>{
          return ingredients[igKey]
        })
        .reduce((sum,el)=>{
           return sum+el
        },0);
        return sum > 0;
}

    purchaseHandler = () => {
        this.setState({
            purchasing:true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing:false
        });
    }

    purchaseContinueHandler = () => { 
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let orderSummary=null

        if(this.props.ings){
            orderSummary=<OrderSummary ingredients={this.props.ings} 
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.props.price}/>
        }

        if(this.state.loading){
            orderSummary=<Spinner />
        }

        let burger=<Spinner />
        if(this.props.ings){
        burger= 
                <Auxiliary>
                        <Burger ingredients={this.props.ings}/> 
                        <BuildControls addClicked = {this.props.onIngredientAdded} 
                        removeClicked={this.props.onIngredientRemoved} 
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}/>
                </Auxiliary>
        }
        return (
            
           <Auxiliary>
               <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  {orderSummary} 
                </Modal>
                 {burger}
           </Auxiliary>
        );
    }
}

//Used for mapping state to props in Redux
const mapStateToProps = (state) =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error
    };
};

//Used for dispatching actions which will eventually reach reducers for state update
const mapDispatchToProps = (dispatch) => {
    return{
        onIngredientAdded: (ingName)=> dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);