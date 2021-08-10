import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import { Link } from 'react-router-dom'
import { message, Button, Alert} from 'antd'
import Meta from '../components/Meta'
import Loader from '../components/Loader'

export default function Register({location, history}) {
const [userName, setuserName] = useState('')
const [email, setemail] = useState('')
const [password, setpassword] = useState('')
const [confirmpassword, setconfirmpassword] = useState()
const userRegister = useSelector(state => state.userRegister)
const {isLoading, userInfo, error, success} = userRegister
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
  }
  
  }


    return (<>
<Meta title='signUp into whitePen'/>
  {error && <Alert type='error' message={error} showIcon closable/>}
  {success && <Alert type='success' message='account successfully created' showIcon closable/>}
  {isLoading && <Loader/>}
  <div className='body'>
      <div className="container">
        {/* <div className="icon"></div> */}
        <div className="title">WHITEKOLLA</div>
        <div className="inputs">
          <label for="email">Email</label>
          <input type="text"
          placeholder="enter email address"
          value={email}
          onChange={(e)=>setemail(e.target.value)}/>
          <label for="email">userName</label>
          <input type="text"
          placeholder="enterUserName"
          value={userName}
          onChange={(e)=>setuserName(e.target.value)}/>
          <label for="password">password</label>
          <input type="password"
          placeholder="enter your password"
          value={password}
          onChange={(e)=>setpassword(e.target.value)}/>
          <label for="password"> Confirm password</label>
          <input type="password"
          placeholder="enter your password"
          value={confirmpassword}
          onChange={(e)=>setconfirmpassword(e.target.value)}/>
        </div>
        <div className="button">
          <Button shape='round' onClick={handleSubmit}>REGISTER</Button>
        </div>
        <div> already a User ? {''}
        <button className="button" >
          <Link style={{color:'black'}} to='/login'>
         Login
          </Link> 
          </button>
        </div>
      </div>
  </div>
    </>
    )
}
