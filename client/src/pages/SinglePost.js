import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import TagRow from '../components/TagRow' 
import { Link } from 'react-router-dom'
import { deletePostAction, getPostDetails, updatePost } from '../actions/postActions'
import {EditOutlined, DeleteOutlined, CommentOutlined, HeartOutlined} from '@ant-design/icons'
import { POST_CREATE_RESET, POST_EDIT_RESET } from '../constants/postConstants'

function SinglePost({match, history}) {
    const [updateMode, setupdateMode] = useState(false)
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const postDetails = useSelector(state => state.postDetails)
    const {isLoading, post, success, error} = postDetails
    const editPost = useSelector(state => state.editPost)
    const {isLoading:editisLoading, post:editedPost, success:editSuccess, error:editError} = editPost
    const deletePost = useSelector(state => state.deletePost)
    const {success:deleteSuccess} = deletePost
    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser
    const dispatch = useDispatch()
    const PF = "http://localhost:5000/public";

    useEffect(() => {
        if(editSuccess){
            dispatch({type:POST_EDIT_RESET})
            console.log('sucess')
        }else if(deleteSuccess){
            history.push('/')
        }
        if(!post || post._id !== match.params.id || success){
        dispatch(getPostDetails(match.params.id))
    }else{
        settitle(post.title)
        setdescription(post.description)
    }
    }, [dispatch, success, match.params.id, post._id])

    const handleDelete=(e)=>{
        if(window.confirm('are you sure')){
            dispatch(deletePostAction(match.params.id))
            
        }
    }
    const handleUpdate= async(e)=>{
        try{
            dispatch(updatePost({_id:match.params.id,title, description}))
            setupdateMode(false)
        }catch(error){
            console.error('not working');
        }
    }
    
    return (
        <>
        {isLoading ? <h1>still loading</h1> : error ?(<h1>{error.message}</h1>) : (
        <div className='post-container'>
        <figure>
            <Link to={`post/${post?.id}`}>
                {post.image && (
                <img src={PF + post.image} alt={post.image}/>)}
            </Link>
        </figure> 
            <TagRow tags={post.category}/>
            {updateMode ? (
                <input
                id='title'
                type='text'
                value={title}
                className='singlePostTitleInput'
                autoFocus
                onChange={(e)=>settitle(e.target.value)}
                />
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
                <span><HeartOutlined /></span>
                <span><CommentOutlined /></span>  
            </div>
    </div>)}
    </>
    )
}

export default SinglePost
