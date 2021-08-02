import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Tags} from '../components/TagRow' 
import { Link } from 'react-router-dom'
import { deletePostAction,likePostAction, getPostDetails, updatePost, commentPostAction} from '../actions/postActions'
import {EditOutlined, DeleteOutlined, CommentOutlined,DoubleLeftOutlined, HeartOutlined,CloseOutlined} from '@ant-design/icons'
import { POST_COMMENT_RESET, POST_EDIT_RESET, POST_LIKE_RESET } from '../constants/postConstants'
import {PaperClipOutlined} from '@ant-design/icons'
import { Button, message } from 'antd'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import CommentSection from '../components/CommentSection'
import { callUser } from '../actions/userActions'
import Avatar from 'antd/lib/avatar/avatar'
import {savePostAction} from '../actions/userActions'




function SinglePost({match, history}) {
    const [updateMode, setupdateMode] = useState(false)
    const [title, settitle] = useState('')
    const [image, setimage] = useState('')
    const [description, setdescription] = useState('')
    const [like, setlike] = useState('')
    const [isliked, setisliked] = useState(false)
    const [comment, setcomment] = useState('')
    const [divActive, setdivActive] = useState(false)
    const [previewsource, setpreviewsource] = useState('')
    const [uploading, setuploading] = useState(false)
    const [save, setsave] = useState(false)
  
    const postDetails = useSelector(state => state.postDetails)
    const {isLoading, post, error} = postDetails
    const editPost = useSelector(state => state.editPost)
    const {success:editSuccess} = editPost
    const commentPost = useSelector(state => state.commentPost)
    const { success: commentPostSuccess} = commentPost
    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser
    const allUsers = useSelector(state => state.allUsers)
    const {user} = allUsers
    const dispatch = useDispatch()
    const PF = 'https://res.cloudinary.com/eliashezron1/image/upload/v1626282055/userProfilePictures/noAvatar_kwzvtj.png'
    useEffect(() => {
        window.scrollTo(0, 0)
        if(!post._id || post._id !== match.params.id){
            dispatch(getPostDetails(match.params.id))
          
        } else{
            dispatch(callUser(post.userAuthor))
            settitle(post.title)
            setdescription(post.description)
            setimage(post.image)
            setlike(post.likes.length)
        }
    
    }, [dispatch, match.params.id, post])
     

    useEffect(() => {
        if(editSuccess){
            dispatch({type:POST_EDIT_RESET})
        }
    }, [dispatch, editSuccess])
    useEffect(() => {
        if(userInfo && userInfo.readingList.includes(post._id)){
            setsave(userInfo.readingList.includes(post._id))
        }

    }, [dispatch, userInfo, post._id])
    useEffect(() => {
        if(commentPostSuccess){
            dispatch({type:POST_COMMENT_RESET})
            console.log('success')
        }
    }, [dispatch, commentPostSuccess])

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
            message.success('post deleted')
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
              dispatch(likePostAction(match.params.id))
              dispatch({type:POST_LIKE_RESET})
        setlike(isliked ? like -1 : like + 1)
        setisliked(!isliked)
        if(isliked){
            message.success('post has been disliked')
        }else{
            message.success('post has been liked')
        }
        }else{
            message.info('login in to like post')
        }
      
      }
      const commentHandler = (e) =>{
          if(userInfo){
              dispatch(commentPostAction(match.params.id,{comment:comment}))
              if(!commentPostSuccess){
                  message.success('comment submitted')
                  window.location.reload ()
              }else{
                  message.error('error occuried')
              }
          }else{
              message.warning('login to comment on post')
          }
      }
      const handleSave = (e) =>{
          if(userInfo){
              dispatch(savePostAction({postId:post._id}))
              setsave(!save)
              dispatch({type:"SAVE_RESET"})
              if(save){
                message.info('post removed from reading list')
                }else{
                  message.success('post added to reading list')
              }
          }else{
            message.info('login to create a reading list')
          }
      }
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
                    {post.image && (
                    <img src={post.image} alt={post.image}/>)}
            </figure>)} 
            <div className='tagspost'>
                <Tags tags={post.category}/>
            </div>
            {updateMode ? (<>
                <div>
                <label htmlFor="fileInput">
                <i className="writeIcon">
                <PaperClipOutlined size={40}/></i>
                 </label>
                <input id="fileInput" 
                type="file" 
                style={{ display: "none" }}
                custom
                 onChange={uploadFileHandler} />
                 </div>
                <div>
                <input
                id='title'
                type='text'
                value={title}
                className='singlePostTitleInput'
                autoFocus
                onChange={(e)=>settitle(e.target.value)}
                />
                </div></>
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
               {user && <Link to={`/authors/${post.userAuthor}`}>
                    <Avatar size={40} src={user.profilePicture ?
                        user.profilePicture:
                        PF}/>
                </Link>}
                </span>
                <span>
                    <Link to={`/authors/${post.userAuthor}`}>
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
                <div style={{display:'flex', justifyContent:'center'}}>
                <Button 
                type='button'
                onClick={handleUpdate}> 
                Update
                </Button>
                <Button
                type='button'
                onClick={()=>setupdateMode(false)}> 
                Cancel
                </Button>
                </div>
            )}
            <div className='likesection' style={{display:'flex', justifyContent:'space-between'}}>
                <div>
                <span onClick={likeHandler} style={{cursor:'pointer'}}><HeartOutlined />{like === 0 ? '': like}</span>
                <span ><CommentOutlined style={{cursor:'pointer'}} onClick={()=>setdivActive(!divActive)}/>{post.comments.length === 0 ? '': `${post.comments.length}`}</span>  
                </div>
                <div style={{height:'fit-content', width:'fit-content'}}>
                <Button shape='round' type='default' onClick={handleSave}>
                {save ? 'saved' : 'save'}
                </Button>
                </div>
            </div>
            <div className={`flash-comments ${divActive && 'active' }`} >
                <div className='closediv' onClick={()=>setdivActive(false)}><CloseOutlined style={{position:'sticky'}}/></div>
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
                 {user &&
                 <div className=' box' style={{position:'relative',zIndex:'1'}} >
                     <div className='avatar-div'>
                    <Link to={`/authors/${post.userAuthor}`}>
                    <Link to ={`/authors/${post.userAuthor}`}>
                        { window.innerWidth> 900 ?
                        <Avatar size={100} src={user.profilePicture ?
                            user.profilePicture:
                            PF}/>:
                        <Avatar size={75} src={user.profilePicture ?
                            
                            user.profilePicture:
                            PF}/>}
                    </Link>
                    </Link></div>
                    <div className='div'>
                    <span>WRITTEN BY</span>
                    <span>{user.userName}</span>
                    <p>{user.userBio}</p>
                    </div>
                
                </div>}
                <div className='last'></div>
    </div>
    </>)}
    </>
    )
}

export default SinglePost
