import axios from 'axios'
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
    POST_LIKE_START,
    POST_LIKE_SUCCESS,
    POST_LIKE_FAILURE,
    POST_COMMENT_START,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_FAILURE,
    POST_DELETE_START,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAILURE} from '../constants/postConstants'
// get all posts
export const listPosts = (keyword = '', pageNumber='') => async(dispatch)=>{
    try{
        dispatch({type: POST_UPLOAD_START})
        const {data} = await axios.get(`/api/posts?keyword=${keyword}&pageNumber=${pageNumber}`)
        dispatch({
            type:POST_UPLOAD_SUCCESS,
            payload:data
        }) 
    }catch(error){
        console.log(error)
        dispatch({
            type:POST_UPLOAD_FAILURE,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}
// get posts by category
export const getPostsByCategory = (category) => async(dispatch)=>{
        try{
            dispatch({type:'GET_CATEGORY_START'})
            const {data} = await axios.get(`/api/posts?category=${category}`)
            console.log(data)
            dispatch(
                {type:'GET_CATEGORY_SUCCESS',
                payload: data}
            )
        }catch(error){
            console.log(error)
            dispatch({
                type:'GET_CATEGORY_FAILURE',
                payload: error.response && error.response.data.message ? 
                error.response.data.message : error.message
            })
        }
}
// get posts by userAuthor
export const getPostsByuserAuthor = (userAuthor) => async(dispatch)=>{
        try{
            dispatch({type:'GET_USERAUTHOR_START'})
            const {data} = await axios.get(`/api/posts?userAuthor=${userAuthor}`)
            dispatch(
                {type:'GET_USERAUTHOR_SUCCESS',
                payload: data}
            )
        }catch(error){
            console.log(error)
            dispatch({
                type:'GET_USERAUTHOR_FAILURE',
                payload: error.response && error.response.data.message ? 
                error.response.data.message : error.message
            })
        }
}

// get postmansory posts
export const getTopPosts = () => async(dispatch)=>{
    try {
        dispatch({
            type:POST_TOP_START})
        
        const {data} = await axios.get('/api/posts/trending/:trending')
        dispatch({
            type:POST_TOP_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:POST_TOP_FAILURE,
            payload:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
        
    }
}
// get one post
export const getPostDetails = (id) => async(dispatch)=>{
    try {
        dispatch({
            type:POST_DETAILS_START
        })
        const {data} = await axios.get(`/api/posts/${id}`)
        dispatch({
            type:POST_DETAILS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:POST_DETAILS_FAILURE,
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
        
    }
}
// get one post comments
export const getPostDetailsComments = (id) => async(dispatch)=>{
    try {
        dispatch({
            type:'POST_COMMENTS_START'
        })
        const {data} = await axios.get(`/api/posts/${id}/comments`)
        console.log(data)
        dispatch({
            type:'POST_COMMENTS_SUCCESS',
            payload:data
        })
    } catch (error) {
        dispatch({
            type:'POST_COMMENTS_FAILURE',
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
        
    }
}
// create a post
export const createPostCreate = ({image, title, description, category}) => async(dispatch,getState)=>{
    try {
        dispatch({
            type:POST_CREATE_START
        })
        const {loginUser:{userInfo}, } = getState()
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post('/api/posts/create',{image, title, description, category},config)
        dispatch({
            type:POST_CREATE_SUCCESS,
            payload:data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:POST_CREATE_FAILURE,
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
        
    }
}
// update a post
export const updatePost = (post) => async(dispatch,getState)=>{
    try {
        dispatch({
            type:POST_EDIT_START
        })
        const {loginUser:{userInfo}, } = getState()
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/posts/${post._id}`,post,config)
        console.log(data)
        dispatch({
            type:POST_EDIT_SUCCESS,
            payload:data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:POST_EDIT_FAILURE,
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
        
    }
}
// update a like
export const likePostAction = (postId) => async(dispatch,getState)=>{
    try {
        dispatch({
            type:POST_LIKE_START
        })
        const {loginUser:{userInfo}, } = getState()
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
         await axios.put(`/api/posts/${postId}/likes`,({userName:userInfo.userName}),config)
        dispatch({
            type:POST_LIKE_SUCCESS,
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:POST_LIKE_FAILURE,
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
        
    }
}
// update a post
export const commentPostAction = (postId, comment) => async(dispatch,getState)=>{
    try {
        dispatch({
            type:POST_COMMENT_START
        })
        const {loginUser:{userInfo}, } = getState()
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        await axios.post(`/api/posts/${postId}/comments`,comment,config)
        dispatch({
            type:POST_COMMENT_SUCCESS,
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:POST_COMMENT_FAILURE,
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
        
    }
}
// delete a post
export const deletePostAction = (id) => async(dispatch, getState)=>{
    try {
        dispatch({
            type:POST_DELETE_START
        })
        const {loginUser:{userInfo}, } = getState()
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/posts/${id}`, config)
        dispatch({
            type:POST_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type:POST_DELETE_FAILURE,
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
        
    }
}