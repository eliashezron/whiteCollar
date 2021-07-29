import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import {PaperClipOutlined,DoubleLeftOutlined, EditOutlined} from '@ant-design/icons'
import {Avatar} from "antd";
import { getUserDetails, updateUserDetails } from "../actions/userActions";
import { Link } from 'react-router-dom'
import { message } from 'antd';
import Loader from '../components/Loader';


const Profile =({history})=> {
  const PF = 'https://res.cloudinary.com/eliashezron1/image/upload/v1626282055/userProfilePictures/noAvatar_kwzvtj.png'
  const [updateMode, setupdateMode] = useState(false)
  const [password, setpassword] = useState('')
  const [userBio, setuserBio] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [profilePicture, setprofilePicture] = useState('')
  const [previewsource, setpreviewsource] = useState('')
  const [uploading, setuploading] = useState(false)
  const loginUser = useSelector(state => state.loginUser)
  const {userInfo} = loginUser
  const userDetails = useSelector(state => state.userDetails)
  const {user} = userDetails
  const updateUser = useSelector(state => state.updateUser)
  const { success , error} = updateUser

  const dispatch = useDispatch()

  useEffect(async() => {
    if(!userInfo){
      history.push('/login')
    } else if(!user.name){
      dispatch(getUserDetails())
    }else{
      setprofilePicture(user.profilePicture)
      setpassword(user.password)
      setuserBio(user.userBio)
    }
  }, [dispatch, history, userInfo, success])
  
  const uploadFileHandler =async(e)=>{
    const file = e.target.files[0]
    previewFile(file)
    const formData = new FormData()
    formData.append('image', file)
    setuploading(true)
    try{
      const config ={
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }
      const {data} = await axios.post('/api/upload/profile', formData, config)
      console.log(data)
      setprofilePicture(data)
      setuploading(false)
    }catch(error){
      console.log(error)
      setuploading(false)
    }
  }
  const previewFile = (file) =>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend=()=>{
      setpreviewsource(reader.result)
    }
  }
 
 const handleSubmit= (e)=>{
    if(password !== confirmPassword){
      message.error('passwords do not match')
    }else{
      dispatch(updateUserDetails({_id:user._id, password:password, profilePicture:profilePicture, userBio:userBio}))
      dispatch({type:"UPDATE_RESET"})
        message.success('profile updated successfully')
        setupdateMode(false)
      
    }
 }


  return (<>
    <Link to='/'><DoubleLeftOutlined /></Link>
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
        </div>
        <form className="settingsForm" >
          <label>Profile Picture</label>
          <div className="settingsPP">
            {uploading ? ( <Loader/>)  : previewsource ? (
              <Avatar size={50} src={previewsource} alt=''/>
            ):
                <Avatar size={50} src={user.profilePicture ?
                       user.profilePicture:
                        PF}/>}
            <label htmlFor="fileInput">
              <i className="settingsPPIcon"><PaperClipOutlined /></i>{" "}
            </label>
            <input id="fileInput" 
              type="file" 
              style={{ display: "none" }}
              custom
              onClick={()=>setupdateMode(true)}
              onChange={uploadFileHandler} />
            <span onClick={()=>setupdateMode(true)}><EditOutlined /></span>

          </div>
          {updateMode ? <>
          <label>UserBio</label>
          <input
          className="writeInput"
          value={userBio}
          type="text"
          autoFocus={true}
          onChange={(e)=>setuserBio(e.target.value)}
        /></> :<>
        <label>UserBio</label>
        <h2 className= 'singlePostTitle'>{user.userBio}</h2>
        </>}
          <label>Username</label>
          <input type="text" 
          
          value={user.userName}
          disabled />
          <label>Email</label>
          <input type="email" 
          placeholder="enter email address" 
          value={user.email}
          disabled/>
          {updateMode ?( 
            <>
          <label>Password</label>
          <input 
          type="password" 
          placeholder="Password" 
          value = {password}
          onChange={(e)=>setpassword(e.target.value)} 
          />
          <label>confirm password</label>
          <input type="password" 
          placeholder="confirm Password" 
          value = {confirmPassword}
          onChange={(e)=>setconfirmPassword(e.target.value)} />
          <button 
          className="settingsSubmitButton"
           type='button'
           onClick={handleSubmit}>
            Update
          </button>
        
            </>):(
            <>
            <label>Password</label>
            <input 
            type="password" 
            placeholder="Password" 
            value = {password}
            disabled/>
            </>
          )
          }
        </form>
      </div>
      {/* <Sidebar /> */}
    </div>
    </>
  );
}
export default Profile