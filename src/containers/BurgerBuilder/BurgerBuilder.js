import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Layout/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/Layout/UI/Spinner/Spinner';

const INGREDIENT_PRICES  = {
    salad:0.5,
    cheese: 1,
    bacon: 2,
    meat: 3
}

class BurgerBuilder extends Component{

    constructor(props){
        super(props)
    }

    state = {
        ingredients:null,
        totalPrice:1,
        purchaseable:false,
        purchasing:false,
        loading:false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
        .then(response => {
                this.setState({ingredients:response.data});
        })
    }

    updatePurchaseState = (ingredients) => {   

        const sum = Object.keys(ingredients)
        .map(igKey=>{
          return ingredients[igKey]
        })
        .reduce((sum,el)=>{
           return sum+el
        },0);
        this.setState({purchaseable:sum>0})
}

    addIngredientsHandler = (type) => {

                const oldCount= this.state.ingredients[type];
                const updatedCount= oldCount+1;
                const updatedIngredients = {
                    ...this.state.ingredients
                };
                updatedIngredients[type]=updatedCount;
                const newTypePrice = INGREDIENT_PRICES[type];
                const oldPrice=this.state.totalPrice;
                this.setState(

                    {
                        ingredients:updatedIngredients,
                        totalPrice: newTypePrice+oldPrice
                    }
                );
                this.updatePurchaseState(updatedIngredients);                                      
    }

    removeIngredientsHandler = (type) => {
        const oldCount= this.state.ingredients[type];
        if(oldCount<=0){
            return
        }
        const updatedCount= oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const newTypePrice = INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        this.setState(

            {
                ingredients:updatedIngredients,
                totalPrice: oldPrice-newTypePrice
            }
        );
        this.updatePurchaseState(updatedIngredients);
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
        const queryParams=[];
        for(let i in this.state.ingredients){
            queryParams.push(i+'='+this.state.ingredients[i]);
        }
        queryParams.push('price='+this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString
        });
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let orderSummary=null

        if(this.state.ingredients){
            orderSummary=<OrderSummary ingredients={this.state.ingredients} 
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}/>
        }

        if(this.state.loading){
            orderSummary=<Spinner />
        }

        let burger=<Spinner />
        if(this.state.ingredients){
        burger= 
                <Auxiliary>
                        <Burger ingredients={this.state.ingredients}/> 
                        <BuildControls addClicked = {this.addIngredientsHandler} 
                        removeClicked={this.removeIngredientsHandler} 
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
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
export default BurgerBuilder;