import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getPostsByuserAuthor } from '../actions/postActions'
import PostComponent from '../components/PostComponent'
import {DoubleLeftOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Avatar from 'antd/lib/avatar/avatar'
import Loader from '../components/Loader'
import axios from 'axios'
import { Button, message } from 'antd'
import { followUserAction} from '../actions/userActions'

function UserAuthorPosts({match, history}) {
  const PF = 'https://res.cloudinary.com/eliashezron1/image/upload/v1626282055/userProfilePictures/noAvatar_kwzvtj.png'
    const userAuthor = match.params.userAuthor
    const [user, setuser] = useState('')
    const [followed, setfollowed] = useState(false)
    const loginUser = useSelector(state => state.loginUser)
    const {userInfo } = loginUser
    const getuserAuthorPosts = useSelector(state => state.getuserAuthorPosts)
    const {isLoading, posts, error} =getuserAuthorPosts
    const followuser = useSelector(state => state.followuser)
    const {success }= followuser
    const dispatch = useDispatch()
    useEffect(async() => {
      if(userAuthor || userInfo){
        dispatch(getPostsByuserAuthor(userAuthor))
        const {data} = await axios.get(`/api/users?userName=${userAuthor}`)
         setuser(data)
         setfollowed(userInfo.followings.includes(data._id)) 
         
      }
    }, [dispatch, userAuthor])
    console.log(followed)
      console.log(userInfo.followings)
      console.log(user._id)

    const followHandler=(e)=>{
      
        dispatch(followUserAction({userId:user._id}))
        dispatch({type:"FOLLOW_RESET"})
        setfollowed(!followed)
     
    }
    const editProfile = (e) =>{
      history.push('/profile')      
    }
    
    return (<>
    {isLoading ? <h1><Loader/></h1> : error ?(<h1>{error.message}</h1>) :(
      <>
      <Link to='/'><DoubleLeftOutlined /></Link>
          <div className="profileRightTop card-box container">
            <div className="profileCover"> </div>
              <div className="profileUserImg">
              <Avatar size={150} src={user.profilePicture ?
                            user.profilePicture:
                            PF}/>
              </div>
            
            <div className="profileInfo">
              <span className="profileInfoName">{user.userName}</span>
              <span className="profileInfoDesc">{user.userBio}</span>
            </div>
            <div className='but'>
              <span><EllipsisOutlined /></span>
              {userInfo.userName === user.userName ? 
              <Button shape='round' type='default' onClick={editProfile}>
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
