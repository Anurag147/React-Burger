import React,{Component} from 'react';
import Button from '../../../components/Layout/UI/Button/Button';
import Classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/Layout/UI/Input/Input';

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
        totalPrice:0
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});

        const formData={};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]= this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients:this.props.ingredients,
            price: this.props.price,
            orderData:formData
        }

        //Post Call
        axios.post('/orders.json',order)
        .then(response=>{
            console.log(response)
            alert('Order Placed Successfully');
            this.setState({loading:false});
        })
        .catch(error=>{
            console.log(error)
            this.setState({loading:false});
        });
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
        return (
            <div className={Classes.ContactData}>
                <h4>Enter your contact data</h4>
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
            </div>
        );
    }x
}

export default ContactData;