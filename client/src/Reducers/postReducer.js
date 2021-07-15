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
        POST_EDIT_RESET,
        POST_LIKE_START,
        POST_LIKE_SUCCESS,
        POST_LIKE_FAILURE,
        POST_LIKE_RESET,
        POST_COMMENT_START,
        POST_COMMENT_SUCCESS,
        POST_COMMENT_FAILURE,
        POST_COMMENT_RESET,
        POST_DELETE_START,
        POST_DELETE_SUCCESS,
        POST_DELETE_FAILURE,
        POST_CREATE_RESET} from '../constants/postConstants'

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



export const getSinglePost = (state={post:{ category:[], comments:[], likes:[]}}, action)=>{
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
export const getSinglePostComments = (state={commentsAll:{}}, action)=>{
    switch(action.type){

        case 'POST_COMMENTS_START':
            return{
                isLoading:true,
                ...state            
            };
        case 'POST_COMMENTS_SUCCESS':
            return{
                commentsAll:action.payload,
                isLoading:false,
            };
        case 'POST_COMMENTS_FAILURE':
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
export const likePost = (state={}, action)=>{
    switch(action.type){

        case POST_LIKE_START:
            return{
                isLoading:true,
            };
        case POST_LIKE_SUCCESS:
            return{
                success:true,
                isLoading:false
            };
        case POST_LIKE_FAILURE:
            return{
                isLoading:false,
                error:action.payload
            };
        case POST_LIKE_RESET:
                return {}
        default:
            return state
    }
}
export const commentPost = (state={}, action)=>{
    switch(action.type){

        case POST_COMMENT_START:
            return{
                isLoading:true,
            };
        case POST_COMMENT_SUCCESS:
            return{
                success:true,
                isLoading:false
            };
        case POST_COMMENT_FAILURE:
            return{
                isLoading:false,
                error:action.payload
            };
        case POST_COMMENT_RESET:
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

