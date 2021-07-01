import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SinglePost from './pages/SinglePost';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost'
import Profile from './pages/Profile'

const user = {
  name: 'eliasHezron'
}
export default function App() {
 
  return (
    <Router>
      <div className='App'>
        <Navbar user={user}/>
        <main>
        <Switch>
        <Route path='/post/:title' component={SinglePost}/>
        <Route path='/' component={Home} exact/>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/createPost' component={CreatePost} />
        <Route path='/profile' component={Profile} />
        </Switch>
        </main>
      </div>
    </Router>
  )
  }
