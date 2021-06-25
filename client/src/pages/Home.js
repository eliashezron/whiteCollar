import React from 'react'
import PostMasonry from '../components/PostMasonry'
// import featuredPosts from '../assets/mocks/featured'
import {trendingPosts}from '../assets/mocks/trending'
import PostGrid from '../components/PostGrid'
const trendingConfig = {
    1:{
        gridArea: '1/2/3/3',
    }
}

const mergeStyles = function(posts, config){
    posts.forEach((post, index)=>{
        post.style = config[index]
        post.author = 'elias hezron'
        post.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo, aliquid, dicta beatae quia porro id est.'
    })
}
 mergeStyles(trendingPosts, trendingConfig)

const recentPosts =[...trendingPosts, ...trendingPosts, ...trendingPosts]

export default function Home() {
    return (
        <>
            <section className='container home'>
                <div className='row'>
                    <h2>trending Posts</h2>
                    <PostMasonry posts={trendingPosts} columns={3} tagsOnTop={true}/>
                </div>
            </section>
            <section className='container'>
                <div className='row'>
                    <h1>recent posts</h1>
                    <PostGrid posts={recentPosts}/>
                </div> 
            </section>
            
        </>
    )
}


