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
