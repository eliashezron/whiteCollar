import Avatar from 'antd/lib/avatar/avatar'
import React,{useEffect} from 'react'
import {Divider,Button } from 'antd';
import { categoryColors } from './CategoryColors';
import { Link } from 'react-router-dom'
import { getReadingList } from '../actions/userActions';
import {useDispatch, useSelector} from 'react-redux'
import {format} from 'timeago.js'

function Usercard({categories, users, Category}) {
    const PF = 'https://res.cloudinary.com/eliashezron1/image/upload/v1626282055/userProfilePictures/noAvatar_kwzvtj.png'
    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser
    const dispatch = useDispatch()
    const getreadingList = useSelector(state => state.getreadingList)
    const {readingList} = getreadingList
    useEffect(() => {
      if(userInfo){
        dispatch(getReadingList())
      }
    }, [dispatch, userInfo])
    return (
      <>
      {categories &&
      <div className='categories-tags'>
        <Divider orientation="left">recommended categories</Divider>
            <div className='tags-category'>
              {categories.map((category)=>{
                return(
                  <Link to = {`/posts/${category.category}`}>
                  <Button shape='round' style={{color:categoryColors[category.category]}} key={category._id}>{category.category}</Button>
                  </Link>
                )
              })}
            </div>
      </div>}
      {Category &&
      <div className='categories-tags' style={{height:'150px'}}>
        <Divider orientation="left">selected Category</Divider>
            <div className='tag-category'>
                  <Button shape='round' style={{color:categoryColors[Category]}} >{Category}</Button> 
                  <p>follow category to keep up with the lastest posts on <strong>{Category}</strong></p>    
            </div>
      </div>}
      
      {users &&
      <div className='users-section' style={{borderBottom:' 1px solid lightgray'}}>
        <Divider orientation="left">WHO TO FOLLOW</Divider>
      {users.map((user)=>{
               return (
                 <div className='users-list'>
                   <ul>
                     <div className='div2' key={user._id}>
                     <Link to={`/authors/${user.userName}`}>
                     <Avatar size={60} src={user.profilePicture ?
                            user.profilePicture:
                            PF}/>
                      </Link>
                      <Link to={`/authors/${user.userName}`}>
                      <div className='div3'>
                        <span>{user.userName}</span>
                        <span>{user.userBio}</span>
                      </div>
                      </Link>
                      <Link to={`/authors/${user.userName}`}>
                      <Button type="default" size={40} shape='round'>
                      View Posts
                      </Button>
                      </Link>
                     </div>
                   </ul>
                 </div>
               )
             })}
      </div>
      }
      {readingList &&
      <div>
        <Divider orientation="left" style={{fontSize:'24px', fontFamily:'Raleway', fontWeight:'200px', paddingTop:'25px', paddingBottom:'15px'}}>Your Reading List</Divider>
        {readingList.map((post)=>{
          return(
          <div className='card-box card-read' key={post._id}>
          <div className='author-title'> 
          <Link to={`/authors/${post.userAuthor}`}>
            <span><strong style={{color:'gray', fontFamily:"Castoro", fontSize:'20px'}}>Written By: </strong>{post.userAuthor}</span>
          </Link>
          <Link to={`/post/${post._id}`}>
          <div className='title' style={{fontSize:'25px'}}>{post.title}</div>
          <span>{format (post.createdAt)}</span>

          </Link>
          </div>
          </div>
          )
        })}
      </div>}
      </>
   

    )
}

export default Usercard
