import React from 'react'
import {categoryColors} from './CategoryColors'
import { Link } from 'react-router-dom'

function TagRow({tags}) {
    return (
        <div className='tags-container'>
            <Link to = {`/categories/${tags.categories}`}>
            {tags.map((tag, index)=>
                <span key={index} className='tag' style={{backgroundColor: categoryColors[tag]}}>
                    {tag.toUpperCase()}
                </span>
            )}
            </Link>            
        </div>
    )
}

export default TagRow
