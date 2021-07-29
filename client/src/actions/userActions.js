import axios from 'axios'
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

       export const login = (userName, password) => async(dispatch)=>{
           try{
               dispatch({
                   type:LOGIN_START
               })
               const config = {
                   headers:{
                       'content-Type':'application/json'
                   }
               }
               const {data} = await axios.post('/api/users/login', {userName, password}, config)

               dispatch({
                   type:LOGIN_SUCCESS,
                   payload:data
               })
               localStorage.setItem('userInfo',JSON.stringify(data))
           }catch(error){
               dispatch({
                   type:LOGIN_FAILURE,
                   payload:error
               })
           }
       }
       export const logout = () =>(dispatch)=>{
           localStorage.removeItem('userInfo')
           localStorage.removeItem('categoriesInfo')
           dispatch({
               type:LOGOUT
           })
           document.location.href = '/login'
       }
       export const register = (userName,email, password) => async(dispatch)=>{
        try{
            dispatch({
                type:REGISTER_START
            })
            const config = {
                headers:{
                    'content-Type':'application/json'
                }
            }
            const {data} = await axios.post('/api/users/register', {userName,email, password}, config)

            dispatch({
                type:REGISTER_SUCCESS,
                payload:data
            })
            dispatch({
                type:LOGIN_SUCCESS,
                payload:data
            })
            localStorage.setItem('userInfo',JSON.stringify(data))
        }catch(error){
            dispatch({
                type:REGISTER_FAILURE,
                payload:error
            })
        }
    }

    export const callUser = (userName) => async(dispatch)=>{
        try{
            dispatch({type: 'ALL_USERS_START'})
            const {data} = await axios.get(`/api/users?userName=${userName}`)
            dispatch({
                type:'ALL_USERS_SUCCESS',
                payload:data
            }) 
        }catch(error){
            console.log(error)
            dispatch({
                type:'ALL_USERS_FAILURE',
                payload: error.response && error.response.data.message ? 
                error.response.data.message : error.message
            })
        }
    }
    // get one user
    
export const getUserDetails = () => async(dispatch, getState)=>{
    try {
        dispatch({
            type:'USER_DETAILS_START'
        })
        const {loginUser:{userInfo}, } = getState()
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
          const {data}= await axios.get('/api/users/profile', config)
        dispatch({
            type:'USER_DETAILS_SUCCESS',
            payload:data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:'USER_DETAILS_FAILURE',
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
        
    }
}
    // get one user
    
export const updateUserDetails = (user) => async(dispatch, getState)=>{
    try {
        dispatch({
            type: UPDATE_START
        })
        const {loginUser:{userInfo}, } = getState()
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put('/api/users/profile',user, config)
        dispatch({
            type: UPDATE_SUCCESS,
            payload:data
        })
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
          })

    } catch (error) {
        dispatch({
            type: UPDATE_FAILURE,
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
        
    }
}
    // get top users
    
export const getTopUsers = () => async(dispatch)=>{
    try {
        dispatch({
            type:'TOP_USERS_START'
        })
     
        const {data} = await axios.get('/api/users/topusers')
        dispatch({
            type:'TOP_USERS_SUCCESS',
            payload:data
        })

    } catch (error) {
        dispatch({
            type:'TOP_USERS_FAILURE',
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
        
    }
}
export const followUserAction = (userId) => async(dispatch, getState)=>{
    try{
        dispatch({
            type:'FOLLOW_START'
        })
        const {loginUser:{userInfo}, } = getState()
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/users/profile/follow`, userId, config)
        console.log(data)
        dispatch({
            type:"FOLLOW_SUCCESS",
            payload:data
        })
        dispatch({
            type: UPDATE_SUCCESS,
            payload:data
        })
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
          })
        
        // const profile = {
        //     ...JSON.parse(localStorage.getItem('userInfo')),
        //     ...data
        // };
        // localStorage.setItem('userInfo', JSON.stringify(profile));
        
    }catch(error){
        dispatch({
            type:'FOLLOW_FAILURE',
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}
export const followCategoryAction = (categoryId) => async(dispatch, getState)=>{
    try{
        dispatch({
            type:'CATEGORY_FOLLOW_START'
        })
        const {loginUser:{userInfo}, } = getState()
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        await axios.put(`/api/users/profile/followcategory`, categoryId, config)
        
        dispatch({
            type:"CATEGORY_FOLLOW_SUCCESS",
        })

    }catch(error){
        dispatch({
            type:'CATEGORY_FOLLOW_FAILURE',
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}
export const unfollowUserAction = (userId) => async(dispatch, getState)=>{
    try{
        dispatch({
            type:'UN_FOLLOW_START'
        })
        const {loginUser:{userInfo}, } = getState()
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/users/profile/unfollow`, userId, config)
        console.log(data)
        dispatch({
            type:"UN_FOLLOW_SUCCESS",
            payload:data
        })
    }catch(error){
        dispatch({
            type:'UN_FOLLOW_FAILURE',
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}
export const savePostAction = (postId) => async(dispatch, getState)=>{
    try{
        dispatch({
            type:'SAVE_START'
        })
        const {loginUser:{userInfo}, } = getState()
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
         await axios.put(`/api/users/profile/readinglist`, postId, config)
        
        dispatch({
            type:"SAVE_SUCCESS",
           
        })
    }catch(error){
        dispatch({
            type:'SAVE_FAILURE',
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}
export const getAllUsers = () => async(dispatch)=>{
    try{
        dispatch({
            type:'ALL_USERS_START'
        })
        const {data} = await axios.get(`/api/users`)
        dispatch({
            type:"ALL_USERS_SUCCESS",
            payload:data
        })
    }catch(error){
        console.log(error)
        dispatch({
            type:'ALL_USERS_FAILURE',
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}
export const getReadingList = () => async(dispatch, getState)=>{
    try{
        dispatch({
            type:'READING_LIST_START'
        })
        const {loginUser:{userInfo}, } = getState()
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users/profile/readinglist`, config)

        dispatch({
            type:"READING_LIST_SUCCESS",
            payload:data
        })
    }catch(error){
        console.log(error)
        dispatch({
            type:'READING_LIST_FAILURE',
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}
