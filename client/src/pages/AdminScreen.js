import { Alert, Button } from 'antd'
import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../actions/categoriesAction'
import { listPosts } from '../actions/postActions'
import Loader from '../components/Loader'
import {format} from 'timeago.js'
function AdminScreen() {
    const allPosts = useSelector(state => state.allPosts)
    const {posts, isLoading, error} = allPosts
    const categoriesPost = useSelector(state => state.categoriesPost)
    const {categoriesInfo} = categoriesPost
    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser
    const dispatch = useDispatch()

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listPosts())
            dispatch(getAllCategories())
        }
    }, [dispatch])
    const handleClick=(e)=>{
        e.preventDefault(e)
    }
    return (
        <>
        {isLoading && <Loader/>}
        {error && <Alert message={error} closable/>}
        {posts.map((post)=>{
            return (<>
        <div className='card-box admin' key={post._id}>
          <div className='author-title'> 
          <Link to={`/authors/${post.userAuthor}`}>
            <span><strong style={{color:'gray', fontFamily:"Castoro", fontSize:'20px'}}>Written By: </strong>{post.userAuthor}</span>
          </Link>
          <Link to={`/post/${post._id}`}>
          <div className='title' style={{fontSize:'25px'}}>{post.title}</div>
          <span>{format (post.createdAt)}</span>

          </Link>
          </div>
        <div>
            <Button shape='round' type='default' onClick={handleClick}>Edit</Button>
        </div>
        </div>
        </>
            )
        })}
     </>
    )
}

export default AdminScreen
