import React,{Component} from 'react';
import Input from '../../components/Layout/UI/Input/Input';
import Button from '../../components/Layout/UI/Button/Button';
import Classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/Layout/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class Auth extends Component {

    state={
        controls:{
            email:{
                elementtype:'input',
                elementConfig:{
                    type: 'email',
                    placeholder:'Mail Address'
                },
                value:'',
                validation: {
                    required:true
                },
                valid:false
            },
            password:{
                elementtype:'input',
                elementConfig:{
                    type: 'password',
                    placeholder:'Password'
                },
                value:'',
                validation: {
                    required:true
                },
                valid:false
            },
        },
        formvalid:false,
        isSignUp:true
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
                   ...this.state.controls
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
               this.setState({controls:updatedOrderForm,formvalid:isFormValid});
       }

       submitHandler = (event) => {
           event.preventDefault();
           this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,true);
       }

       switchAuthModeHandler = (event) => {
           event.preventDefault();
           this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,false);
       }

    render(){
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config: this.state.controls[key]
            });
        }
        let form = (
            <form>
                    {formElementsArray.map(formElement=>(
                      <Input 
                      key={formElement.id} 
                      elementtype={formElement.config.elementtype} 
                      elementConfig={formElement.config.elementConfig}
                      value={formElement.config.value}
                      changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                      isValid={formElement.config.valid}/>
                     ))}
            </form>
        );

        if(this.props.loading){
            form=<Spinner />
        }
        let authRedirect=null;
        if(this.props.isAuthenticated){
            authRedirect=<Redirect to="/burger"></Redirect>
        }

        let errorMessage= null;

        if(this.props.error){
            errorMessage= (
                <p>{this.props.error.message}</p>
            );
        }

        return(
            <div className={Classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form>
                    {form}
                </form>
                <Button btnType="Success" clicked={this.submitHandler}>SIGN UP</Button>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}> SIGN IN</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated: state.auth.token!==null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);