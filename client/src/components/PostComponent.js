import React,{useEffect, useState} from 'react'
import {CommentOutlined, HeartOutlined} from '@ant-design/icons'
import {format} from 'timeago.js'
import {TagRow} from './TagRow';
import { Link } from 'react-router-dom';
import Avatar from 'antd/lib/avatar/avatar'
// import { Hooks } from './Hooks';
import {useDispatch } from 'react-redux';
import axios from 'axios';
function PostComponent({post, userAuthor}) {
  const PF = 'https://res.cloudinary.com/eliashezron1/image/upload/v1626282055/userProfilePictures/noAvatar_kwzvtj.png'
  const [user, setuser] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    let isMounted = true
    async function fetchUser(){
    const {data} = await axios.get(`/api/users?userName=${userAuthor}`)
    if(isMounted){
      setuser(data)
    }
  }
  fetchUser()
  return()=>{isMounted = false}
    
  }, [dispatch, userAuthor])

  const windowWidth = window.innerWidth
  
    return (
        <div className="card-box">
          <Link to={`/post/${post._id}`}>
            <figure className='figure-img'>
            <img src={post.image} alt={post.image}/>
          </figure>
          </Link>
          <div className='tagspost'>
          <TagRow tags={post.category} />
          </div>
          <div className='author-title'> 
          <Link to={`/authors/${post.userAuthor}`}>
          {user && 
                    <Avatar size={35} src={user.profilePicture ?
                        user.profilePicture:
                        PF}/>
          }
            <span>{post.userAuthor}</span>
          </Link>
          <span>{format (post.createdAt)}</span>
          <Link to={`/post/${post._id}`}>
          <div className='title'>{post.title}</div>
          { windowWidth > 900 ? 
          (<div className='post-description'>
            {post.description.length <100 ? `${post.description}` : `${post.description.substring(0, 180)}...`}
          </div>)
          :(
          <div>
            {post.description.length <100 ? `${post.description}` : `${post.description.substring(0, 45)}...`}
          </div>)}
          <div className='button-icons'>
          <span>< HeartOutlined />{post.likes.length === 0 ? '': `${post.likes.length}`}</span>
          <span>< CommentOutlined />{post.numberOfComments === 0 ? '': `${post.numberOfComments}`}</span>
          </div>
          </Link>
          </div>
      </div>
     
    );
  }       

export default PostComponent
