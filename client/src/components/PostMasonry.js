import React,{useEffect} from 'react'
import MasonryPost from './MasonryPost'
import {useSelector, useDispatch} from 'react-redux'
import { getTopPosts } from '../actions/postActions'
import Loader from './Loader'
import { Carousel } from 'antd';
function PostMasonry({columns, tagsOnTop}) {

    const postMansonryPosts = useSelector(state => state.postMansonryPosts)
    const {isLoading, posts, error} = postMansonryPosts
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTopPosts())
        
    }, [dispatch])
    const trendingConfig = {
        1:{
            gridArea: '1/2/3/3',
        }
    }
    
    const mergeStyles = function(posts, config){
        posts.forEach((post, index)=>{
            post.style = config[index]
        })
    }
    const trendingPosts = posts
     mergeStyles(trendingPosts, trendingConfig)
     const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };
      const windowWidth = window.innerWidth
    return (<>
      {isLoading ? <Loader/> : error ? <h1>{error}</h1> : (
        <section className='masonry' style={{gridTemplateColumns:`repeat(${columns}, minmax(275px, 1fr))`}}>
            {posts.map((post)=>
                <MasonryPost  {...{post, tagsOnTop, key:post._id}}/>
            )}
        </section>
        )}
        </>
    )
}

export default PostMasonry
