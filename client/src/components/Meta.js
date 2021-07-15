import React from 'react'
import {Helmet} from "react-helmet"

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keyword' content={keywords}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'WHITEPEN',
    description: 'Share your experience with the world',
    keywords:'engineering, art, surveying, economics'
}

export default Meta
