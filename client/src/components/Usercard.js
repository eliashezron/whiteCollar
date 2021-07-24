import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import { Tag, Divider,Button } from 'antd';
import { categoryColors } from './CategoryColors';
import { Link } from 'react-router-dom'

function Usercard({categories, users, Category}) {
    const PF = 'https://res.cloudinary.com/eliashezron1/image/upload/v1626282055/userProfilePictures/noAvatar_kwzvtj.png'

    return (
      <>
      {categories &&
      <div className='categories-tags'>
        <Divider orientation="left">recommended categories</Divider>
            <div className='tags-category'>
              {categories.map((category)=>{
                return(
                  <Link to = {`/posts/${category.category}`}>
                  <Button shape='round' style={{color:categoryColors[category.category]}} key={category._id}>{category.category}</Button>
                  </Link>
                )
              })}
            </div>
      </div>}
      {Category &&
      <div className='categories-tags' style={{height:'150px'}}>
        <Divider orientation="left">selected Category</Divider>
            <div className='tag-category'>
                  <Button shape='round' style={{color:categoryColors[Category]}} >{Category}</Button> 
                  <p>follow category to keep up with the lastest posts on <strong>{Category}</strong></p>    
            </div>
      </div>}
      
      {users &&
      <div className='users-section'>
        <Divider orientation="left">WHO TO FOLLOW</Divider>
      {users.map((user)=>{
               return (
                 <div className='users-list'>
                   <ul>
                     <div className='div2'>
                     <Link to={`/authors/${user.userName}`}>
                      <Avatar src={user.profilePicture} size={60}/>
                      </Link>
                      <Link to={`/authors/${user.userName}`}>
                      <div className='div3'>
                        <span>{user.userName}</span>
                        <span>{user.userBio}</span>
                      </div>
                      </Link>
                      <Button type="default" size={40} shape='round'>
                      follow
                      </Button>
                     </div>
                   </ul>
                 </div>
               )
             })}
      </div>
      }
      </>
   

    )
}

export default Usercard
