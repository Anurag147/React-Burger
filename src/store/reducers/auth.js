import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false
}
const reducer = (state=initialState,action) => {
    
        let updatedState = {...state};

        if(action.type==actionTypes.AUTH_START){
            updatedState.loading=true
        }

        if(action.type==actionTypes.AUTH_SUCCESS){
            updatedState.loading=false;
            updatedState.error=null;
            updatedState.token=action.idToken;
            updatedState.userId=action.userId
        }

        if(action.type==actionTypes.AUTH_FAIL){
            updatedState.error=action.error,
            updatedState.loading=false
        }

        if(action.type==actionTypes.AUTH_LOGOUT){
            updatedState.token=null;
            updatedState.userId=null
        }

        return updatedState;
}

export default reducer;