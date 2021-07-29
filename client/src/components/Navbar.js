import React,{useState} from 'react'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {Avatar} from 'antd'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import {LogoutOutlined, LoginOutlined} from '@ant-design/icons'

import SearchBox from './SearchBox'

 
const PF = 'https://res.cloudinary.com/eliashezron1/image/upload/v1626282055/userProfilePictures/noAvatar_kwzvtj.png'

   export default function Navbar() {
       const dispatch = useDispatch()
       const logoutHandler = ()=>{
           dispatch(logout())
       }
    const [menuActive, setMenuActive] = useState(false)
    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser

       const showcomponent = React.createElement(
               'span',{style:{display:'block'}}, `logout ${userInfo.userName}`
           )
           
       
    return (
        <>
        <nav className={`site-navigation ${menuActive && 'active' }`}>
            <Link to='/'><span className='menu-title'>WHITEPEN</span></Link>
            <Route render={({history}) => <SearchBox history={history}/>}/>
            <div className="menu-content-container" onMouseEnter={()=>setMenuActive(true)} onMouseLeave={()=>setMenuActive(false)}>
                <ul>
                        <li>
                            <Link to='/'>Blog</Link>
                        </li>
                        <li>
                            {userInfo ? <Link to='/create'>post</Link> :<Link to='/login'>post</Link> }
                            
                        </li>
                        {!userInfo && 
                        <div className='login-div'>
                        <Link to='/login'><LoginOutlined /></Link>  
                        </div>}
                </ul>
                {userInfo && (
                <div className='class'>
                    <div className="menu-avatar-conatiner">
                    <Link to={`/authors/${userInfo.userName}`}>
                    <Avatar size={50} src={userInfo.profilePicture ?
                        userInfo.profilePicture:
                        PF}/>
                    </Link>
                    </div>
                    <div onMouseOver={showcomponent}>
                    <Link to='/' onClick={logoutHandler}><LogoutOutlined /></Link>
                    </div>
                </div>)}
            </div>
            <i className="icon ionicons ion-ios-menu"
            onClick={(e)=> setMenuActive(!menuActive)}/>
            
            
        </nav>
        </>
    )
}

