import * as actionTypes from './actionTypes';
import axios from 'axios';

//Action creators to dispatch authentication related actions

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    };
};

export const authSuccess = (token,userId) => {
    return{
       type:actionTypes.AUTH_SUCCESS,
       idToken:token,
       userId:userId
    };
};

export const authFail = () => {
    return {
        type:actionTypes.AUTH_FAIL
    };
};

export const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');

    return {
        type:actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch=> {
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime*1000);
    };
};

//Asynchronous code to authenticate user from database --> Using Redux Thunk
export const auth =(email,password,isSignUp) => {
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        };
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHwIYFuj3XMPbD-50K3nXvOdzOUEoAr3Y';
        if(!isSignUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHwIYFuj3XMPbD-50K3nXvOdzOUEoAr3Y';
        }
        axios.post(url,authData)
        .then(response=>{
            console.log(response);

            //Set up local storage of the authentication token
            const expirationTime=new Date(new Date().getTime() + response.data.expiresIn *1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationTime',expirationTime);
            localStorage.setItem('userId',response.data.localId);


            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err.response.data.error);
            dispatch(authFail());
        })
    };
};

//Check if local storage exists for this user
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');      
        if(!token){
            dispatch(logout());
        }
        else{
            const expirationTime=new Date(localStorage.getItem('expirationTime'));
            const userId = localStorage.getItem('userId');
            if(expirationTime > new Date()){
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationTime.getTime()-new Date().getTime())/1000));
            }
            else{
                dispatch(logout());
            }
        }
    };
};