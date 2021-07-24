import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import { Link } from 'react-router-dom'
import { message } from 'antd'

export default function Register({location, history}) {
const [userName, setuserName] = useState('')
const [email, setemail] = useState('')
const [password, setpassword] = useState('')
const [confirmpassword, setconfirmpassword] = useState()
const userRegister = useSelector(state => state.userRegister)
const {isLoading, userInfo, error} = userRegister
const redirect = location.search?location.search.split('=')[1]:'/'
const dispatch = useDispatch()
useEffect(() => {
  if(userInfo){
    history.push(redirect)
  }    
}, [history, userInfo, redirect])

const handleSubmit = (e) =>{
  e.preventDefault()
  if(password !== confirmpassword){
    message.error('passwords do no match')
  }else{
    dispatch(register(userName,email,password))
    message.success('account created successfully')
  }
}

    return (<>
      {/* {error && <Alert type='error' message='username and password combinations do no match'showIcon closable/>} */}
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" 
      onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" 
        type="text" placeholder="Enter your username..."
        value={userName}
        onChange={(e)=>setuserName(e.target.value)} />
        <label>Email</label>
        <input className="registerInput" 
        type="text" 
        placeholder="Enter your email..."
        value={email} 
        onChange={(e)=>setemail(e.target.value)}/>
        <label>Password</label>
        <input className="registerInput" 
        type="password" 
        placeholder="Enter your password..."
        value={password}
        onChange={(e)=>setpassword(e.target.value)} />
        <label>Confirm Password</label>
        <input className="registerInput" 
        type="password" 
        placeholder="Confirm password..."
        value={confirmpassword}
        onChange={(e)=>setconfirmpassword(e.target.value)} />
        <button className="registerButton"
        type='submit' disabled={isLoading}>Register</button>
      </form>
        <div>Already user</div>
        <button className="registerLoginButton">
        <Link className='link' to={redirect ? `/register?register=${redirect}`:'/register'}>
         Login
         </Link>
         </button>
        
    </div>
    </>
    )
}
