import React from 'react'
// import {Pagination} from 'antd'
import MasonryPost from './MasonryPost'
import PostComponent from './PostComponent'
function PostGrid({posts,tagsOnTop}) {
    const windowWidth = window.innerWidth
  
    return (
            <>
            {windowWidth > 900 ?
            <section className='post-grid'>
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
        
      </>
    )
}

export default PostGrid
