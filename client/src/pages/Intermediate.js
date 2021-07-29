import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserAuthorPosts from './UserAuthorPosts'
import { Hooks } from '../components/Hooks'
import { getUserDetails } from '../actions/userActions'
import { getPostsByuserAuthor } from '../actions/postActions'

function Intermediate({match}) {
    const userAuthor = match.params.userAuthor
    const {user} = Hooks({userAuthor})
    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser
    const userDetails = useSelector(state => state.userDetails)
    const {user:userD} = userDetails
    const getuserAuthorPosts = useSelector(state => state.getuserAuthorPosts)
    const {isLoading, posts, error} =getuserAuthorPosts
    const dispatch = useDispatch()
    useEffect(() => {
        if(userAuthor || userInfo){
            dispatch(getUserDetails())   
            dispatch(getPostsByuserAuthor(userAuthor))
          }
        
    }, [userAuthor, userInfo])
    return (
        <>
        <UserAuthorPosts user={user} posts={posts} userD={userD} isLoading={isLoading} error={error}/>
        </> 
    )
}

export default Intermediate
