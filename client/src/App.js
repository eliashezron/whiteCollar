import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SinglePost from './pages/SinglePost';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost'
import Profile from './pages/Profile'
import users from './assets/mocks/user';
import ErrorPage from './pages/ErrorPage';
import CategoriesPage from './pages/CategoriesPage';
import UserAuthorPosts from './pages/UserAuthorPosts';
export default function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar/>
        <main>
        <Switch>
        <Route path='/authors/:userAuthor' component={UserAuthorPosts}/>
        <Route path='/posts/:category' component={CategoriesPage}/>
        <Route path='/post/:id' component={SinglePost}/>
        <Route path='/' component={Home} exact/>
        <Route path='/create' component={CreatePost}/>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/profile' component={Profile} />
        <Route path='/search/:keyword' component={Home} />
        <Route component={ErrorPage} exact/>
        </Switch>
        </main>
      </div>
    </Router>
  )
  }
