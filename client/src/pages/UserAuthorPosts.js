import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getPostsByuserAuthor } from '../actions/postActions'
import PostComponent from '../components/PostComponent'
import {DoubleLeftOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import Avatar from 'antd/lib/avatar/avatar'
import Loader from '../components/Loader'
import axios from 'axios'
import { Button, message } from 'antd'
import { callUser, followUserAction, getUserDetails} from '../actions/userActions'
import { Hooks } from '../components/Hooks'
import { Redirect } from 'react-router-redux'

function UserAuthorPosts({match}) {
  const PF = 'https://res.cloudinary.com/eliashezron1/image/upload/v1626282055/userProfilePictures/noAvatar_kwzvtj.png'
    const [followed, setfollowed] = useState('')
    const followuser = useSelector(state => state.followuser)
    const {success }= followuser
    const userAuthor = match.params.userAuthor
    const allUsers = useSelector(state => state.allUsers)
    const {user, isLoading:allUsersloading, success:allUsersSuccess} = allUsers
    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser
    const userDetails = useSelector(state => state.userDetails)
    const {user:userD, isLoading:userDetailsloading, success:userDetailsSuccess} = userDetails
    const getuserAuthorPosts = useSelector(state => state.getuserAuthorPosts)
    const {isLoading, posts, error} =getuserAuthorPosts
    const dispatch = useDispatch()
    const history = useHistory
    useEffect(() => {
        if(userAuthor || userInfo){
            dispatch(getUserDetails())   
            dispatch(getPostsByuserAuthor(userAuthor))
            dispatch(callUser(userAuthor))
          }
    }, [dispatch, userAuthor, userInfo])
    // useEffect(() => {
    //   if(userDetailsSuccess && allUsersSuccess){
    //     setfollowed(userD.followings.includes(user._id))
    //   }
    // }, [])
 console.log(userD)
  console.log(user)
 console.log(followed)
    const followHandler=(e)=>{
      if(userD){
        dispatch(followUserAction({userId:user._id}))
        dispatch({type:"FOLLOW_RESET"})
        setfollowed(!followed)
      }else{
        message.warn('login to follow user')
      }
     
    }
    
      
        
    return (<>
    {isLoading ? <h1><Loader/></h1> : error ?(<h1>{error.message}</h1>) :(
      <>
      <Link to='/'><DoubleLeftOutlined /></Link>
          <div className="profileRightTop card-box container">
            <div className="profileCover"> </div>
            {window.innerWidth > 900 ? 
              <div className="profileUserImg">
              <Avatar size={150} src={user.profilePicture ?
                            user.profilePicture:
                            PF}/>
              </div>:
              <div className="profileUserImg">
              <Avatar size={80} src={user.profilePicture ?
                            user.profilePicture:
                            PF}/>
              </div>}
            
            <div className="profileInfo">
              <span className="profileInfoName">{user.userName}</span>
              <span className="profileInfoDesc">{user.userBio}</span>
            </div>
            <div className='but'>
              <span><EllipsisOutlined /></span>
              {userInfo.userName === user.userName ? 
              <Button shape='round' type='default' onClick={()=>history.push("/profile")}>
                Edit profile
              </Button> :
              <Button shape='round' type='default' onClick={followHandler}>
                {followed ? 'following' :'follow'}
              </Button>
              }
            </div>
            
          </div>
          <div style={{height:'10px'}}></div>
        <div className='container' style={{maxWidth:'800px'}}>
        {posts.map((x)=>{
            return <PostComponent post={x} key={x._id} userAuthor={x.userAuthor}/>
        })}
        </div>
        </>
    )}
        </>
    )
}

export default UserAuthorPosts
