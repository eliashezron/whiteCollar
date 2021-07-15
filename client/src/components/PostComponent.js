import React, { useState } from 'react'
import {CommentOutlined, HeartOutlined} from '@ant-design/icons'
import {format} from 'timeago.js'
import TagRow from './TagRow';
import { Link } from 'react-router-dom';

function PostComponent({post}) {
  const PF = "http://localhost:5000/public";

  const windowWidth = window.innerWidth
    return (
     
        <div className="card-box">
          <Link to={`/post/${post._id}`}>
            <figure className='figure-img'>
            <img src={post.image} alt={post.image}/>
          </figure>
          </Link>
          <TagRow tags={post.category}/>
          <div className='author-title'> 
          <Link to={`/authors/${post.userAuthor}`}><span>by {post.userAuthor}</span></Link>
          <span>{format (post.createdAt)}</span>
          <Link to={`/post/${post._id}`}>
          <div className='title'>{post.title}</div>
          { windowWidth > 900 ? 
          (<div className='post-description'>
            {post.description.length <100 ? `${post.description}` : `${post.description.substring(0, 100)}...`}
          </div>)
          :(
          <div>
            {post.description.length <100 ? `${post.description}` : `${post.description.substring(0, 45)}...`}
          </div>)}
          <div className='button-icons'>
          <span>< HeartOutlined/>{post.likes.length === 0 ? '': `${post.likes.length}`}</span>
          <span>< CommentOutlined/>{post.numberOfComments === 0 ? '': `${post.numberOfComments}`}</span>
          </div>
          </Link>
          </div>
      </div>
     
    );
  }       

export default PostComponent
