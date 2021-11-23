import React , {useContext, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router ,Route } from "react-router-dom";
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import {authContext} from './store/context';
import { onAuthStateChanged , getAuth } from '@firebase/auth';
import Post from './store/PostContext';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {
  const {user,setUser} = useContext(authContext)
  const auth = getAuth();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user)
        // ...
      }
    });
    console.log(user);
  })
  return (
    <div>
      <Post>
      <Router >
        <Route exact path='/'> 
      <Home />
        </Route>
        <Route path='/signup'>
          <Signup/>
           </Route>
           <Route path='/login'>
          <Login/>
           </Route>
           <Route path='/create'>
          <Create/>
           </Route>
           <Route path='/post'>
          <ViewPost/>
           </Route>
      </Router>
      </Post>
    </div>
  );
}

export default App;
