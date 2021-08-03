import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import {PaperClipOutlined,DoubleLeftOutlined, EditOutlined} from '@ant-design/icons'
import {Alert, Avatar, Button} from "antd";
import { getUserDetails, updateUserDetails } from "../actions/userActions";
import { Link } from 'react-router-dom'
import { message } from 'antd';
import Loader from '../components/Loader';

const Profile = ({history}) => {
  const PF = 'https://res.cloudinary.com/eliashezron1/image/upload/v1626282055/userProfilePictures/noAvatar_kwzvtj.png'
  const PF1 = 'https://res.cloudinary.com/eliashezron1/image/upload/v1627808725/postImages/logo-1627808732771.png'
  const [updateMode, setupdateMode] = useState(false)
  const [password, setpassword] = useState('')
  const [userBio, setuserBio] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [profilePicture, setprofilePicture] = useState('')
  const [coverPhoto, setcoverPhoto] = useState('')
  const [profession, setprofession] = useState('')
  const [workplace, setworkplace] = useState('')
  const [previewsource, setpreviewsource] = useState('')
  const [uploading, setuploading] = useState(false)
  const [previewsource1, setpreviewsource1] = useState('')
  const [uploading1, setuploading1] = useState(false)
  const loginUser = useSelector(state => state.loginUser)
  const {userInfo} = loginUser
  const userDetails = useSelector(state => state.userDetails)
  const {user} = userDetails
  const updateUser = useSelector(state => state.updateUser)
  const { success , error} = updateUser

  const dispatch = useDispatch()

  useEffect(() => {
    if(!userInfo){
      history.push('/login')
    } 
  }, [dispatch, history, userInfo])
  useEffect(() => {
    let isMounted = true
    if (isMounted){
      if(!user.userName){
        dispatch(getUserDetails())
      }else{
        setprofilePicture(user.profilePicture)
        setuserBio(user.userBio)
        setprofession(user.profession)
        setworkplace(user.workplace)
        setcoverPhoto(user.coverPhoto)
      }
    }
    return()=>{isMounted = false}
  }, [dispatch, user, success])
  
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

  const uploadFileHandlerCoverPhoto =async(e)=>{
    const file = e.target.files[0]
    previewFile1(file)
    const formData = new FormData()
    formData.append('image', file)
    setuploading1(true)
    try{
      const config ={
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }
      const {data} = await axios.post('/api/upload/cover', formData, config)
      console.log(data)
      setcoverPhoto(data)
      setuploading1(false)
    }catch(error){
      console.log(error)
      setuploading1(false)
    }
  }
  const previewFile = (file) =>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend=()=>{
      setpreviewsource(reader.result)
    }
  }
  const previewFile1 = (file) =>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend=()=>{
      setpreviewsource1(reader.result)
    }
  }
 
 const handleSubmit= (e)=>{
    if(password !== confirmPassword){
      message.error('passwords do not match')
    }else{
      dispatch(updateUserDetails({_id:user._id,
              password:password,
              profilePicture:profilePicture,
              userBio:userBio,
              workplace:workplace,
              profession:profession,
              coverPhoto:coverPhoto}))
      dispatch({type:"UPDATE_RESET"})
        setupdateMode(false)
        history.push(`/authors/${user.userName}`)
    }
 }


  return (<>
    <Link to='/'><DoubleLeftOutlined /></Link>
      <div style={{maxWidth:'700px', margin:'0 auto'}}>
  
    {error && <Alert message={error} showIcon closable/>}
    <div className='card-main'>
          <div className='card1 card'>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {uploading ? ( <Loader/>)  : previewsource ? (
              <Avatar size={100} src={previewsource} alt=''/>
            ):
                <Avatar size={100} src={user.profilePicture ?
                       user.profilePicture:
                        PF}/>}
            <label htmlFor="fileInput">
              <i className="settingsPPIcon"><PaperClipOutlined /></i>{" "}
            </label>
            <input id="fileInput" 
              type="file" 
              style={{ display: "none" }}
              custom="true"
              onClick={()=>setupdateMode(true)}
              onChange={uploadFileHandler} />
              </div>
            </div>

          <div className='card1 card'>
          <label>coverPhoto</label>
          <div className="settingsPP">
            {uploading1 ? ( <Loader/>)  : previewsource1 ? (
              <Avatar size={100} src={previewsource1} alt=''/>
            ):
                <Avatar size={100} src={user.coverPhoto ?
                       user.coverPhoto:
                        PF1}/>}
            <label htmlFor="fileCover">
              <i className="settingsPPIcon"><PaperClipOutlined /></i>{" "}
            </label>
            <input id="fileCover" 
              type="file" 
              style={{ display: "none" }}
              custom="true"
              onClick={()=>setupdateMode(true)}
              onChange={uploadFileHandlerCoverPhoto} />
              </div>
            </div>

            <div className='card card2'>
          <label>Username</label>
          <input type="text" 
          value={user.userName}
          disabled />
          <label>Email</label>
          <input type="email" 
          placeholder="enter email address" 
          value={user.email}
          disabled/>
        </div>

        <div className='card card3'>
          {updateMode ? <>
          <label>UserBio</label>
          <input
          className="writeInput"
          placeholder='fill in bio'
          value={userBio}
          type="text"
          autoFocus={true}
          onChange={(e)=>setuserBio(e.target.value)}
        /></> :<>
        <label>UserBio</label>
        <input
          className="writeInput"
          placeholder='fill in bio'
          value={user.userBio}
          type="text"
          disabled
        />
        </>}
        <span className='editicon' onClick={()=>setupdateMode(true)}><EditOutlined /></span>
        </div>

        <div className='card card4'>
          {updateMode ? <>
          <label>profession</label>
          <input
          className="writeInput"
          value={profession}
          type="text"
          placeholder='fill in profession'
          autoFocus={true}
          onChange={(e)=>setprofession(e.target.value)}
        /></> :<>
        <label>profession</label>
        <input
          className="writeInput"
          placeholder='fill in bio'
          value={user.profession}
          type="text"
          disabled
        />
        </>}
        <span className='editicon' onClick={()=>setupdateMode(true)}><EditOutlined /></span>
        </div>

          <div className='card card5'>
          {updateMode ? <>
          <label>Workplace</label>
          <input
          className="writeInput"
          value={workplace}
          type="text"
          placeholder='fill in workplace'
          autoFocus={true}
          onChange={(e)=>setworkplace(e.target.value)}
        /></> :<>
        <label>workplace</label>
        <input
          className="writeInput"
          placeholder='fill in workplace'
          value={user.workplace}
          type="text"
          disabled
        />
        </>}
        <span className='editicon' onClick={()=>setupdateMode(true)}><EditOutlined /></span>
        </div>


        <div className='card card6'>
      
            {updateMode ? ( 
                 <>
                 <label> edit Password</label>
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
                 </>
                    ) : (
                    <>
                    <label>Password</label>
                    <input 
                    type="password" 
                    placeholder="Password" 
                    value = {password}
                    disabled/>
                    </>
           
            )}
              <span className='editicon' onClick={()=>setupdateMode(true)}><EditOutlined /></span>
        </div>

</div>
        <div className='last-div'>
          <Button 
          className="settingsSubmitButton"
          type='primary'
          shape='round'
          onClick={handleSubmit}>
            Update
          </Button>
          {updateMode &&
          <Button 
          className="settingsSubmitButton"
          type='default'
          shape='round'
          onClick={()=>setupdateMode(false)}>
            cancel
          </Button>}
        </div>
    </div>
    </>
  );
}
export default Profile
            
              