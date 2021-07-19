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
        const {userLogin:{userInfo}}= getState()
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users/profile`, config)
        console.log(data)
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
        const {userLogin:{userInfo}}= getState()
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put('/api/users/profile',user, config)
        console(data)
        dispatch({
            type: UPDATE_SUCCESS,
            payload:data
        })
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
          })
        localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_FAILURE,
            error:error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
        
    }
}
