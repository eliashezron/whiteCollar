import React, { Component } from 'react'
import { trendingPosts } from './assets/mocks/trending'

const posts = [...trendingPosts,...trendingPosts,...trendingPosts]
const BlogContext = React.createContext()

class BlogProvider extends Component {
    state = {
        posts:[]
    }
    componentDidMount(){
        let posts = this.formatData(posts)
        this.setState({
            posts
        })
    }
    formatData(posts){
        let displayPosts = posts.map(item=>{
            let id = post.id
            let posts = {...id}

            return posts
        })
        return displayPosts
    }
    getPost = (id) =>{
        let posts = [...this.state.posts]
        const post = posts.find(post => post.id === id)
        return post
    }
    render() {
        return (
            <BlogContext.Provider value={{...this.state, getPost: this.getPost}}>
                {this.props.children}
            </BlogContext.Provider>
        )
    }
}

const BlogConsumer = BlogContext.Consumer

export function withBlogConsumer(.)