import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {Avatar} from 'antd'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import {LogoutOutlined, LoginOutlined} from '@ant-design/icons'

 
const PF = "http://localhost:5000/public"
const navLinks = [
    {
        title: 'Blog',
        path:'/'
    },
    {
        title: 'post',
        path:'/createPost'
    }
   ]
   
   
   export default function Navbar() {
       const dispatch = useDispatch()
       const logoutHandler = ()=>{
           dispatch(logout())
       }
    const [menuActive, setMenuActive] = useState(false)
    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser
    return (
        <nav className={`site-navigation ${menuActive && 'active' }`}>
            <span className='menu-title'>Professionals</span>
            <div className="menu-content-container">
                <ul>
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <Link to={link.path}>{link.title}</Link>
                        </li>
                    ))}
                </ul>
                {userInfo ? (
                <div className="menu-avatar-conatiner">
                    <Link to = '/profile'>
                    <Avatar size={50} src={userInfo.profilePicture ?
                        PF +userInfo.profilePicture:
                        PF + '/images/person/noAvatar.png'}/>
                    <span className="menu-avatar-name">{userInfo.userName}</span>
                    </Link>
                    <Link to='/logout' onClick={logoutHandler}><LogoutOutlined /></Link>
                </div>):(
                    <div className='login-div'>
                        <LoginOutlined />
                    </div>
                )}
            </div>
            <i className="icon ionicons ion-ios-menu"
            onClick={(e)=> setMenuActive(!menuActive)}/>
            
            
        </nav>
    )
}

