import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {format} from 'timeago.js'
import axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar'
const CommentSection = ({comment, userAuthor}) => {
    const PF = 'https://res.cloudinary.com/eliashezron1/image/upload/v1626282055/userProfilePictures/noAvatar_kwzvtj.png'

     const [user, setuser] = useState('')
        const dispatch = useDispatch()
       useEffect(async() => {
         const {data} = await axios.get(`/api/users?userName=${userAuthor}`)
         setuser(data)
       }, [dispatch, userAuthor])
    return(
        <div className='comment-section'>
            <div className='comments'>
               <div className='head'>
                {user && <Link to = '/profile'>
                            <Avatar size={30} src={user.profilePicture ?
                                user.profilePicture:
                                PF}/>
                </Link>}
                  <Link to={`/authors/${comment.userAuthor}`}>
                      <span>{comment.userName}</span>
                    </Link> 
                  <span>{format (comment.createdAt)}</span>
               </div>
               <div className='body'>
                   {comment.comment}
               </div>
            </div>
        </div>
    )
}

export default CommentSection