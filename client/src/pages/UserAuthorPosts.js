import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getPostsByuserAuthor } from '../actions/postActions'
import PostComponent from '../components/PostComponent'
import {DoubleLeftOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'

function CategoriesPage({match}) {
    const userAuthor = match.params.userAuthor
    const getuserAuthorPosts = useSelector(state => state.getuserAuthorPosts)
    const {isLoading, posts, error} =getuserAuthorPosts
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPostsByuserAuthor(userAuthor))
    }, [dispatch, userAuthor])

    return (<>
            <Link to='/'><DoubleLeftOutlined /></Link>
        <div className='post-grid container'>
        {posts.map((x)=>{
            return <PostComponent post={x} key={x._id}/>
        })}
        </div>
        </>
    )
}

export default CategoriesPage
