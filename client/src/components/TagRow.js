import React from 'react'
import {categoryColors} from './CategoryColors'
import { Link } from 'react-router-dom'
import {Tag} from 'antd'

export function TagRow({tags}) {
    return (
        <div className='tags-container'>
            {tags.map((tag)=>
            <Link to = {`/posts/${tag}`}>
                <Tag key={tag._id} className='tag' color={categoryColors[tag]} style={{backgroundColor:'white', fontFamily:'nunito',fontWeight:'700', height:'fit-content'}} >
                    {tag.toUpperCase()}
                </Tag>
            </Link>            
            )}
        </div>
    )
}


export const Tags = ({tags}) =>{
    return(
        <div className='tags-containers'>
        {tags.map((tag)=>
        <Link to = {`/posts/${tag}`}>
            <span key={tag._id} className='tags'  style={{color:categoryColors[tag], backgroundColor:'white', fontFamily:'nunito',fontWeight:'700', height:'fit-content'}} >
                #{tag.toUpperCase()}
            </span>
        </Link>            
        )}
    </div>
    )
}
