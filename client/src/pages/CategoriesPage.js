import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getPostsByCategory } from '../actions/postActions'
import PostComponent from '../components/PostComponent'
import {DoubleLeftOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import {categoryColors} from '../components/CategoryColors'
import Loader from '../components/Loader'
import {Button, message} from 'antd'
import Usercard from '../components/Usercard'
import { getTopUsers } from '../actions/userActions'
import axios from 'axios'
import {followCategoryAction} from '../actions/userActions'
function CategoriesPage({match}) {
    const category = match.params.category
    const [followed, setfollowed] = useState(false)
    const [specificCategory, setspecificCategory] = useState('')
    const getcategoryPosts = useSelector(state => state.getcategoryPosts)
    const {isLoading, posts, error} =getcategoryPosts
    const topUsers = useSelector(state => state.topUsers)
    const {users}= topUsers
    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} =loginUser
    const dispatch = useDispatch()
    useEffect(async() => {
        dispatch(getPostsByCategory(category))
        dispatch(getTopUsers())
        const {data} = await axios.get(`/api/categories?category=${category}`)
        setspecificCategory(data)
        if(userInfo){
            setfollowed(userInfo.preferedCategories.includes(data?._id))
        }
    }, [dispatch, category, userInfo])
  
    const followHandler=(e) =>{ 
        if(userInfo){
            dispatch(followCategoryAction({categoryId:specificCategory._id}))
            dispatch({type:"CATEGORY_FOLLOW_RESET"})
            setfollowed(!followed)
        }else{
            message.warn('login to follow category')
        }         
      
    }

    return (<>
        <div style={{backgroundColor:categoryColors[category]}} className='card-box category-box container'>
            <div className='cat1'>
                <span>#{category}</span>
                <Button type='default' shape='round' size={50} onClick={followHandler}>
                {followed ? 'following' :'follow'}
                </Button>
            </div>
        </div>
        <Link to='/'><DoubleLeftOutlined /></Link>
        {isLoading ? <h1><Loader/></h1> : error ?(<h1>{error.message}</h1>) :(
        <section className='container'style={{display:"flex"}}>
            <div className='row post-grid'style={{flex:"8"}}>
        {posts.map((x)=>{
            return <PostComponent post={x} key={x._id} userAuthor={x.userAuthor}/>
        })}
            </div>
            <div style={{flex:"4"}}>
                <Usercard users={users} Category={category}/>
            </div>
        </section>)}
        </>
    )
}

export default CategoriesPage
