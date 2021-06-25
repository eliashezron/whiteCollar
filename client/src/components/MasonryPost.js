import React from 'react'
import { Link } from 'react-router-dom'
import TagRow from './TagRow'
function MasonryPost({post, tagsOnTop}) {
    const windowWidth = window.innerWidth
    const imageBackground ={
        backgroundImage: `url("${require(`../assets/images/${post.image}`)}")`
    }

    const style = windowWidth>900 ? {...imageBackground, ...post.style} : imageBackground
    return (
        <div className='masonry-post overlay' style={style}>
        <Link to= {`/post/${post.id}`}>
            <div className='image-text' style={{justifyContent: tagsOnTop ? 'space-between': 'flex-end'}}>
                <TagRow tags={post.categories}/>
                <div>
                    <h2 className="image-title">{post.title}</h2>
                    <span className='image-date'>{post.date}</span>
                </div>
            </div>
        </Link>
        </div>
    )
}

export default MasonryPost
