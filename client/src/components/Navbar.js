import React,{useState} from 'react'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {Avatar} from 'antd'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import {LogoutOutlined, LoginOutlined, CloseOutlined} from '@ant-design/icons'

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

     
       
    return (
        <>
        <nav className={`site-navigation ${menuActive && 'active' }`}>
            <div>
            <Link to='/'><div className='menu-title'>
                <span style={{marginRight: '5px'}}>WHITE</span><span style={{backgroundColor:'black', color:'white'}}>KOLLA</span></div></Link></div>
           <div> <Route render={({history}) => <SearchBox history={history}/>}/></div>
            <div className="menu-content-container" onMouseEnter={()=>setMenuActive(true)} onMouseLeave={()=>setMenuActive(false)}>
                <ul>
                  
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            {userInfo ? <Link to='/create'>post</Link> :<Link to='/login'>Blog</Link> }
                            
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
                    <Avatar size={60} src={userInfo.profilePicture ?
                        userInfo.profilePicture:
                        PF}/>
                    </Link>
                    <Link to={`/authors/${userInfo.userName}`}>
                    <span className='menu-avatar-name'>{userInfo.userName}</span>
                    </Link>
                    </div>
                    <div>
                    <Link to='/' onClick={logoutHandler}><LogoutOutlined /></Link>
                    </div>
                </div>)}
                {menuActive && window.innerWidth <900 ?
                        <div className='closeic' onClick={()=>setMenuActive(false)}><CloseOutlined/></div>
                    :''}
            </div>
            <i className="icon ionicons ion-ios-menu"
            onClick={(e)=> setMenuActive(!menuActive)}/>
            
            
        </nav>
        </>
    )
}

