import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {Avatar} from 'antd'

const navLinks = [
    {
        title: 'Blog',
        path:'/'
    },
    {
        title: 'surveying',
        path:'/surveying'
    },
    {
        title: 'engineering',
        path:'/engineering'
    },
    {
        title: 'others',
        path:'/others'
    }]


export default function Navbar({user}) {
    const [menuActive, setMenuActive] = useState(false)
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
                <div className="menu-avatar-conatiner">
                    <Avatar size={50} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                    <span className="menu-avatar-name">{user.name}</span>
                </div>
            </div>
            <i className="icon ionicons ion-ios-menu"
            onClick={(e)=> setMenuActive(!menuActive)}/>
            
            
        </nav>
    )
}

