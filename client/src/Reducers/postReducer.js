import{ POST_UPLOAD_START, 
        POST_UPLOAD_SUCCESS,
        POST_UPLOAD_FAILURE,
        POST_TOP_START,
        POST_TOP_SUCCESS,
        POST_TOP_FAILURE,
        POST_DETAILS_START,
        POST_DETAILS_SUCCESS,
        POST_DETAILS_FAILURE,
        POST_CREATE_START,
        POST_CREATE_SUCCESS,
        POST_CREATE_FAILURE,
        POST_EDIT_START,
        POST_EDIT_SUCCESS,
        POST_EDIT_FAILURE,
        POST_DELETE_START,
        POST_DELETE_SUCCESS,
        POST_DELETE_FAILURE,
        POST_CREATE_RESET,
        POST_EDIT_RESET} from '../constants/postConstants'

export const getPostsReducer = (state={posts:[]}, action)=>{
    switch(action.type){
        case POST_UPLOAD_START:
            return{
                isLoading:true,
                posts:[],
            };
            case POST_UPLOAD_SUCCESS:
            return{
                isLoading:false,
                posts:action.payload.posts,
                pages: action.payload.pages,
                page:action.payload.page
            };
        case POST_UPLOAD_FAILURE:
            return{
                isLoading:false,
                error:action.payload
            };
        default:
            return state
    }
}
export const getTopPostsReducer = (state={posts:[]},action)=>{
    switch(action.type){

        case POST_TOP_START:
            return{
                isLoading:true,
                posts:[],
            };
        case POST_TOP_SUCCESS:
            return{
                isLoading:false,
                posts:action.payload
            };
        case POST_TOP_FAILURE:
            return{
                isLoading:false,
                error:action.payload
            };
        default:
        return state
    }
}
export const getCategoryPostsReducer = (state={posts:[]},action)=>{
    switch(action.type){

        case 'GET_CATEGORY_START':
            return{
                isLoading:true,
                posts:[],
            };
        case 'GET_CATEGORY_SUCCESS':
            return{
                isLoading:false,
                posts:action.payload.posts
            };
        case 'GET_CATEGORY_FAILURE':
            return{
                isLoading:false,
                error:action.payload
            };
        default:
        return state
    }
}
export const getUserAuthorPostsReducer = (state={posts:[]},action)=>{
    switch(action.type){

        case 'GET_USERAUTHOR_START':
            return{
                isLoading:true,
                posts:[],
            };
        case 'GET_USERAUTHOR_SUCCESS':
            return{
                isLoading:false,
                posts:action.payload.posts
            };
        case 'GET_USERAUTHOR_FAILURE':
            return{
                isLoading:false,
                error:action.payload
            };
        default:
        return state
    }
}



export const getSinglePost = (state={post:{category:[]}}, action)=>{
    switch(action.type){

        case POST_DETAILS_START:
            return{
                isLoading:true,
                ...state            
            };
        case POST_DETAILS_SUCCESS:
            return{
                post:action.payload,
                isLoading:false,
            };
        case POST_DETAILS_FAILURE:
            return{
                isLoading:false,
                error:action.payload
            };
        default:
            return state
    }
}
export const createPost = (state={}, action)=>{
    switch(action.type){
               case POST_CREATE_START:
            return{
                isLoading:true,
            };
        case POST_CREATE_SUCCESS:
            return{
                post:action.payload,
                isLoading:false,
                success:true
            };
        case POST_CREATE_FAILURE:
            return{
                isLoading:false,
                error:action.payload
            }; 
        case POST_CREATE_RESET:
            return {}
        default:
            return state
    }
}
export const editPost = (state={post:{}}, action)=>{
    switch(action.type){

        case POST_EDIT_START:
            return{
                isLoading:true,
            };
        case POST_EDIT_SUCCESS:
            return{
                post:action.payload,
                success:true,
                isLoading:false
            };
        case POST_EDIT_FAILURE:
            return{
                isLoading:false,
                error:action.payload
            };
            case POST_EDIT_RESET:
                return {}
        default:
            return state
    }
}
export const deletePost = (state={}, action)=>{
    switch(action.type){

        case POST_DELETE_START:
            return{
                isLoading:true,
            };
        case POST_DELETE_SUCCESS:
            return{
                success:true,
                isLoading:false,
            };
        case POST_DELETE_FAILURE:
            return{
                isLoading:false,
                error:action.payload
            };
        default:
            return state
    }
}

