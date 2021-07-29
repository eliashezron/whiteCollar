import React, {useState, useEffect, useMemo} from 'react'
import {Link} from 'react-router-dom'
// import {Pagination} from 'antd'
import {TagRow} from './TagRow'
import MasonryPost from './MasonryPost'
import PostComponent from './PostComponent'
function PostGrid({posts,tagsOnTop}) {
    // const PF = "http://localhost:5000/public";

    // const [pageSize, setPageSize] = useState(9)
    // const [current, setCurrent] = useState(1)

    // const paginatedPosts = useMemo(()=>{
    //     const lastIndex  = current*pageSize
    //     const firstIndex = lastIndex-pageSize
        
    //     return posts.slice(firstIndex, lastIndex)

    // }, [current, pageSize, posts])

    const windowWidth = window.innerWidth
    // useEffect(()=>{
    //     window.scroll({
    //         top:0,
    //         left:0,
    //         behavior: 'smooth'
    //     },[ current, pageSize])
    // })
    return (
        <section className='grid-pagination-container'>
            {windowWidth > 900 ?
            <section className='post-grid container'>
                {posts.map((post)=>(
                    <PostComponent post={post} key={post._id} userAuthor={post.userAuthor}/>
                ))}
            </section> :(
                <>
                {posts.map((post, index)=>
                    <MasonryPost  {...{post, tagsOnTop, key:index}}/>
                )}
                </>

            )}
            {/* <Pagination
            simple
            showSizeChanger
            onShowSizeChange={setPageSize}
            total={posts.length}
            defaultCurrent={current}
            onChange={setCurrent}
            /> */}
        </section>
    )
}

export default PostGrid
