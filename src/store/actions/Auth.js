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
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err.response.data.error);
            dispatch(authFail());
        })
    };
};