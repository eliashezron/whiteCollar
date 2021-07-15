import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getPostsByCategory } from '../actions/postActions'
import PostComponent from '../components/PostComponent'
import {DoubleLeftOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'


function CategoriesPage({match}) {
    const category = match.params.category
    const getcategoryPosts = useSelector(state => state.getcategoryPosts)
    const {isLoading, posts, error} =getcategoryPosts
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPostsByCategory(category))
    }, [dispatch, category])

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
