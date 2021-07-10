import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostMasonry from '../components/PostMasonry'
import PostGrid from '../components/PostGrid'
import { listPosts } from '../actions/postActions'
import { getAllCategories } from '../actions/categoriesAction'


export default function Home({match}) {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const allPosts = useSelector(state => state.allPosts)
    const {isLoading, error, posts, page, pages} = allPosts

    const dispatch = useDispatch()
    
    useEffect(()=>{
            dispatch(getAllCategories())
            dispatch(listPosts(keyword, pageNumber))
    },[dispatch, keyword, pageNumber])
    
    
     const recentPosts =[...posts, ...posts, ...posts]

    return (
        <>
        {isLoading ? <h1>still loading</h1> : error ?(<h1>{error.message}</h1>) :
        (<div className='home'>
        <section className='container'>
        <div className='row'>
            <h2>trending Posts</h2>
            <PostMasonry columns={3} tagsOnTop={true}/>
        </div>
    </section>
    <section className='container'>
        <div className='row'>
            <h2>recent posts</h2>
            <PostGrid posts={recentPosts} tagsOnTop={true}/>
        </div> 
    </section>
    </div>)}
        </>
    )
}


