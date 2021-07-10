import {
    UPDATE_FAILURE,
     REGISTER_START,
     REGISTER_SUCCESS,
      REGISTER_FAILURE,
     LOGIN_START,
     LOGIN_SUCCESS,
      LOGIN_FAILURE,
       LOGOUT,
       UPDATE_START,
       UPDATE_SUCCESS} from '../constants/userConstants'

export const registerUserReducer = (state={}, action)=>{
    switch(action.type){
        case REGISTER_START:
            return{
                isLoading:true,
            };
        case REGISTER_SUCCESS:
            return{
                userInfo:action.payload,
                isLoading:false,
            };
        case REGISTER_FAILURE:
            return{
                isLoading:false,
                error:action.payload
            };
        default:
            return state
    }
}
export const LoginUserReducer = (state={}, action)=>{
    switch(action.type){
        case LOGIN_START:
            return{
                isLoading:true};
        case LOGIN_SUCCESS:
            return{
                userInfo:action.payload,
                isLoading:false,
            };
        case LOGIN_FAILURE:
            return{
                isLoading:false,
                error:action.payload
            };
        case LOGOUT:
            return{};
        default:
            return state
    }
}

export const updateUserProfile =(state={}, action)=>{
    switch(action.type){

        case UPDATE_START:
            return{
                ...state,
                isLoading:true,
            };
        case UPDATE_SUCCESS:
            return{
                user:action.payload,
                isLoading:false,
            };
        case UPDATE_FAILURE:
            return{
                isLoading:false,
                error:true
            };
        default:
            return state
    }
}



