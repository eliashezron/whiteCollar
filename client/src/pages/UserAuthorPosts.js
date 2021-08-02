import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getPostsByuserAuthor } from '../actions/postActions'
import PostComponent from '../components/PostComponent'
import {DoubleLeftOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Link} from 'react-router-dom'
import Avatar from 'antd/lib/avatar/avatar'
import Loader from '../components/Loader'
import { Button, message } from 'antd'
import Meta from '../components/Meta'
import { callUser, followUserAction, getUserDetails} from '../actions/userActions'

 function UserAuthorPosts({match, history}) {
  const PF = 'https://res.cloudinary.com/eliashezron1/image/upload/v1626282055/userProfilePictures/noAvatar_kwzvtj.png'
    const [followed, setfollowed] = useState('')
    // const followuser = useSelector(state => state.followuser)
    // const {success }= followuser
    const userAuthor = match.params.userAuthor
    const allUsers = useSelector(state => state.allUsers)
    const {user} = allUsers
    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser
    const userDetails = useSelector(state => state.userDetails)
    const {user:userD} = userDetails
    const getuserAuthorPosts = useSelector(state => state.getuserAuthorPosts)
    const {isLoading, posts, error} =getuserAuthorPosts
    const dispatch = useDispatch()
    useEffect(() => {
      window.scrollTo(0, 0)
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
//  console.log(userD)
//   console.log(user)
//  console.log(followed)
    const followHandler=(e)=>{
      if(userD){
        dispatch(followUserAction({userId:user._id}))
        dispatch({type:"FOLLOW_RESET"})
        setfollowed(!followed)
      }else{
        message.info('login to follow user')
      }
     
    }
    const PF1 = 'https://res.cloudinary.com/eliashezron1/image/upload/v1627808725/postImages/logo-1627808732771.png'

    const imageBackground ={
      backgroundImage:`url(${user.coverPhoto})`
    }
    const imageBackground1 ={
      backgroundImage:`url(${PF1})`
 
    }
    const style = user.coverPhoto ? {...imageBackground, ...user.style} : imageBackground1
    return (<>
    {user&& <Meta title={`${user.userName} profile`}/>}
    {isLoading ? <h1><Loader/></h1> : error ?(<h1>{error.message}</h1>) :(
      <>
      <Link to='/'><DoubleLeftOutlined /></Link>
          <div className="profileRightTop card-box container">
            <div className="profileCover" style={style}>
              <div className='image-text'>
              <span>{user.userBio}</span>
              <span>{user.profession}</span>
              <span>{user.workplace}</span>
              </div>
            </div>
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
              {/* <span className="profileInfoDesc">{user.userBio}</span> */}
            </div>
            <div className='but'>
              <span><EllipsisOutlined /></span>
              {userInfo && userInfo.userName === user.userName ?
              <Button shape='round' type='default' onClick={()=>history.push('/profile')}>
                Edit profile
              </Button>:
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
