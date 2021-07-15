import React,{useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions'
import Meta from '../components/Meta'

export default function Login({history, location}) {
  const [userName, setuserName] = useState('')
  const [password, setpassword] = useState('')
  const loginUser = useSelector(state => state.loginUser)
  const {isLoading, userInfo, error} = loginUser
  const dispatch = useDispatch()
  const redirect = location.search?location.search.split('=')[1]:'/'
  useEffect(() => {
        if(userInfo){
          history.push(redirect)
        }    
  }, [history, userInfo, redirect])
  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(login(userName,password))
  
                     
  }
  return (
  <>
  <Meta title='log into Leaves'/>
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>userName</label>
        <input className="loginInput"
         type="text" 
         placeholder="Enter your userName..."
         value={userName}
         onChange={(e)=>setuserName(e.target.value)}/>
        <label>Password</label>
        <input className="loginInput" 
        type="password" 
        placeholder="Enter your password..."
        value={password}
        onChange={(e)=>setpassword(e.target.value)} />
        <button className="loginButton"
        type='submit'
        disabled={isLoading}>Login</button>
      </form>
        <div> new User ? {''}
        <button className="loginRegisterButton">
          <Link className='link' to={redirect ? `/register?register=${redirect}`:'/register'}>
          Register 
          </Link> 
          </button>
        </div>
    </div>
    </>
  );
}
