import React from 'react'
import { useRouteMatch } from 'react-router'

const generatePage = page =>{
    try{
        const Component = require(`../pages/${page}`).default
        return<Component/>
    } catch(err){
        console.warn(err)
        return 'under Construction'
    }
}

export default function Pagerenderer(){
    const {
        params:{page}
    } = useRouteMatch()

    return generatePage(page)
}
  
// <Router>
// <div className='App'>
//   <Navbar/>
//   <Switch>
//   <Route path= '/:page' component={Pagerenderer}/>
//   <Route path='/' render={()=><Redirect to='/home'/>}/>
//   <Route component={()=> 404}/>
//   </Switch>
// </div>
// </Router>

