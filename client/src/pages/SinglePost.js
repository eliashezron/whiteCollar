import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import TagRow from '../components/TagRow' 
import { Link } from 'react-router-dom'
import { deletePostAction,likePostAction, getPostDetails, updatePost, commentPostAction, getPostDetailsComments } from '../actions/postActions'
import {EditOutlined, DeleteOutlined, CommentOutlined,DoubleLeftOutlined, HeartOutlined} from '@ant-design/icons'
import { POST_COMMENT_RESET, POST_CREATE_RESET, POST_EDIT_RESET } from '../constants/postConstants'
import {format} from 'timeago.js'
import {PaperClipOutlined} from '@ant-design/icons'
import { message } from 'antd'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

// import Pusher from '../../../backend/node_modules/pusher'


const CommentSection = ({comment}) => {
    return(
        <div className='comment-section'>
            <div className='comments'>
               <div className='head'>
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

function SinglePost({match, history}) {
    const [updateMode, setupdateMode] = useState(false)
    const [title, settitle] = useState('')
    const [image, setimage] = useState('')
    const [description, setdescription] = useState('')
    const [like, setlike] = useState('')
    const [isliked, setisliked] = useState(false)
    const [comment, setcomment] = useState('')
    const [previewsource, setpreviewsource] = useState('')
    const [uploading, setuploading] = useState(false)
  
    const postDetails = useSelector(state => state.postDetails)
    const {isLoading, post, success, error} = postDetails
    const editPost = useSelector(state => state.editPost)
    const {isLoading:editisLoading, post:editedPost, success:editSuccess, error:editError} = editPost
    const commentPost = useSelector(state => state.commentPost)
    const {error:commentPostError, success: commentPostSuccess} = commentPost
    const deletePost = useSelector(state => state.deletePost)
    const {success:deleteSuccess} = deletePost
    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser
    const dispatch = useDispatch()
    const PF = "http://localhost:5000/public";
    
    useEffect(() => {
        if(editSuccess){
            dispatch({type:POST_EDIT_RESET})
        }else{
       
        if(!post._id || post._id !== match.params.id){
            dispatch(getPostDetails(match.params.id))
        }else{
            settitle(post.title)
            setdescription(post.description)
            setimage(post.image)
            setlike(post.likes.length)
        }
         }
        if(commentPostSuccess){
               dispatch({type:POST_COMMENT_RESET})
               console.log('success')
           }
    }, [dispatch, match.params.id, commentPostSuccess, editSuccess, deleteSuccess, like, post])


    console.log(title)
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
          const {data} = await axios.post('/api/upload', formData, config)
          console.log(data)
          setimage(data)
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
    
    const handleDelete=(e)=>{
        if(window.confirm('are you sure')){
            dispatch(deletePostAction(match.params.id))
            history.push('/')
        }
    }
    const handleUpdate= async(e)=>{
        try{
            dispatch(updatePost({_id:match.params.id,title, description, image}))
            setupdateMode(false)
        }catch(error){
            console.error('not working');
        }
    }
    const likeHandler = (e) =>{
        if(userInfo){
              dispatch(likePostAction(match.params.id,{userName:userInfo.userName}))
        setlike(isliked ? like -1 : like + 1)
        setisliked(!isliked)
        if(isliked){
            message.success('post has been liked')
        }else{
            message.success('post has been disliked')
        }
        }else{
            message.warning('login in to like post')
        }
      
      }
      const commentHandler = (e) =>{
          if(userInfo){
              dispatch(commentPostAction(match.params.id,{comment:comment}))
              if(!commentPostSuccess){
                  message.success('comment submitted')
              }else{
                  message.error('error occuried')
              }
          }else{
              message.warning('only users can comment')
          }
        
    
      }
      console.log(post)
    return (
        <>
            <Link to='/'><DoubleLeftOutlined /></Link>
            {isLoading ? <h1><Loader/></h1> : error ?(<h1>{error.message}</h1>) :(<>
                <Meta title={post.title}/>
            <div className='post-container'>
                    {uploading ? (<h1>uploading</h1>) : 
            previewsource  ? (
            <img
            className="writeImg"
            src={previewsource}
            alt=""
            />
                ):
                   ( <figure>
                <Link to={`post/${post?.id}`}>
                    {post.image && (
                    <img src={post.image} alt={post.image}/>)}
                </Link>
            </figure>)} 
                <TagRow tags={post.category}/>
            {updateMode ? (
                <div>
                <label htmlFor="fileInput">
                <i className="writeIcon">
                <PaperClipOutlined /></i>
                 </label>
                <input id="fileInput" 
                type="file" 
                style={{ display: "none" }}
                custom
                 onChange={uploadFileHandler} />
                <input
                id='title'
                type='text'
                value={title}
                className='singlePostTitleInput'
                autoFocus
                onChange={(e)=>settitle(e.target.value)}
                />
                </div>
            ):(
            <h2 className= 'singlePostTitle'>{post.title}
            {post.userAuthor === userInfo?.userName && (
                <div className='singlePostEdit'>  
                    <span onClick={()=>setupdateMode(true)}><EditOutlined /></span>
                    <span onClick={handleDelete}><DeleteOutlined /></span>
                </div>
            )}
            </h2>
            )}
            <p className = 'author-text'>
                <span>
                    By: <Link to={`/authors/${post.userAuthor}`}>
                        {post.userAuthor}
                    </Link>
                </span>
                <span>
                    {new Date(post.createdAt).toDateString()}
                </span>
            </p>
            {updateMode ? (
                <textarea
                className='singlePostDescInput'
                type='text'
                value={description}
                onChange={(e)=>setdescription(e.target.value)}
                />
            ):(
            <p className='description-text'>
                {post.description}
            </p>
            )}
            {updateMode && (
                <button className='singlepostButton'
                type='button'
                onClick={handleUpdate}> 
                Update
                </button>
            )}
            <div className='likesection'>
                <span onClick={likeHandler}><HeartOutlined />{like=== 0 ? '':like}</span>
                <span><CommentOutlined />{post.comments.length === 0 ? '': `${post.comments.length}`}</span>  
            </div>
            <div class="flash-comments">
            {userInfo ? (
                <form class="pure-form" id="comment-form" onSubmit={commentHandler}>
                <div class="row">
                <div className='text-area'>
                <textarea 
                className='comment-input'
                placeholder="add to discussion" 
                value={comment}
                onChange={(e)=>setcomment(e.target.value)}
                />
                </div>
                <div class="right-side">
                    <button 
                        type="submit"
                        class="button-secondary pure-button"
                        >Submit
                    </button>
                 </div>
                </div>
                </form>):(<>
                    <div>
                       <span>please <Link to='/login'>login in</Link> to comment</span> 
                    </div></>
                 )}
                <div>
                {post.comments.map(x=>{
                    return<CommentSection comment={x} key={x._id}/>
                })}
                </div>
            </div>
    </div>
    </>)}
    </>
    )
}

export default SinglePost
