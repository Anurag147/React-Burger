import React,{Component} from 'react';
import Button from '../../../components/Layout/UI/Button/Button';
import Classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/Layout/UI/Input/Input';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../../store/actions/index';
import Spinner from '../../../components/Layout/UI/Spinner/Spinner';

class ContactData extends Component{

    state={
        orderForm:{
                name:{
                    elementtype:'input',
                    elementConfig:{
                        type: 'text',
                        placeholder:'Enter Name'
                    },
                    value:'',
                    validation: {
                        required:true
                    },
                    valid:false
                },

                street: {
                    elementtype:'input',
                    elementConfig:{
                        type: 'text',
                        placeholder:'Enter Street'
                    },
                    value:'',
                    validation: {
                        required:true
                    },
                    valid:false
                },

                country:{
                    elementtype:'input',
                    elementConfig:{
                        type: 'text',
                        placeholder:'Enter Country'
                    },
                    value:'',
                    validation: {
                        required:true
                    },
                    valid:false
                },

                zipCode:{
                    elementtype:'input',
                    elementConfig:{
                        type: 'text',
                        placeholder:'Enter Zip Code'
                    },
                    value:'',
                    validation: {
                        required:true
                    },
                    valid:false
                },

                email: {
                    elementtype:'input',
                    elementConfig:{
                        type: 'email',
                        placeholder:'Enter Email'
                    },
                    value:'',
                    validation: {
                        required:true
                    },
                    valid:false
                },

                deliveryMethod:{
                    elementtype:'select',
                    elementConfig:{
                        options:[
                            {value:'fastest', displayValue:'Fastest'},
                            {value:'cheapest', displayValue:'Cheapest'}]
                    },
                    value:'fastest',
                    validation: {
                        required:false
                    },
                    valid:true
                },

            },
        loading:false,
        formvalid:false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});

        const formData={};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]= this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients:this.props.ings,
            price: this.props.price,
            orderData:formData
        }

        this.props.onOrderBurger(order,this.props.token); //Dispatch action to update the state
    }

    checkValidity(value,rules){
     let isValid=true;
     if(rules.required){
         isValid = value.trim()!='' && isValid;
     }
     return isValid;
    }

    inputChangedHandler = (event,inputIdentifier) => {
            const updatedOrderForm = {
                ...this.state.orderForm
            };
            const updatedFormElement = {
                ...updatedOrderForm[inputIdentifier]
            };
            updatedFormElement.value=event.target.value;
            updatedFormElement.valid=this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
            updatedOrderForm[inputIdentifier]=updatedFormElement;
            let isFormValid=true;
                for (let formElementIdentifier in updatedOrderForm){
                    isFormValid= updatedOrderForm[formElementIdentifier].valid && isFormValid;
                }
            this.setState({orderForm:updatedOrderForm,formvalid:isFormValid});
    }

    render(){

        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form>
                    {formElementsArray.map(formElement=>(
                      <Input key={formElement.id} elementtype={formElement.config.elementtype} 
                      elementConfig={formElement.config.elementConfig}
                      value={formElement.config.value}
                      changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                      isValid={formElement.config.valid}/>
                     ))}
                    <Button btnType="Success" disabled={!this.state.formvalid} clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if(this.props.loading){
            form=<Spinner />
        }
        return (
            <div className={Classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }x
}

const mapStateToProps = (state)=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token
    };
};

//Used for dispatching actions which will eventually reach reducers for state update
const mapDispatchToProps = (dispatch) => {
    return{
        onOrderBurger: (orderData,token)=> dispatch(burgerBuilderActions.purchaseBurger(orderData,token))      
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactData);