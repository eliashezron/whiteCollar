import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { createPost, deletePost, likePost, commentPost, editPost, getCategoryPostsReducer, getPostsReducer, getSinglePost, getTopPostsReducer, getUserAuthorPostsReducer, getSinglePostComments } from './Reducers/postReducer'
import { allUsersReducer, followUser,unfollowUser, LoginUserReducer, registerUserReducer, topUsersReducer, updateUserProfile, userDetailsReducer } from './Reducers/userReducer'
import { categoriesReducer, followcategory } from './Reducers/categoryReducers'

const reducer = combineReducers({
    allPosts:getPostsReducer,
    postMansonryPosts:getTopPostsReducer,
    postDetails:getSinglePost,
    postComments:getSinglePostComments,
    createPost:createPost,
    editPost:editPost,
    likePost:likePost,
    commentPost:commentPost,
    deletePost:deletePost,
    userRegister:registerUserReducer,
    loginUser:LoginUserReducer,
    updateUser:updateUserProfile,
    userDetails:userDetailsReducer,
    categoriesPost:categoriesReducer,
    getcategoryPosts:getCategoryPostsReducer,
    getuserAuthorPosts:getUserAuthorPostsReducer, 
    allUsers:allUsersReducer,
    topUsers:topUsersReducer,
    followuser:followUser,
    unfollowuser:unfollowUser,
    followcategory:followcategory
})
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse
(localStorage.getItem('userInfo')):null
const categoriesFromStorage = localStorage.getItem('categoriesInfo') ? JSON.parse
(localStorage.getItem('categoriesInfo')):null



const initialState = {
     categoriesPost:{
          categoriesInfo: categoriesFromStorage
     },
     loginUser:{
          userInfo: userInfoFromStorage
     }
}

 const middleware = [thunk]

const store = createStore(reducer,
     initialState,
     composeWithDevTools(applyMiddleware(...middleware)
))

export default store