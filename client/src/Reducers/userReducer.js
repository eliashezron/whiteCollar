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
                success:true,
            };
        case LOGIN_FAILURE:
            return{
                isLoading:false,
                error:action.payload,
                success:false
            };
        case LOGOUT:
            return{};
        default:
            return state
    }
}
export const allUsersReducer = (state ={ users:[]}, action) => {
    switch(action.type){ 
        case 'ALL_USERS_START':
            return{ 
                users:[],
                isLoading: true
            }
        case 'ALL_USERS_SUCCESS':
            return{ 
                isLoading: false, 
                users:action.payload}
        case 'ALL_USERS_FAILURE':
            return{ 
                isLoading: false, 
                error:action.payload
            }
            case 'ALL_USERS_RESET':
                return{ 
                    users:[]
                }
            default:
            return state
    }
} 
export const topUsersReducer = (state ={ users:[]}, action) => {
    switch(action.type){ 
        case 'TOP_USERS_START':
            return{ 
                isLoading: true
            }
        case 'TOP_USERS_SUCCESS':
            return{ 
                isLoading: false, 
                users:action.payload
            }
        case 'TOP_USERS_FAILURE':
            return{ 
                isLoading: false, 
                error:action.payload
            }
            case 'TOP_USERS_RESET':
                return{ 
                    users:[]
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
                user:action.payload
            }
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

export const updateUserProfile =(state={ }, action)=>{
    switch(action.type){

        case UPDATE_START:
            return{
                isLoading:true,
            };
        case UPDATE_SUCCESS:
            return{
                user:action.payload,
                isLoading:false,
                success:true
            };
        case UPDATE_FAILURE:
            return{
                success:false,
                isLoading:false,
                error:true
            };
        case 'UPDATE_RESET':
            return{ 
                user:{}
            }
        default:
            return state
    }
}
export const followUser= (state={ }, action)=>{
    switch(action.type){
        case 'FOLLOW_START':
            return{
                isLoading:true,
            };
        case 'FOLLOW_SUCCESS':
            return{
                isLoading:true,
                success:true,
                user:action.payload
            };
        case 'FOLLOW_FAILURE':
            return{
                isLoading:false,
                error:action.payload
            }
        case "FOLLOW_RESET":
            return {user:{}};
        default:
            return state
    }
}
export const unfollowUser= (state={ }, action)=>{
    switch(action.type){
        case 'UN_FOLLOW_START':
            return{
                isLoading:true,
            };
        case 'UN_FOLLOW_SUCCESS':
            return{
                isLoading:true,
                success:true,
                user:action.payload
            };
        case 'UN_FOLLOW_FAILURE':
            return{
                isLoading:false,
                error:action.payload
            }
        case "UN_FOLLOW_RESET":
            return {user:{}};
        default:
            return state
    }
}



