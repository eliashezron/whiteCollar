import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import { Link } from 'react-router-dom'

function Usercard({userAuthor}) {
    const PF = 'https://res.cloudinary.com/eliashezron1/image/upload/v1626282055/userProfilePictures/noAvatar_kwzvtj.png'

    return (
        <div className='card -box'>
             <Link to={`/authors/${userAuthor}`}>
          {userAuthor && <Link to = '/profile'>
                    <Avatar size={40} src={userAuthor.profilePicture ?
                        userAuthor.profilePicture:
                        PF}/>
          </Link>}
            <span>{userAuthor.userName}</span>
          </Link>
          <div>
              <p>{userAuthor.userBio}</p>
          </div>
        </div>
    )
}

export default Usercard
