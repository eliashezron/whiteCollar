import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { createPost, deletePost, editPost, getCategoryPostsReducer, getPostsReducer, getSinglePost, getTopPostsReducer, getUserAuthorPostsReducer } from './Reducers/postReducer'
import { LoginUserReducer, registerUserReducer, updateUserProfile } from './Reducers/userReducer'
import { categoriesReducer } from './Reducers/categoryReducers'

const reducer = combineReducers({
    allPosts:getPostsReducer,
    postMansonryPosts:getTopPostsReducer,
    postDetails:getSinglePost,
    createPost:createPost,
    editPost:editPost,
    deletePost:deletePost,
    userRegister:registerUserReducer,
    loginUser:LoginUserReducer,
    updateUser:updateUserProfile,
    categoriesPost:categoriesReducer,
    getcategoryPosts:getCategoryPostsReducer,
    getuserAuthorPosts:getUserAuthorPostsReducer
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