import React, {useEffect} from 'react'
import { trendingPosts } from '../assets/mocks/trending'
import TagRow from '../components/TagRow'
import { Link } from 'react-router-dom'


function SinglePost({match}) {
    const PF = "http://localhost:5000/images/";

        const title = match.params.title
        const post = trendingPosts.find((x)=> x.title === title)
    
    return (
            // <h1>{post.title}</h1>
        <div className='post-container'>
        <figure>
            <Link to={`post/${post?.id}`}>
                <img src={PF + post.image} alt={post.image}/>
            </Link>
        </figure> 
            <TagRow tags={post.categories}/>
            <h2 className= 'tit'>{post.title}</h2>
            <p className = 'author-text'>
                <span>
                    By: <Link to={`/authors/${post.author}`}>
                        {post.author}
                    </Link>
                </span>
                <span>
                    {post.date}
                </span>
            </p>
            <p className='description-text'>
                {post.description}
            </p>
            <Link to={post.link}>Read More ...</Link>
    </div>
    )
}

export default SinglePost
