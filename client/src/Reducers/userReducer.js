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
export const allUsersReducer = (state ={ user:{}}, action) => {
    switch(action.type){ 
        case 'ALL_USERS_START':
            return{ 
                users:{},
                isLoading: true
            }
        case 'ALL_USERS_SUCCESS':
            return{ 
                isLoading: false, 
                user:action.payload}
        case 'ALL_USERS_FAILURE':
            return{ 
                isLoading: false, 
                error:action.payload
            }
            case 'ALL_USERS_RESET':
                return{ 
                    users:{}
                }
            default:
            return state
    }
} 
export const userDetailsReducer = (state ={ user:{}}, action) => {
    switch(action.type){ 
        case 'USER_DETAILS_START':
            return{ 
                ...state, 
                isLoading: true
            }
        case 'USER_DETAILS_SUCCESS':
            return{ 
                isLoading: false, 
                user:action.payload}
        case 'USER_DETAILS_FAILURE':
            return{ 
                isLoading: false, 
                error:action.payload
            }
            case 'USER_DETAILS_RESET':
                return{ 
                    user:{}
                }
            default:
            return state
    }
} 

export const updateUserProfile =(state={}, action)=>{
    switch(action.type){

        case UPDATE_START:
            return{
                isLoading:true,
            };
        case UPDATE_SUCCESS:
            return{
                userInfo:action.payload,
                isLoading:false,
                success:true
            };
        case UPDATE_FAILURE:
            return{
                success:false,
                isLoading:false,
                error:true
            };
        default:
            return state
    }
}



