import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SinglePost from './pages/SinglePost';
import Home from './pages/Home';

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
        <Route path='/post/:id' component={SinglePost}/>
        <Route path='/' component={Home} exact/>
        </Switch>
        </main>
      </div>
    </Router>
  )
  }
