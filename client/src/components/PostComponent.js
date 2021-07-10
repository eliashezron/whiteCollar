import React from 'react'
import {MoreOutlined ,CommentOutlined, HeartOutlined} from '@ant-design/icons'
import {format} from 'timeago.js'
import TagRow from './TagRow';
import { Link } from 'react-router-dom';

function PostComponent({post}) {
  const PF = "http://localhost:5000/public";

  const likeHandler = (e) =>{
    e.preventDefault()
  }
  const commentHandler = (e) =>{
    e.preventDefault()
  }
  const windowWidth = window.innerWidth
    return (
        <div className="card-box">
          <figure className='figure-img'>
            <img src={PF + post.image} alt={post.image}/>
          </figure>
          <TagRow tags={post.category}/>
          <div className='author-title'> 
          <Link to={`/authors/${post.userAuthor}`}><span>by {post.userAuthor}</span></Link>
          <span>{format (post.createdAt)}</span>
          <div className='title'>{post.title}</div>
          { windowWidth > 900 ? 
          (<div>
            {post.description.length <100 ? `${post.description}` : `${post.description.substring(0, 100)}...`}
          </div>)
          :(
          <div>
            {post.description.length <100 ? `${post.description}` : `${post.description.substring(0, 45)}...`}
          </div>)}
          <div className='button-icons'>
          <span onClick={likeHandler}>< HeartOutlined/></span>
          <span onClick={commentHandler}>< CommentOutlined/></span>
          </div>
          </div>
      </div>
    );
  }       

export default PostComponent
