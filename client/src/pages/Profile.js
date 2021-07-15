import axios from 'axios'
import React,{useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {PaperClipOutlined,DoubleLeftOutlined, EditOutlined} from '@ant-design/icons'
import Avatar from "antd/lib/avatar/avatar";
import { getUserDetails, updateUserDetails } from "../actions/userActions";
import { Link } from 'react-router-dom'


export default function Settings({history}) {
  const [message, setmessage] = useState(null)
  const [updateMode, setupdateMode] = useState(false)
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [profilePicture, setprofilePicture] = useState('')
  const [previewsource, setpreviewsource] = useState('')
  const [uploading, setuploading] = useState(false)


  const loginUser = useSelector(state => state.loginUser)
  const {userInfo} = loginUser
  const userDetails = useSelector(state => state.userDetails)
  const {user} = userDetails
  const updateUser = useSelector(state => state.updateUser)
  const { success} = updateUser

  const PF = 'https://res.cloudinary.com/eliashezron1/image/upload/v1626282055/userProfilePictures/noAvatar_kwzvtj.png'
  const dispatch = useDispatch()
  useEffect(() => {
    if(!userInfo){
      history.push('/login')
    }else{
      dispatch(getUserDetails())
        setpassword(userInfo.password)
        setprofilePicture(userInfo.profilePicture)
    }
  }, [dispatch, history, userInfo, user])
  console.log(user)
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
  
  const submithandler = (e) =>{
    if(password !== confirmPassword){
      setmessage('passwords do not match')
      console.log('passwords not matching')
    }else{
      dispatch(updateUserDetails({id:userInfo._id, profilePicture, password}))
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
        <form className="settingsForm" onSubmit={submithandler}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {uploading ? ( <h4>isloading</h4>)  : previewsource ? (
              <Avatar size={50} src={previewsource} alt=''/>
            ):
                <Avatar size={50} src={userInfo.profilePicture ?
                       userInfo.profilePicture:
                        PF}/>}
            <label htmlFor="fileInput">
              <i className="settingsPPIcon"><PaperClipOutlined /></i>{" "}
            </label>
            <input id="fileInput" 
              type="file" 
              style={{ display: "none" }}
              custom
              onChange={uploadFileHandler} />
            <span onClick={()=>setupdateMode(true)}><EditOutlined /></span>

          </div>
          <label>Username</label>
          <input type="text" 
          placeholder="enter name"
          value={userInfo.userName}
          disabled />
          <label>Email</label>
          <input type="email" 
          placeholder="enter email address" 
          value={userInfo.email}
          disabled/>
          {updateMode ?( 
            <>
          <label>Password</label>
          <input 
          type="password" 
          placeholder="Password" 
          value = {userInfo.password}
          onChange={(e)=>setpassword(e.target.value)} 
          />
          <label>confirm password</label>
          <input type="password" 
          placeholder="confirm Password" 
          value = {confirmPassword}
          onChange={(e)=>setconfirmPassword(e.target.value)} />
          <button 
          className="settingsSubmitButton"
           type="submit">
            Update
          </button>
          <h4>{message}</h4>
            </>):(
            <>
            <label>Password</label>
            <input 
            type="password" 
            placeholder="Password" 
            value = {userInfo.password}
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
