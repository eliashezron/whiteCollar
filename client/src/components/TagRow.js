import React from 'react'
import {categoryColors} from './CategoryColors'
import { Link } from 'react-router-dom'

function TagRow({tags}) {
    return (
        <div className='tags-container'>
            {tags.map((tag)=>
            <Link to = {`/posts/${tag}`}>
                <span key={tag._id} className='tag' style={{backgroundColor: categoryColors[tag], color:'white'}}>
                    {tag.toUpperCase()}
                </span>
            </Link>            
            )}
        </div>
    )
}

export default TagRow
