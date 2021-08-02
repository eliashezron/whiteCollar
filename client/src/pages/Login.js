import { Alert, Button, message } from 'antd'
import React,{useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

export default function Login({history, location}) {
  const [userName, setuserName] = useState('')
  const [password, setpassword] = useState('')
  const loginUser = useSelector(state => state.loginUser)
  const {isLoading, userInfo, error, success} = loginUser
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
  <Meta title='log into WHITECOLLAR'/>
  {error && <Alert type='error' message={error} showIcon closable/>}
  {success && message.success('login successfull')}
  {isLoading && <Loader/>}
  <div className='body'>
      <div className="container">
        <div className="icon"></div>
        <div className="title">WHITECOLLAR</div>
        <div className="inputs">
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
        </div>
        <div className="button">
          <Button shape='round' onClick={handleSubmit}>LOGIN</Button>
        </div>
        <div> new User ? {''}
        <button className="button" >
          <Link style={{color:'black'}} to={redirect ? `/register?register=${redirect}`:'/register'}>
          Register 
          </Link> 
          </button>
        </div>
      </div>
  </div>
  </>
  );
}
